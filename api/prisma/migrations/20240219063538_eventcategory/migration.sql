/*
  Warnings:

  - The primary key for the `eventcategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `eventcategory` table. All the data in the column will be lost.
  - Added the required column `id` to the `EventCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eventcategory` DROP FOREIGN KEY `EventCategory_eventId_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `eventcategory` DROP PRIMARY KEY,
    DROP COLUMN `eventId`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `EventCategory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
