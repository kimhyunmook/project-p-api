-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('active', 'inactive', 'suspended', 'banned');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100),
    "image" VARCHAR(500),
    "role" "public"."Role" NOT NULL DEFAULT 'user',
    "status" "public"."UserStatus" NOT NULL DEFAULT 'active',
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "idx_user_status" ON "public"."user"("status");

-- CreateIndex
CREATE INDEX "idx_user_deleted_at" ON "public"."user"("deleted_at");
