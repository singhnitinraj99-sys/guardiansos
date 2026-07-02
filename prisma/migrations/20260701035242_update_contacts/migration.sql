/*
  Warnings:

  - A unique constraint covering the columns `[userId,phone]` on the table `EmergencyContact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "EmergencyContact_userId_idx" ON "EmergencyContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_userId_phone_key" ON "EmergencyContact"("userId", "phone");
