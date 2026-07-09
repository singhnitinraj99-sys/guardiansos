"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getEmergencyDetails(id: string) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const incident = await prisma.sOSLog.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      calls: {
        orderBy: {
          createdAt: "asc",
        },
      },

      locations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!incident) {
    throw new Error("Incident not found");
  }

  return incident;
}
