"use client";

import { useEffect, useState } from "react";

export function useFlash(active: boolean) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 300);

    return () => {
      clearInterval(interval);
      setVisible(false);
    };
  }, [active]);

  return visible;
}