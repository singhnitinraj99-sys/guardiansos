"use client";

import { useEffect, useRef } from "react";

import { getCurrentLocation } from "@/lib/geolocation";
import { startEmergency } from "@/actions/sos.actions";
import { startEmergencyCallWorkflow } from "@/actions/emergency-call-workflow.actions";

import { useSOS } from "./SOSProvider";

export default function EmergencyWorkflow() {
  const {
    alarmActive,
    setLocation,
    setLocationStatus,
    setLogStatus,
    setSmsStatus,
    setCallStatus,
  } = useSOS();

  const running = useRef(false);

  useEffect(() => {
   
    if (!alarmActive) {
      running.current = false;
      return;
    }

    if (running.current) return;

    running.current = true;

   
    async function executeWorkflow() {
      let latitude: number | undefined;
      let longitude: number | undefined;

      // STEP 1
      try {
        console.log("STEP 1 - Getting location");

        setLocationStatus("loading");

        const location = await getCurrentLocation();

        latitude = location.latitude;
        longitude = location.longitude;

        setLocation(location);

        setLocationStatus("completed");

        console.log("Location Success");
      } catch (error) {
        console.error("Location Error:", error);

        setLocationStatus("failed");
      }

      // STEP 2
      let sosLogId: string | undefined;

      try {
        console.log("STEP 2 - Sending SOS");

        setLogStatus("loading");
        setSmsStatus("loading");

        const result = await startEmergency({
          latitude,
          longitude,
        });


        if (result.success) {
          sosLogId = result.logId;

          setLogStatus("completed");

          if ((result.smsSent ?? 0) > 0) {
            setSmsStatus("completed");
          } else {
            setSmsStatus("failed");
          }
        } else {
          setLogStatus("failed");
          setSmsStatus("failed");
        }
      } catch (error) {
        console.error("Emergency Error:", error);

        setLogStatus("failed");
        setSmsStatus("failed");
      }

      // STEP 3
      if (sosLogId) {
        try {


          setCallStatus("loading");

          const result = await startEmergencyCallWorkflow(sosLogId);

         

          if (result.success) {
            const hasSuccessfulCall =
              (result.results ?? []).some((call) => call.success);

            setCallStatus(
              hasSuccessfulCall ? "completed" : "failed"
            );
          } else {
            setCallStatus("failed");
          }
        } catch (error) {
          console.error("Voice Call Error:", error);

          setCallStatus("failed");
        }
      }

      running.current = false;
    }

    executeWorkflow();

  }, [
    alarmActive,
    setLocation,
    setLocationStatus,
    setLogStatus,
    setSmsStatus,
    setCallStatus,
  ]);

  return null;
}