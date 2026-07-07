import { prisma } from "@/lib/prisma";

export async function getNextEmergencyContact(userId: string) {
  const contacts = await prisma.emergencyContact.findMany({
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

  return contacts;
}