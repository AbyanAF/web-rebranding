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

    // bikin salt random
    const salt = crypto.randomBytes(16).toString("hex");

    // hash password + salt
    const hash = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex");

    const admin = await prisma.admin.create({
      data: {
        username,
        password: hash,
        salt
      }
    });

    return Response.json(
      { message: "Admin berhasil dibuat", id: admin.id },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
