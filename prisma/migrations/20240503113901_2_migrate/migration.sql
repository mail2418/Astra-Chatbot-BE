/*
  Warnings:

  - Added the required column `carYear` to the `CarList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CarList` ADD COLUMN `carYear` INTEGER UNSIGNED NOT NULL;
