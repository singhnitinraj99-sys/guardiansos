-- Add priority column to EmergencyContact
ALTER TABLE "EmergencyContact"
ADD COLUMN "priority" integer NOT NULL DEFAULT 5;
