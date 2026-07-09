"use client";

import { useEffect, useRef } from "react";

interface UseLiveTrackingProps {
  enabled: boolean;
  onLocation: (location: GeolocationPosition) => void;
}

export function useLiveTracking({ enabled, onLocation }: UseLiveTrackingProps) {
  const watchId = useRef<number | null>(null);

  // Save only once every 5 seconds
  const lastSaved = useRef(0);

  useEffect(() => {
    if (!enabled) {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }

      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const now = Date.now();

        if (now - lastSaved.current < 5000) {
          return;
        }

        lastSaved.current = now;

        onLocation(position);
      },
      (error) => {
  console.error("Tracking Error");
  console.error("Code:", error.code);
  console.error("Message:", error.message);

  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("Location permission denied.");
      break;

    case error.POSITION_UNAVAILABLE:
      console.error("Location unavailable.");
      break;

    case error.TIMEOUT:
      console.error("Location request timed out.");
      break;

    default:
      console.error("Unknown geolocation error.");
  }
},
      {
        enableHighAccuracy: false,
        maximumAge: 10000,
        timeout: 30000,
      },
    );

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [enabled, onLocation]);
}
