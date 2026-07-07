"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { createEmergencyCall } from "@/lib/create-emergency-call";

interface CallResult {
  success: boolean;
  sid?: string;
  status?: string;
  message?: string;
}

export async function startEmergencyCall(
  phone: string,
  contactId: string,
  contactName: string,
  attempt = 1
): Promise<CallResult> {
  try {
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

    const call = await createEmergencyCall({
      userId: user.id,
      phone,
      contactId,
      contactName,
      attempt,
    });

    return {
      success: true,
      sid: call.sid,
      status: call.status,
    };
  } catch (error) {
    console.error("Voice Call Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Voice call failed",
    };
  }
}