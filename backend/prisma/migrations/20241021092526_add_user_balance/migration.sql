-- Ensure there are no NULL values in userId before altering the table
-- Option 1: Update NULL values to a default user (change the user ID as needed)
UPDATE "Order" SET "userId" = 1 WHERE "userId" IS NULL;

-- Option 2: Delete rows where userId is NULL (use this if you do not want to keep such orders)
-- DELETE FROM "Order" WHERE "userId" IS NULL;

-- Drop foreign keys
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT "Order_accountId_fkey";

-- Drop accountId column and make userId NOT NULL
ALTER TABLE "Order"
  DROP COLUMN "accountId",
  ALTER COLUMN "userId" SET NOT NULL;

-- Add balance column to User table
ALTER TABLE "User" ADD COLUMN "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- Drop Account table (ensure any relevant data has been saved or moved before doing this)
DROP TABLE "Account";
