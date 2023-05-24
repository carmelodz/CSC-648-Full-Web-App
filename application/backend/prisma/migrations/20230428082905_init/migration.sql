/*
  Warnings:

  - You are about to drop the column `covid_alerts` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `covid_alerts`,
    ADD COLUMN `health_alerts` BOOLEAN NOT NULL DEFAULT true;
