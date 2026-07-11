"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin";



export async function getAdminDashboardData() {
  await verifyAdmin();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalContacts,
    totalSOS,
    activeSOS,
    totalCalls,
    totalLiveLocations,
    sosToday,
    callsToday,
    recentUsers,
    recentIncidents,
    recentCalls,
  ] = await prisma.$transaction([
    prisma.user.count(),

    prisma.emergencyContact.count(),

    prisma.sOSLog.count(),

    prisma.sOSLog.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.emergencyCallLog.count(),

    prisma.liveLocation.count(),

    prisma.sOSLog.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.emergencyCallLog.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
        createdAt: true,
      },
    }),

    prisma.sOSLog.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    }),

    prisma.emergencyCallLog.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return {
    stats: {
      totalUsers,
      totalContacts,
      totalSOS,
      activeSOS,
      totalCalls,
      totalLiveLocations,
      sosToday,
      callsToday,
    },

    recentUsers,

    recentIncidents,

    recentCalls,
  };
}