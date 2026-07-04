"use client";

import { useEffect } from "react";
import { useSOS } from "./SOSProvider";

export default function EmergencyWorkflow() {
  const { alarmActive } = useSOS();

  useEffect(() => {
    if (!alarmActive) return;

    console.log("Emergency workflow started");

    // Temporary test only
    setTimeout(() => {
      console.log("Workflow completed");
    }, 1000);
  }, [alarmActive]);

  return null;
}