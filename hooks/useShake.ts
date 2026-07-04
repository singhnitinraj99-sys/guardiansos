"use client";

import { useEffect, useRef, useState } from "react";
import { calculateDelta } from "@/lib/shake";

interface UseShakeOptions {
  threshold: number;
  enabled: boolean;
  onDoubleShake: () => void;
}

const DOUBLE_SHAKE_WINDOW = 1500;
const SHAKE_COOLDOWN = 3000;
const SHAKE_DEBOUNCE = 350;

export function useShake({
  threshold,
  enabled,
  onDoubleShake,
}: UseShakeOptions) {
  const [supported, setSupported] = useState(false);
  const [permissionRequired, setPermissionRequired] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const previousReading = useRef<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const firstShakeTime = useRef<number | null>(null);
  const lastShakeTime = useRef(0);
  const cooldownUntil = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window === "undefined") return;

    if (!("DeviceMotionEvent" in window)) return;

    setSupported(true);

    const requestPermission = (DeviceMotionEvent as any).requestPermission;

    if (
      typeof requestPermission === "function" &&
      !permissionGranted
    ) {
      setPermissionRequired(true);
      return;
    }

    function handleMotion(event: DeviceMotionEvent) {
      const acceleration =
        event.acceleration ??
        event.accelerationIncludingGravity;

      if (!acceleration) return;

      const current = {
        x: acceleration.x ?? 0,
        y: acceleration.y ?? 0,
        z: acceleration.z ?? 0,
      };

      // First reading
      if (!previousReading.current) {
        previousReading.current = current;
        return;
      }

      const delta = calculateDelta(
        previousReading.current,
        current
      );

      previousReading.current = current;

      const now = Date.now();

      // SOS cooldown
      if (now < cooldownUntil.current) {
        return;
      }

      // Debounce motion events
      if (
        now - lastShakeTime.current <
        SHAKE_DEBOUNCE
      ) {
        return;
      }

      if (delta < threshold) {
        return;
      }

      lastShakeTime.current = now;

      // First shake
      if (!firstShakeTime.current) {
        firstShakeTime.current = now;

        return;
      }

      // Second shake
      if (
        now - firstShakeTime.current <=
        DOUBLE_SHAKE_WINDOW
      ) {
        firstShakeTime.current = null;

        cooldownUntil.current =
          now + SHAKE_COOLDOWN;

        onDoubleShake();

        return;
      }

      // Restart detection
      firstShakeTime.current = now;
    }

    window.addEventListener(
      "devicemotion",
      handleMotion
    );

    return () => {
      window.removeEventListener(
        "devicemotion",
        handleMotion
      );
    };
  }, [
    enabled,
    threshold,
    permissionGranted,
    onDoubleShake,
  ]);

  async function requestMotionPermission() {
    const requestPermission =
      (DeviceMotionEvent as any)
        .requestPermission;

    if (
      typeof requestPermission !== "function"
    ) {
      return;
    }

    try {
      const result =
        await requestPermission();

      if (result === "granted") {
        setPermissionGranted(true);
        setPermissionRequired(false);
        setPermissionError(null);
      } else {
        setPermissionError(
          "Motion permission denied."
        );
      }
    } catch {
      setPermissionError(
        "Unable to request motion permission."
      );
    }
  }

  return {
    supported,
    permissionRequired,
    permissionGranted,
    permissionError,
    requestPermission:
      requestMotionPermission,
  };
}