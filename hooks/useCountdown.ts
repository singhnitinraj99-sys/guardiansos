"use client";

import { useEffect, useState } from "react";

interface UseCountdownProps {
  seconds: number;
  active: boolean;
  onComplete: () => void;
}

export function useCountdown({
  seconds,
  active,
  onComplete,
}: UseCountdownProps) {
  const [count, setCount] = useState(seconds);

  // Reset whenever popup opens
  useEffect(() => {
    if (active) {
      setCount(seconds);
    }
  }, [active, seconds]);

  useEffect(() => {
    if (!active) return;

    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, active, onComplete]);

  return count;
}