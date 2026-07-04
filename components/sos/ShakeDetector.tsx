"use client";

import { useEffect, useState } from "react";

import ShakePermission from "./ShakePermission";
import { useShake } from "@/hooks/useShake";

interface Props {
  threshold: number;
  enabled?: boolean;
  onEmergencyDetected: () => void;
}

export default function ShakeDetector({
  threshold,
  enabled = true,
  onEmergencyDetected,
}: Props) {
  const [permissionEnabled, setPermissionEnabled] =
    useState(false);

  useEffect(() => {
    if (
      typeof DeviceMotionEvent === "undefined" ||
      typeof (DeviceMotionEvent as any)
        .requestPermission !== "function"
    ) {
      setPermissionEnabled(true);
    }
  }, []);

  const {
    permissionRequired,
    permissionGranted,
    permissionError,
    requestPermission,
  } = useShake({
    threshold,
    enabled: enabled && permissionEnabled,
    onDoubleShake: onEmergencyDetected,
  });

  function handlePermissionGranted() {
    setPermissionEnabled(true);

    requestPermission();
  }

  if (
    permissionRequired &&
    !permissionGranted &&
    enabled
  ) {
    return (
      <ShakePermission
        onGranted={handlePermissionGranted}
      />
    );
  }

  if (permissionError) {
    console.error(permissionError);
  }

  return null;
}