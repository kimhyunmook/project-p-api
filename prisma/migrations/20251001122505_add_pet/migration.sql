/*
  Warnings:

  - The values [user,admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,inactive,suspended,banned] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `name` on the `category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `updated_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."InfoType" AS ENUM ('게시글', '애완동물');

-- CreateEnum
CREATE TYPE "public"."PetType" AS ENUM ('강아지', '고양이', '새', '물고기');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('유저', '관리자');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."user" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DEFAULT '유저';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserStatus_new" AS ENUM ('활성', '비활성', '정지', '차단');
ALTER TABLE "public"."user" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."user" ALTER COLUMN "status" TYPE "public"."UserStatus_new" USING ("status"::text::"public"."UserStatus_new");
ALTER TYPE "public"."UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "public"."UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "public"."UserStatus_old";
ALTER TABLE "public"."user" ALTER COLUMN "status" SET DEFAULT '활성';
COMMIT;

-- AlterTable
ALTER TABLE "public"."category" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(3),
ADD COLUMN     "type" "public"."InfoType",
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "public"."tag" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(3),
ADD COLUMN     "type" "public"."InfoType",
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DEFAULT '유저',
ALTER COLUMN "status" SET DEFAULT '활성';

-- CreateTable
CREATE TABLE "public"."pet" (
    "id" SERIAL NOT NULL,
    "type" "public"."PetType" NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "owner_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "tag_id" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pet" ADD CONSTRAINT "pet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pet" ADD CONSTRAINT "pet_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pet" ADD CONSTRAINT "pet_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
