"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getLiveTracking(sosLogId: string) {
  const user = await currentUser();

  // Public tracking page doesn't require authentication.
  // If the user is logged in, we can optionally validate ownership later.

  const incident = await prisma.sOSLog.findUnique({
    where: {
      id: sosLogId,
    },
    include: {
      liveLocations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!incident) {
    throw new Error("SOS incident not found");
  }

  return {
  id: incident.id,
  status: incident.status,
  createdAt: incident.createdAt,
  locations: incident.liveLocations,
};
}