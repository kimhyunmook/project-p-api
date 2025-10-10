-- CreateEnum
CREATE TYPE "public"."PetActivityType" AS ENUM ('산책', '식사', '간식', '병원', '미용', '놀이', '훈련', '약', '목욕', '예방접종', '체중측정', '기타');

-- CreateEnum
CREATE TYPE "public"."PetActivityStatus" AS ENUM ('예정', '완료', '취소', '놓침');

-- CreateTable
CREATE TABLE "public"."pet_activity" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "activity_date" DATE NOT NULL,
    "start_time" TIMESTAMPTZ(3),
    "end_time" TIMESTAMPTZ(3),
    "type" "public"."PetActivityType" NOT NULL,
    "status" "public"."PetActivityStatus" NOT NULL DEFAULT '예정',
    "is_all_day" BOOLEAN NOT NULL DEFAULT false,
    "reminder" INTEGER,
    "pet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "pet_activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pet_activity_pet_id_activity_date_idx" ON "public"."pet_activity"("pet_id", "activity_date");

-- CreateIndex
CREATE INDEX "pet_activity_activity_date_idx" ON "public"."pet_activity"("activity_date");

-- AddForeignKey
ALTER TABLE "public"."pet_activity" ADD CONSTRAINT "pet_activity_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
