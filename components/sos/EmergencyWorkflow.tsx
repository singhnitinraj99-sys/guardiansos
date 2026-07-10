"use client";

import { useEffect, useRef } from "react";

import { getCurrentLocation } from "@/lib/geolocation";
import { startEmergency } from "@/actions/sos.actions";
import { startEmergencyCallWorkflow } from "@/actions/emergency-call-workflow.actions";
import { useLiveTracking } from "@/hooks/useLiveTracking";
import { saveLiveLocation } from "@/actions/live-location.actions";
import { useSOS } from "./SOSProvider";

export default function EmergencyWorkflow() {
  const {
    mode,
   alarmActive,
  currentSOSLogId,
  setCurrentSOSLogId,

  setLocation,
  setLocationStatus,
  setLogStatus,
  setSmsStatus,
  setCallStatus,
  } = useSOS();

  //live tracking hook to save the current location to the database
useLiveTracking({
    enabled:
    alarmActive &&
    !!currentSOSLogId,
  onLocation: async (position) => {
    if (!currentSOSLogId) return;

    await saveLiveLocation({
      sosLogId: currentSOSLogId,

      latitude: position.coords.latitude,

      longitude: position.coords.longitude,

      accuracy: position.coords.accuracy,

      speed: position.coords.speed,

      heading: position.coords.heading,
    });
  },
});

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

         let sosLogId: string | undefined;

        setLocation(location);

        setLocationStatus("completed");

        console.log("Location Success");
      } catch (error) {
        console.error("Location Error:", error);

        setLocationStatus("failed");
      }


// ==============================
// TEST MODE
// ==============================

if (mode === "TEST") {
  console.log("TEST MODE");

  // simulate checking contacts
  setLogStatus("completed");

  // simulate SMS service
  setSmsStatus("completed");

  // small delay so UI looks natural
  await new Promise((resolve) => setTimeout(resolve, 800));

  // simulate call service
  setCallStatus("completed");

  running.current = false;

  return;
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

if (result.success && result.logId) {
  sosLogId = result.logId;

  setCurrentSOSLogId(result.logId);

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