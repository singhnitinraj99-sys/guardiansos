"use server";

import { prisma } from "@/lib/prisma";
import { createEmergencyCall } from "@/lib/create-emergency-call";

export async function callNextContact(callSid: string) {
  try {
    console.log("========== CALL NEXT CONTACT ==========");

    const currentCall = await prisma.emergencyCallLog.findUnique({
      where: {
        callSid,
      },
    });

    if (!currentCall) {
      console.log("Current call log not found.");
      return;
    }

    const contacts = await prisma.emergencyContact.findMany({
      where: {
        userId: currentCall.userId,
      },
      orderBy: [
        {
          isPrimary: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    const currentIndex = contacts.findIndex(
      (contact) => contact.id === currentCall.contactId
    );

    if (currentIndex === -1) {
      console.log("Current contact not found.");
      return;
    }

    const nextContact = contacts[currentIndex + 1];

    if (!nextContact) {
      console.log("No more emergency contacts.");
      return;
    }

    const phone = nextContact.phone;

    console.log("Calling next contact:");
    console.log(nextContact.name);
    console.log(phone);

   const call = await createEmergencyCall({
  userId: currentCall.userId,
  phone,
  contactId: nextContact.id,
  contactName: nextContact.name,
  attempt: currentCall.attempt + 1,
  sosLogId: currentCall.sosLogId,
});

    console.log("================================");
console.log("Calling:", nextContact.name);
console.log("Phone:", phone);
console.log("Attempt:", currentCall.attempt + 1);
console.log("Current Call SID:", call.sid);
console.log("================================");
 
          if (!nextContact) {
  console.log("================================");
  console.log("No more emergency contacts.");
  console.log("Emergency escalation finished.");
  console.log("================================");
  return;
}

    console.log("Next call queued:", call.sid);

    console.log("======================================");
  } catch (error) {
    console.error("Call Next Contact Error:", error);
  }
}