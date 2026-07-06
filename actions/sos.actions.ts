"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { twilio } from "@/lib/twilio";
import { buildEmergencyMessage } from "@/lib/emergency-message";
import { createGoogleMapsLink } from "@/lib/maps";

interface StartEmergencyInput {
  latitude?: number;
  longitude?: number;
}
console.log("Using buildEmergencyMessage from lib/emergency-message");



export async function startEmergency({
  latitude,
  longitude,
}: StartEmergencyInput) {
  try {
    // ==========================
    // Authenticate User
    // ==========================

    const clerkUser = await currentUser();

    if (!clerkUser) {
      throw new Error("Unauthorized");
    }

    // ==========================
    // Get User + Contacts
    // ==========================

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
      include: {
        contacts: {
          orderBy: {
            isPrimary: "desc",
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.contacts.length === 0) {
      throw new Error("No emergency contacts found.");
    }

    // ==========================
    // Create SOS Log
    // ==========================

    const log = await prisma.sOSLog.create({
      data: {
        latitude,
        longitude,
        status: "PENDING",
        userId: user.id,
      },
    });

    // ==========================
    // Google Maps URL
    // ==========================

    const locationUrl =
      latitude !== undefined &&
      longitude !== undefined
        ? createGoogleMapsLink(latitude, longitude)
        : undefined;

    // ==========================
    // Emergency Message
    // ==========================

    const message = buildEmergencyMessage(
      user.firstName ?? "GuardianSOS User",
      locationUrl
    );


    console.log("Generated message:");
console.log(message);
console.log("Message length:", message.length);    
    // ==========================
    // Send SMS
    // ==========================

    const smsResults = [];

    let successCount = 0;

    for (const contact of user.contacts) {
      try {
        // Convert Indian number to E.164 if needed
       const phone = contact.phone;
              
      console.log({
      from: process.env.TWILIO_PHONE,
      to: phone,
      body: message,
    });
console.log("========== SENDING SMS ==========");
console.log("From:", process.env.TWILIO_PHONE);
console.log("To:", phone);
console.log("Body:", message);

const response = await twilio.messages.create({
  body: message,
  from: process.env.TWILIO_PHONE!,
  to: phone,
});

console.log("SMS SUCCESS");
console.log("SID:", response.sid);
console.log("STATUS:", response.status);
console.log("===============================");
        successCount++;

        smsResults.push({
          contactId: contact.id,
          name: contact.name,
          phone,
          success: true,
          sid: response.sid,
        });
      } catch (error) {
        console.error(
          `SMS failed for ${contact.name}`,
          error
        );

       const phone = contact.phone;

        smsResults.push({
          contactId: contact.id,
          name: contact.name,
          phone,
          success: false,
        });
      }
    }

    // ==========================
    // Update SOS Log
    // ==========================

    await prisma.sOSLog.update({
      where: {
        id: log.id,
      },
      data: {
        status:
          successCount > 0
            ? "SENT"
            : "FAILED",
        message,
      },
    });

    // ==========================
    // Return
    // ==========================

    return {
      success: true,
      logId: log.id,
      smsSent: successCount,
      smsFailed: user.contacts.length - successCount,
      smsResults,
    };
  } catch (error) {
    console.error("GuardianSOS Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error occurred.",
    };
  }
}

