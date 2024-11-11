/*
  Warnings:

  - The `endTime` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `startTime` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endTime",
ADD COLUMN     "endTime" INTEGER,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER;
