-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('QUEUED', 'INITIATED', 'RINGING', 'IN_PROGRESS', 'COMPLETED', 'BUSY', 'NO_ANSWER', 'FAILED', 'CANCELED');

-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "shakeSensitivity" SET DEFAULT 16;

-- CreateTable
CREATE TABLE "EmergencyCallLog" (
    "id" TEXT NOT NULL,
    "callSid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "status" "CallStatus" NOT NULL,
    "duration" INTEGER,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EmergencyCallLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyCallLog_callSid_key" ON "EmergencyCallLog"("callSid");

-- CreateIndex
CREATE INDEX "EmergencyCallLog_userId_idx" ON "EmergencyCallLog"("userId");

-- CreateIndex
CREATE INDEX "EmergencyCallLog_callSid_idx" ON "EmergencyCallLog"("callSid");

-- CreateIndex
CREATE INDEX "EmergencyCallLog_contactId_idx" ON "EmergencyCallLog"("contactId");

-- AddForeignKey
ALTER TABLE "EmergencyCallLog" ADD CONSTRAINT "EmergencyCallLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
