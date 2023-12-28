/*
  Warnings:

  - You are about to drop the `_categorytoproducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproducts` DROP FOREIGN KEY `_CategoryToProducts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproducts` DROP FOREIGN KEY `_CategoryToProducts_B_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_categorytoproducts`;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
