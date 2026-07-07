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
    if (!alarmActive) return;

    if (running.current) return;

    running.current = true;

    async function executeWorkflow() {
      let latitude: number | undefined;
      let longitude: number | undefined;

      // -----------------------------
      // STEP 1 : LOCATION
      // -----------------------------
      try {
        setLocationStatus("loading");

        const location = await getCurrentLocation();

        latitude = location.latitude;
        longitude = location.longitude;

        setLocation(location);

        setLocationStatus("completed");
      } catch (error) {
        console.error("Location Error:", error);

        setLocationStatus("failed");
      }

      // -----------------------------
      // STEP 2 : SOS LOG + SMS
      // -----------------------------
      try {
        setLogStatus("loading");
        setSmsStatus("loading");

        const result = await startEmergency({
          latitude,
          longitude,
        });

        if (result.success) {
          setLogStatus("completed");

          if (
            "smsSent" in result &&
            typeof result.smsSent === "number" &&
            result.smsSent > 0
          ) {
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

      // -----------------------------
      // STEP 3 : VOICE CALL
      // -----------------------------
      try {
        setCallStatus("loading");

        const result = await startEmergencyCallWorkflow();

        if (result.success) {
          const hasSuccessfulCall = (result.results ?? []).some(
            (call) => call.success
          );

          if (hasSuccessfulCall) {
            setCallStatus("completed");
          } else {
            setCallStatus("failed");
          }
        } else {
          setCallStatus("failed");
        }
      } catch (error) {
        console.error("Voice Call Error:", error);

        setCallStatus("failed");
      }
    }

    void executeWorkflow();
  }, [alarmActive]);
  return null;
}
