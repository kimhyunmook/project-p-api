import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seeding(): Promise<void> {
  const salt = process.env.SALT_ROUNDS!;
  const initPassword = process.env.INIT_ADMIN_PASSWORD!;
  const pw = await bcrypt.hash(initPassword, Number(salt));
  await prisma.user.create({
    data: {
      email: process.env.INIT_ADMIN!,
      password: pw,
    },
  });
  await prisma.category.createMany({
    data: [
      { id: 1, name: "공지" },
      { id: 2, name: "자유" },
      { id: 3, name: "질문" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed 완료!");
}

// 즉시 실행
void (async () => {
  try {
    await seeding();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
