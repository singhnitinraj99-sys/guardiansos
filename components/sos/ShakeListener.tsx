"use client";

import ShakeDetector from "./ShakeDetector";

interface Props {
  threshold: number;
}

export default function ShakeListener({ threshold }: Props) {
  function handleEmergencyDetected() {
    alert("Double Shake Detected!");
  }

  return (
    <ShakeDetector
      threshold={threshold}
      onEmergencyDetected={handleEmergencyDetected}
    />
  );
}
