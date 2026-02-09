// app/api/admin/profile/route.js
const { NextResponse } = require('next/server');
const { prisma } = require('@/lib/prisma');

async function GET(request) {
  // Kalau auth belum ada, kita skip proteksi dulu (nanti bisa tambah)
  // Untuk sekarang ambil admin pertama sebagai contoh (atau ganti logika sesuai kebutuhan lu)
  try {
    const admin = await prisma.admin.findFirst({
      select: {
        username: true,
        fullName: true,
        email: true,
        address: true,
        profilePicture: true,
      },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error('Error fetch profile:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

module.exports = { GET };