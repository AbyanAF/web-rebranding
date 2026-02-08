import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword, generateSalt, hashPassword } from '@/lib/hash';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, currentPassword, newPassword } = body;

    if (!username || !currentPassword || !newPassword?.trim()) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin tidak ditemukan' },
        { status: 404 }
      );
    }

    // Verifikasi password lama
    const isValid = verifyPassword(currentPassword, admin.password, admin.salt);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Password saat ini salah' },
        { status: 401 }
      );
    }

    // Generate salt baru & hash password baru
    const newSalt = generateSalt();
    const newHashed = hashPassword(newPassword, newSalt);

    await prisma.admin.update({
      where: { username },
      data: {
        password: newHashed,
        salt: newSalt,
      },
    });

    return NextResponse.json({
      message: 'Password berhasil diubah',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Gagal mengubah password' },
      { status: 500 }
    );
  }
}