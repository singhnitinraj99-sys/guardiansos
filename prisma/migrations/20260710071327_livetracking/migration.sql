/*
  Warnings:

  - You are about to drop the column `mapLocationEnabled` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "mapLocationEnabled",
ADD COLUMN     "liveLocationEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mapLocationEnabled" BOOLEAN NOT NULL DEFAULT true;
