/*
  Warnings:

  - Added the required column `verify_code` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('client', 'admin');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "ROLE"[],
ADD COLUMN     "token" TEXT,
ADD COLUMN     "verify_code" TEXT NOT NULL;
