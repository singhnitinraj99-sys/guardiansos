import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getPrimaryEmergencyContact() {
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
        where: {
          isPrimary: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const contact = user.contacts[0];

  if (!contact) {
    throw new Error("No primary emergency contact found.");
  }

  if (!contact.phone.startsWith("+")) {
    throw new Error(
      "Primary contact phone must be stored in E.164 format."
    );
  }

  return {
    user,
    contact,
  };
}