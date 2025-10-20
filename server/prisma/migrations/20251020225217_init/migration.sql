/*
  Warnings:

  - The `sequenceName` column on the `CustomIdType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accessToken` on the `UserOAuth` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `UserOAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomIdType" ADD COLUMN     "isTypeNotEmpty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sequenceCounter" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "sequenceName",
ADD COLUMN     "sequenceName" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "customBool1Order" INTEGER,
ADD COLUMN     "customBool2Order" INTEGER,
ADD COLUMN     "customBool3Order" INTEGER,
ADD COLUMN     "customInt1Order" INTEGER,
ADD COLUMN     "customInt2Order" INTEGER,
ADD COLUMN     "customInt3Order" INTEGER,
ADD COLUMN     "customLink1Order" INTEGER,
ADD COLUMN     "customLink2Order" INTEGER,
ADD COLUMN     "customLink3Order" INTEGER,
ADD COLUMN     "customString1Order" INTEGER,
ADD COLUMN     "customString2Order" INTEGER,
ADD COLUMN     "customString3Order" INTEGER,
ADD COLUMN     "customText1Order" INTEGER,
ADD COLUMN     "customText2Order" INTEGER,
ADD COLUMN     "customText3Order" INTEGER;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "customId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserOAuth" DROP COLUMN "accessToken",
DROP COLUMN "refreshToken";
