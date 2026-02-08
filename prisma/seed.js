import { PrismaClient } from "@prisma/client";
import { generateSalt, hashPassword } from "../lib/hash.js";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "admin123"; // nanti ganti

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      salt,
    },
  });

  console.log("✅ Admin seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
