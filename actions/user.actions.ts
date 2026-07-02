"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const existing = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (existing) return existing;

  return prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,

      settings: {
        create: {},
      },
    },
  });
}