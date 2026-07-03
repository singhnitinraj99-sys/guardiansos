"use client";

import { useEffect, useRef, useState } from "react";

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
  const completedRef = useRef(false);

  // Reset whenever popup opens
  useEffect(() => {
    if (active) {
      setCount(seconds);
      completedRef.current = false;
    }
  }, [active, seconds]);

  useEffect(() => {
    if (!active) return;

    if (count <= 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, active, onComplete]);

  return count;
}