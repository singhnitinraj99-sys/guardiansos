"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { startEmergencyCall } from "@/actions/call.actions";

export async function retryEmergencyCall(
  previousPhone: string
) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    include: {
      contacts: {
        orderBy: [
          {
            isPrimary: "desc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });

  if (!user) {
    return;
  }

  const currentIndex = user.contacts.findIndex(
    (contact) => contact.phone === previousPhone
  );

  if (currentIndex === -1) {
    return;
  }

  const nextContact = user.contacts[currentIndex + 1];

  if (!nextContact) {
    return;
  }

  
 const phone = nextContact.phone;

await startEmergencyCall(
  phone,
  nextContact.id,
  nextContact.name
);
}