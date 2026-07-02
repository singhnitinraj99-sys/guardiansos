"use client";

import { useEffect, useState } from "react";

import ShakePermission from "./ShakePermission";
import { useShake } from "@/hooks/useShake";

interface Props {
  threshold: number;
  onEmergencyDetected: () => void;
}

export default function ShakeDetector({
  threshold,
  onEmergencyDetected,
}: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      typeof DeviceMotionEvent === "undefined" ||
      typeof (DeviceMotionEvent as any).requestPermission !== "function"
    ) {
      setEnabled(true);
    }
  }, []);

  useShake({
    threshold,
    enabled,
    onDoubleShake: onEmergencyDetected,
  });

  if (enabled) return null;

  return (
    <ShakePermission
      onGranted={() => setEnabled(true)}
    />
  );
}
