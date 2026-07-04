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

  const completed = useRef(false);

  useEffect(() => {
    if (!active) return;

    setCount(seconds);

    completed.current = false;
  }, [active, seconds]);

  useEffect(() => {
    if (!active) return;

    if (count === 0 && !completed.current) {
      console.log("Countdown reached 0");

completed.current = true;

console.log("Calling onComplete");

onComplete();

console.log("onComplete returned");
      return;
    }

    if (count <= 0) return;

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [count, active]);

  return count;
}