"use client";

import { useEffect } from "react";

import { getCurrentLocation } from "@/lib/geolocation";
import { startEmergency } from "@/actions/sos.actions";

import { useSOS } from "./SOSProvider";

export default function EmergencyWorkflow() {
  const { alarmActive } = useSOS();

  useEffect(() => {
    if (!alarmActive) return;

    async function execute() {
      try {
        let latitude: number | undefined;
        let longitude: number | undefined;

        try {
          const location = await getCurrentLocation();

          latitude = location.latitude;
          longitude = location.longitude;
        } catch {
          console.log("Location unavailable");
        }

        const result = await startEmergency({
          latitude,
          longitude,
        });

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    execute();
  }, [alarmActive]);

  return null;
}