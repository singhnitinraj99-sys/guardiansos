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

export async function getAdminUser(id: string) {
  await verifyAdmin();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      settings: true,

      contacts: {
        orderBy: {
          priority: "asc",
        },
      },

      logs: {
        orderBy: {
          createdAt: "desc",
        },

        include: {
          calls: {
            orderBy: {
              createdAt: "desc",
            },
          },

          liveLocations: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },

      callLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },

      _count: {
        select: {
          contacts: true,
          logs: true,
          callLogs: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}