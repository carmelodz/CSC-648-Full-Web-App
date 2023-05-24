-- AlterTable
ALTER TABLE `User` ADD COLUMN `covid_alerts` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `fire_alerts` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `security_alerts` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `weather_alerts` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `_AlertToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AlertToUser_AB_unique`(`A`, `B`),
    INDEX `_AlertToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AlertToUser` ADD CONSTRAINT `_AlertToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Alert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlertToUser` ADD CONSTRAINT `_AlertToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
