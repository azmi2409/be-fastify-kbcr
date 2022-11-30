/*
  Warnings:

  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `treeId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Log` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `Log` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `executor` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_treatmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_treeId_fkey`;

-- DropIndex
DROP INDEX `Log_userId_key` ON `Log`;

-- DropIndex
DROP INDEX `Treatment_type_key` ON `Treatment`;

-- AlterTable
ALTER TABLE `Log` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `time`,
    DROP COLUMN `treatmentId`,
    DROP COLUMN `treeId`,
    DROP COLUMN `userId`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `executor` VARCHAR(191) NOT NULL,
    ADD COLUMN `scheduleId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`scheduleId`);

-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Harvest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `treeId` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `treeId` INTEGER NOT NULL,
    `treatmentId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Log_scheduleId_key` ON `Log`(`scheduleId`);

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Harvest` ADD CONSTRAINT `Harvest_treeId_fkey` FOREIGN KEY (`treeId`) REFERENCES `Tree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_treeId_fkey` FOREIGN KEY (`treeId`) REFERENCES `Tree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_treatmentId_fkey` FOREIGN KEY (`treatmentId`) REFERENCES `Treatment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
