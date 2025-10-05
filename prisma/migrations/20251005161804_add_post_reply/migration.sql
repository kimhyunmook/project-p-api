-- CreateEnum
CREATE TYPE "public"."CommonStatus" AS ENUM ('활성', '비활성', '정지', '차단');

-- CreateTable
CREATE TABLE "public"."post_reply" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "status" "public"."CommonStatus" NOT NULL DEFAULT '활성',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "post_reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_reply_created_at_idx" ON "public"."post_reply"("created_at");

-- AddForeignKey
ALTER TABLE "public"."post_reply" ADD CONSTRAINT "post_reply_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
