"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { ContactSchema } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";
import { RelationType } from "@prisma/client";

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
    throw new Error("User not found.");
  }

  return user;
}

export async function getContacts() {
  const user = await getDbUser();

  return prisma.emergencyContact.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createContact(data: {
  name: string;
  phone: string;
  relation: RelationType;
}) {
  const user = await getDbUser();

  const validated = ContactSchema.parse(data);

  const totalContacts = await prisma.emergencyContact.count({
    where: {
      userId: user.id,
    },
  });

  if (totalContacts >= 5) {
    throw new Error("You can only add up to 5 emergency contacts.");
  }

  const existing = await prisma.emergencyContact.findFirst({
    where: {
      userId: user.id,
      phone: validated.phone,
    },
  });

  if (existing) {
    throw new Error("This phone number already exists.");
  }

  const isPrimary = totalContacts === 0;

  await prisma.emergencyContact.create({
    data: {
      ...validated,
      isPrimary,
      userId: user.id,
    },
  });

  revalidatePath("/contacts");

  return {
    success: true,
  };
}

export async function setPrimaryContact(contactId: string) {
  const user = await getDbUser();

  const contact = await prisma.emergencyContact.findFirst({
    where: {
      id: contactId,
      userId: user.id,
    },
  });

  if (!contact) {
    throw new Error("Contact not found.");
  }

  await prisma.$transaction([
    prisma.emergencyContact.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        isPrimary: false,
      },
    }),
    prisma.emergencyContact.update({
      where: {
        id: contactId,
      },
      data: {
        isPrimary: true,
      },
    }),
  ]);

  revalidatePath("/contacts");
}

export async function updateContact(
  contactId: string,
  data: {
    name: string;
    phone: string;
    relation: RelationType;
  }
) {
  const user = await getDbUser();

  const validated = ContactSchema.parse(data);

  const contact = await prisma.emergencyContact.findFirst({
    where: {
      id: contactId,
      userId: user.id,
    },
  });

  if (!contact) {
    throw new Error("Contact not found.");
  }

  const duplicate = await prisma.emergencyContact.findFirst({
    where: {
      userId: user.id,
      phone: validated.phone,
      NOT: {
        id: contactId,
      },
    },
  });

  if (duplicate) {
    throw new Error("Phone number already exists.");
  }

  await prisma.emergencyContact.update({
    where: {
      id: contactId,
    },
    data: validated,
  });

  revalidatePath("/contacts");

  return {
    success: true,
  };
}

export async function deleteContact(contactId: string) {
  const user = await getDbUser();

  const contact = await prisma.emergencyContact.findFirst({
    where: {
      id: contactId,
      userId: user.id,
    },
  });

  if (!contact) {
    throw new Error("Contact not found.");
  }

  await prisma.$transaction(async (tx) => {
    // Delete the selected contact
    await tx.emergencyContact.delete({
      where: {
        id: contactId,
      },
    });

    // If deleted contact wasn't primary, we're done
    if (!contact.isPrimary) {
      return;
    }

    // Find the oldest remaining contact
    const nextPrimary = await tx.emergencyContact.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Promote it if one exists
    if (nextPrimary) {
      await tx.emergencyContact.update({
        where: {
          id: nextPrimary.id,
        },
        data: {
          isPrimary: true,
        },
      });
    }
  });

  revalidatePath("/contacts");

  return {
    success: true,
  };
}