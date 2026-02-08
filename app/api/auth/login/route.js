import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/hash";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return Response.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // cari admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return Response.json(
        { message: "Admin tidak ditemukan" },
        { status: 401 }
      );
    }

    // hash password input + salt dari DB
    const hashedInput = hashPassword(password, admin.salt);

    if (hashedInput !== admin.password) {
      return Response.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    // LOGIN BERHASIL
    return Response.json({
      message: "Login berhasil",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
