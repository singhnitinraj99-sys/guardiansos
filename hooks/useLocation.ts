"use client";

import { useState } from "react";

import { getCurrentLocation } from "@/lib/geolocation";
import { LocationData } from "@/types/location";

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function fetchLocation() {
    try {
      setLoading(true);

      const data = await getCurrentLocation();

      setLocation(data);

      return data;
    } catch (err) {
      setError("Unable to get location.");

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    location,
    loading,
    error,
    fetchLocation,
  };
}