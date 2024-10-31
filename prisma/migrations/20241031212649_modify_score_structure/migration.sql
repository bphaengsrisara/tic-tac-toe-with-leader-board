/*
  Warnings:

  - You are about to drop the column `draws` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "draws",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "winStreak" INTEGER NOT NULL DEFAULT 0;
