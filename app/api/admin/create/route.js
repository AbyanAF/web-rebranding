import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateSalt, hashPassword } from '@/lib/hash';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password?.trim()) {
      return NextResponse.json(
        { error: 'Username dan password harus diisi' },
        { status: 400 }
      );
    }

    const existing = await prisma.admin.findUnique({
      where: { username },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 409 }
      );
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        salt,
      },
    });

    // hapus data sensitif sebelum dikirim balik
    const { password: _, salt: __, ...safeAdmin } = newAdmin;

    return NextResponse.json({
      message: 'Admin berhasil ditambahkan',
      admin: safeAdmin,
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Gagal menambah admin' },
      { status: 500 }
    );
  }
}