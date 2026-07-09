"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicLiveTracking(
  id: string
) {
  const incident = await prisma.sOSLog.findUnique({
    where: {
      id,
    },
    include: {
      locations: {
        orderBy: {
          createdAt: "asc",
        },
      },
      calls: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!incident) {
    throw new Error("Tracking not found");
  }

  return incident;
}