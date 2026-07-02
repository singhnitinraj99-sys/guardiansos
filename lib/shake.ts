export interface MotionReading {
  x: number;
  y: number;
  z: number;
}

export function calculateDelta(
  previous: MotionReading,
  current: MotionReading
) {
  const dx = current.x - previous.x;
  const dy = current.y - previous.y;
  const dz = current.z - previous.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}