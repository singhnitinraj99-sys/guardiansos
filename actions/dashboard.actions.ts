"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    include: {
      contacts: true,
      logs: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      settings: true,
    },
  });

  return user;
}