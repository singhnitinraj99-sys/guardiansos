"use server";

import { prisma } from "@/lib/prisma";

export async function getLiveTracking(id: string) {
  const incident = await prisma.sOSLog.findUnique({
    where: { id },
    include: {
      liveLocations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!incident) {
    throw new Error("Tracking not found");
  }

  return {
    id: incident.id,
    status: incident.status,
    createdAt: incident.createdAt,
    locations: incident.liveLocations,
  };
}