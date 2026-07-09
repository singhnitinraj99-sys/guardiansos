-- CreateTable
CREATE TABLE "LiveLocation" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sosLogId" TEXT NOT NULL,

    CONSTRAINT "LiveLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LiveLocation_sosLogId_idx" ON "LiveLocation"("sosLogId");

-- CreateIndex
CREATE INDEX "LiveLocation_createdAt_idx" ON "LiveLocation"("createdAt");

-- AddForeignKey
ALTER TABLE "LiveLocation" ADD CONSTRAINT "LiveLocation_sosLogId_fkey" FOREIGN KEY ("sosLogId") REFERENCES "SOSLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
