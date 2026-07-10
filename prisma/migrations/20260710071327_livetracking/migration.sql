/*
  Warnings:

  - You are about to drop the column `locationEnabled` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "locationEnabled",
ADD COLUMN     "liveLocationEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mapLocationEnabled" BOOLEAN NOT NULL DEFAULT true;
