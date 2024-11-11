/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `remainingTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "remainingTime" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Session";
