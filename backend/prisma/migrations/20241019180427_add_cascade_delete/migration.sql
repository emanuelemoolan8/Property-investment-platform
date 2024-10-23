-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_propertyId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
