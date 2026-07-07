import { prisma } from "@/lib/prisma";

export async function getEmergencyContacts(userId: string) {
  return prisma.emergencyContact.findMany({
    where: {
      userId,
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
}

export async function getNextContact(
  userId: string,
  currentPhone: string
) {
  const contacts = await getEmergencyContacts(userId);

  const index = contacts.findIndex(
    (contact) => contact.phone === currentPhone
  );

  if (index === -1) {
    return null;
  }

  return contacts[index + 1] ?? null;
}