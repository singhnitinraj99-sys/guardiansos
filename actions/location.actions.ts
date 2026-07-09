"use server";

import { prisma } from "@/lib/prisma";

interface SaveLiveLocationParams {
  sosLogId: string;
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  speed?: number | null;
  heading?: number | null;
}

export async function saveLiveLocation({
  sosLogId,
  latitude,
  longitude,
  accuracy,
  speed,
  heading,
}: SaveLiveLocationParams) {
  try {
    const location = await prisma.liveLocation.create({
      data: {
        sosLogId,
        latitude,
        longitude,
        accuracy,
        speed,
        heading,
      },
    });

    return {
      success: true,
      location,
    };
  } catch (error) {
    console.error("Save Live Location Error:", error);

    return {
      success: false,
    };
  }
}