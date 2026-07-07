import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getEmergencyContacts() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

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

  return {
    user,
    contacts: user.contacts,
  };
}