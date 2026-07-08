/*
  Warnings:

  - You are about to drop the column `retryStarted` on the `EmergencyCallLog` table. All the data in the column will be lost.
  - Added the required column `sosLogId` to the `EmergencyCallLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmergencyCallLog" DROP COLUMN "retryStarted",
ADD COLUMN     "sosLogId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "EmergencyCallLog_sosLogId_idx" ON "EmergencyCallLog"("sosLogId");

-- CreateIndex
CREATE INDEX "SOSLog_userId_idx" ON "SOSLog"("userId");

-- AddForeignKey
ALTER TABLE "EmergencyCallLog" ADD CONSTRAINT "EmergencyCallLog_sosLogId_fkey" FOREIGN KEY ("sosLogId") REFERENCES "SOSLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
