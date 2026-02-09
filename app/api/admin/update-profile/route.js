// app/api/admin/update-profile/route.js
const { NextResponse } = require('next/server');
const { prisma } = require('@/lib/prisma');

async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, address, profilePicture } = body;

    // Update admin pertama (atau ganti logika sesuai username kalau auth sudah ada)
    const admin = await prisma.admin.findFirst(); // sementara ambil yang pertama

    if (!admin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        fullName: fullName || admin.fullName,
        email: email || null,
        address: address || null,
        profilePicture: profilePicture || null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error update profile:', error);
    return NextResponse.json({ error: 'Gagal menyimpan perubahan' }, { status: 500 });
  }
}

module.exports = { POST };