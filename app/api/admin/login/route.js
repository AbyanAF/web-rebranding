import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return Response.json(
        { error: "username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // cari admin
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return Response.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // hash password input + salt dari DB
    const hashInput = crypto
      .createHash("sha256")
      .update(password + admin.salt)
      .digest("hex");

    // bandingin
    if (hashInput !== admin.password) {
      return Response.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // ✅ LOGIN SUKSES + SET COOKIE
    return new Response(
      JSON.stringify({
        message: "Login berhasil",
        adminId: admin.id
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `adminId=${admin.id}; Path=/; HttpOnly`
        }
      }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
