import { getCurrentLocation } from "@/lib/geolocation";

export async function runLocationStep() {
  try {
    const location = await getCurrentLocation();

    return {
      success: true,
      location,
    };
  } catch {
    return {
      success: false,
      location: null,
    };
  }
}