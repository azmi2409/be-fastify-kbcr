-- DropForeignKey
ALTER TABLE `Tree` DROP FOREIGN KEY `Tree_variantId_fkey`;

-- AlterTable
ALTER TABLE `Tree` MODIFY `variantId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Status` (
    `treeId` INTEGER NOT NULL,
    `status` ENUM('Healthy', 'Sick', 'Died') NOT NULL DEFAULT 'Healthy',
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Status_treeId_key`(`treeId`),
    PRIMARY KEY (`treeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tree` ADD CONSTRAINT `Tree_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_treeId_fkey` FOREIGN KEY (`treeId`) REFERENCES `Tree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
