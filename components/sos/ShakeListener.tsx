"use client";

import ShakeDetector from "./ShakeDetector";

interface Props {
  threshold: number;
}

export default function ShakeListener({ threshold }: Props) {
  function handleEmergencyDetected() {
    console.log("Emergency detected!");
  }
  
  return (
    <ShakeDetector
      threshold={threshold}
      onEmergencyDetected={handleEmergencyDetected}
    />
  );
}
