// app/api/admin/delete-admin/route.js
const { NextResponse } = require('next/server');
const { prisma } = require('@/lib/prisma');
const { getCurrentUsername } = require('@/lib/auth'); // kalau lu udah punya, atau skip dulu kalau belum

async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID admin dibutuhkan' }, { status: 400 });
    }

    // Ambil username yang sedang login (kalau auth belum ada, skip proteksi ini dulu)
    const currentUsername = getCurrentUsername(); // kalau belum punya, comment baris ini
    const adminToDelete = await prisma.admin.findUnique({
      where: { id: Number(id) },
      select: { username: true },
    });

    if (!adminToDelete) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    // Proteksi: jangan hapus diri sendiri
    if (currentUsername && adminToDelete.username === currentUsername) {
      return NextResponse.json({ error: 'Tidak bisa menghapus akun Anda sendiri' }, { status: 403 });
    }

    // Hapus admin
    await prisma.admin.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error hapus admin:', error);
    return NextResponse.json({ error: 'Gagal menghapus admin' }, { status: 500 });
  }
}

module.exports = { POST };