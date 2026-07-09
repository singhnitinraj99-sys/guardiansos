"use client";

import { useCallback } from "react";

import { useSOS } from "./SOSProvider";
import { useLiveTracking } from "@/hooks/useLiveTracking";
import { saveLiveLocation } from "@/actions/location.actions";

interface Props {
  sosLogId: string;
}

export default function LiveTracking({
  sosLogId,
}: Props) {
  const { alarmActive } = useSOS();

  const handleLocation = useCallback(
    async (position: GeolocationPosition) => {
      const coords = position.coords;

      console.log("LIVE LOCATION");

      console.log(coords.latitude);
      console.log(coords.longitude);

      await saveLiveLocation({
        sosLogId,
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        speed: coords.speed,
        heading: coords.heading,
      });
    },
    [sosLogId]
  );

  useLiveTracking({
    enabled: alarmActive,
    onLocation: handleLocation,
  });

  return null;
}