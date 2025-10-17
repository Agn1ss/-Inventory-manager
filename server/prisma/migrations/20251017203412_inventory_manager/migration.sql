-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FieldState" AS ENUM ('NONE', 'NOT_VISIBLE', 'VISIBLE');

-- CreateEnum
CREATE TYPE "RandomType" AS ENUM ('BIT_20', 'BIT_32', 'DIGITS_6', 'DIGITS_9', 'GUID');

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('YYYY', 'YYYYMMDD', 'YYYYMMDDHHmmss', 'YYYY_MM_DD', 'DDMMYYYY');

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOAuth" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserOAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "creatorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "customIdTypeId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,
    "customString1State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customString1Name" TEXT,
    "customString1Description" TEXT,
    "customString2State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customString2Name" TEXT,
    "customString2Description" TEXT,
    "customString3State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customString3Name" TEXT,
    "customString3Description" TEXT,
    "customText1State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customText1Name" TEXT,
    "customText1Description" TEXT,
    "customText2State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customText2Name" TEXT,
    "customText2Description" TEXT,
    "customText3State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customText3Name" TEXT,
    "customText3Description" TEXT,
    "customInt1State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customInt1Name" TEXT,
    "customInt1Description" TEXT,
    "customInt2State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customInt2Name" TEXT,
    "customInt2Description" TEXT,
    "customInt3State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customInt3Name" TEXT,
    "customInt3Description" TEXT,
    "customLink1State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customLink1Name" TEXT,
    "customLink1Description" TEXT,
    "customLink2State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customLink2Name" TEXT,
    "customLink2Description" TEXT,
    "customLink3State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customLink3Name" TEXT,
    "customLink3Description" TEXT,
    "customBool1State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customBool1Name" TEXT,
    "customBool1Description" TEXT,
    "customBool2State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customBool2Name" TEXT,
    "customBool2Description" TEXT,
    "customBool3State" "FieldState" NOT NULL DEFAULT 'NONE',
    "customBool3Name" TEXT,
    "customBool3Description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryEditor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "InventoryEditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "customId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "customString1" TEXT,
    "customString2" TEXT,
    "customString3" TEXT,
    "customText1" TEXT,
    "customText2" TEXT,
    "customText3" TEXT,
    "customInt1" INTEGER,
    "customInt2" INTEGER,
    "customInt3" INTEGER,
    "customLink1" TEXT,
    "customLink2" TEXT,
    "customLink3" TEXT,
    "customBool1" BOOLEAN,
    "customBool2" BOOLEAN,
    "customBool3" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomIdType" (
    "id" TEXT NOT NULL,
    "fixedText" TEXT,
    "randomType" "RandomType",
    "dateFormat" "DateFormat",
    "sequenceName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomIdType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InventoryTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InventoryTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserOAuth_provider_providerId_key" ON "UserOAuth"("provider", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryEditor_userId_inventoryId_key" ON "InventoryEditor"("userId", "inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryId_customId_key" ON "Item"("inventoryId", "customId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_itemId_userId_key" ON "Like"("itemId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_InventoryTags_B_index" ON "_InventoryTags"("B");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOAuth" ADD CONSTRAINT "UserOAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_customIdTypeId_fkey" FOREIGN KEY ("customIdTypeId") REFERENCES "CustomIdType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryEditor" ADD CONSTRAINT "InventoryEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryEditor" ADD CONSTRAINT "InventoryEditor_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryTags" ADD CONSTRAINT "_InventoryTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryTags" ADD CONSTRAINT "_InventoryTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
