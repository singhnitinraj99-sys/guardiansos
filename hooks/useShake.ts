"use client";

import { useEffect, useRef, useState } from "react";
import { calculateDelta } from "@/lib/shake";

interface UseShakeOptions {
  threshold: number;
  enabled: boolean;
  onDoubleShake: () => void;
}


const DOUBLE_SHAKE_WINDOW = 2000;
const SHAKE_COOLDOWN = 3000;

export function useShake({
  threshold,
  enabled,
  onDoubleShake,
}: UseShakeOptions) {
  const [supported, setSupported] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [permissionRequired, setPermissionRequired] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const firstShakeTime = useRef<number | null>(null);
  const cooldownUntil = useRef(0);
  const previousReading = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!enabled) return;

    if (!("DeviceMotionEvent" in window)) {
      return;
    }

    const requestPermissionFunc = (DeviceMotionEvent as any).requestPermission;

    if (typeof requestPermissionFunc === "function" && !permissionGranted) {
      setSupported(true);
      setPermissionRequired(true);
      return;
    }

    setSupported(true);

    function handleMotion(event: DeviceMotionEvent) {
      const acceleration = event.acceleration ?? event.accelerationIncludingGravity;

      if (!acceleration) return;

      const current = {
        x: acceleration.x ?? 0,
        y: acceleration.y ?? 0,
        z: acceleration.z ?? 0,
      };

      const delta = calculateDelta(previousReading.current, current);

      previousReading.current = current;

      console.log({ delta, threshold });

      if (delta < threshold) {
        return;
      }

      const now = Date.now();

      if (now < cooldownUntil.current) {
        return;
      }

      if (!firstShakeTime.current) {
        firstShakeTime.current = now;
        setShakeCount(1);

        setTimeout(() => {
          firstShakeTime.current = null;
          setShakeCount(0);
        }, DOUBLE_SHAKE_WINDOW);

        return;
      }

      if (now - firstShakeTime.current <= DOUBLE_SHAKE_WINDOW) {
        cooldownUntil.current = now + SHAKE_COOLDOWN;

        firstShakeTime.current = null;
        setShakeCount(0);

        onDoubleShake();
      }
    }

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [threshold, onDoubleShake, permissionGranted, enabled]);

  async function requestPermission() {
    if (typeof window === "undefined") return;

    const requestPermissionFunc = (DeviceMotionEvent as any).requestPermission;

    if (typeof requestPermissionFunc !== "function") {
      setPermissionError("This browser does not support motion permission requests.");
      return;
    }

    try {
      const result = await requestPermissionFunc();

      if (result === "granted") {
        setPermissionGranted(true);
        setPermissionRequired(false);
        setPermissionError(null);
      } else {
        setPermissionError("Motion permission denied.");
      }
    } catch {
      setPermissionError("Unable to request motion permission.");
    }
  }
  

  return {
    supported,
    shakeCount,
    permissionRequired,
    permissionGranted,
    permissionError,
    requestPermission,
  };
}
