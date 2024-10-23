-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('available', 'not_available', 'hidden');

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "totalPieces" INTEGER NOT NULL,
    "availablePieces" INTEGER NOT NULL,
    "soldPieces" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "status" "PropertyStatus" NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "pieces" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
