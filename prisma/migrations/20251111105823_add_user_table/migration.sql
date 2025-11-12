/*
  Warnings:

  - Added the required column `password` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tg_link` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "tg_link" TEXT NOT NULL;
