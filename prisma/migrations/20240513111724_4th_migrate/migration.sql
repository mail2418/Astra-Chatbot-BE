/*
  Warnings:

  - Added the required column `carPhoto` to the `CarList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CarList` ADD COLUMN `carPhoto` VARCHAR(191) NOT NULL;
