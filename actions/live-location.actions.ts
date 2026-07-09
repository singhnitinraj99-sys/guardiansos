"use server";

import { prisma } from "@/lib/prisma";

interface SaveLiveLocationProps {
  sosLogId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number | null;
  heading?: number | null;
}

export async function saveLiveLocation(
  data: SaveLiveLocationProps
) {
  try {
    await prisma.liveLocation.create({
      data,
    });

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}