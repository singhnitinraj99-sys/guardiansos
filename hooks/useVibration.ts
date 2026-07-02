"use client";

import { useEffect } from "react";
import {
  startVibration,
  stopVibration,
} from "@/lib/vibration";

interface Props {
  active: boolean;
  enabled: boolean;
}

export function useVibration({
  active,
  enabled,
}: Props) {
  useEffect(() => {
    if (!active || !enabled) {
      stopVibration();
      return;
    }

    startVibration();

    return () => stopVibration();
  }, [active, enabled]);
}