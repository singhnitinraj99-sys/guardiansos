"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { SettingsSchema, SettingsInput } from "@/lib/validations/settings";
import { revalidatePath } from "next/cache";

async function getDbUser() {
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

  return user;
}



export async function getSettings() {
  const user = await getDbUser();

  let settings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: {
        userId: user.id,
      },
    });
  }

  return settings;
}

export async function updateSettings(data: SettingsInput) {
  const user = await getDbUser();

  const validated = SettingsSchema.parse(data);

  await prisma.userSettings.upsert({
    where: {
      userId: user.id,
    },
    update: validated,
    create: {
      ...validated,
      userId: user.id,
    },
  });

  revalidatePath("/settings");

  return {
    success: true,
  };
}
