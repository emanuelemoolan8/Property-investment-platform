-- This is a sample of what you need to add in the migration file

-- Add the `createdAt` and `updatedAt` fields to `Order` and `Property` tables
ALTER TABLE "Order" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "Order" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

ALTER TABLE "Property" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "Property" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

-- For existing rows, set `updatedAt` to the current timestamp
UPDATE "Order" SET "updatedAt" = NOW();
UPDATE "Property" SET "updatedAt" = NOW();

-- Ensure `updatedAt` is updated automatically on row changes (in Prisma)
ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET DEFAULT NOW();
ALTER TABLE "Property" ALTER COLUMN "updatedAt" SET DEFAULT NOW();
