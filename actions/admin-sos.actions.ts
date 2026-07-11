"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function verifyAdmin() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const admins =
    process.env.ADMIN_EMAILS?.split(",").map((email) =>
      email.trim().toLowerCase()
    ) ?? [];

  const email =
    clerkUser.emailAddresses[0]?.emailAddress.toLowerCase();

  if (!admins.includes(email)) {
    throw new Error("Access denied");
  }
}

export async function getSOSLogs() {
  await verifyAdmin();

  return prisma.sOSLog.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: true,

      calls: true,

      liveLocations: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function getSOSLog(id: string) {
  await verifyAdmin();

  const log = await prisma.sOSLog.findUnique({
    where: {
      id,
    },

    include: {
      user: true,

      calls: {
        orderBy: {
          createdAt: "asc",
        },
      },

      liveLocations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!log) {
    throw new Error("SOS Log not found");
  }

  return log;
}