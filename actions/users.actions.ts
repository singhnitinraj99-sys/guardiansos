"use server";

import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin";

const PAGE_SIZE = 10;

interface GetUsersOptions {
  page?: number;
  search?: string;
}

export async function getUsers({
  page = 1,
  search = "",
}: GetUsersOptions) {
  await verifyAdmin();

  const where = search
    ? {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const [totalUsers, users] = await prisma.$transaction([
    prisma.user.count({
      where,
    }),

    prisma.user.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * PAGE_SIZE,

      take: PAGE_SIZE,

      include: {
        _count: {
          select: {
            contacts: true,
            logs: true,
          },
        },

        logs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            createdAt: true,
            status: true,
          },
        },
      },
    }),
  ]);

  return {
    users,

    totalUsers,

    currentPage: page,

    totalPages: Math.ceil(totalUsers / PAGE_SIZE),
  };
}