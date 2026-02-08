import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Karakter } from "@prisma/client";

/* =========================
   GET /api/news/admin/[id]
========================= */
export async function GET(req, { params }) {
  const { id } = await params; // ✅ WAJIB
  const beritaId = Number(id);

  if (isNaN(beritaId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400 }
    );
  }

  const berita = await prisma.berita.findUnique({
    where: { id: beritaId },
  });

  if (!berita) {
    return NextResponse.json(
      { error: "Berita tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(berita);
}

/* =========================
   PUT /api/news/admin/[id]
========================= */
export async function PUT(req, { params }) {
  try {
    const { id } = await params; // ✅ WAJIB
    const beritaId = Number(id);
    const body = await req.json();

    if (isNaN(beritaId)) {
      return NextResponse.json(
        { error: "ID tidak valid" },
        { status: 400 }
      );
    }

    // ✅ VALIDASI ENUM KARAKTER
    if (
      body.karakter &&
      !Object.values(Karakter).includes(body.karakter)
    ) {
      return NextResponse.json(
        { error: "Karakter tidak valid" },
        { status: 400 }
      );
    }

    const updated = await prisma.berita.update({
      where: { id: beritaId },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        karakter: body.karakter,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("EDIT ERROR:", err);
    return NextResponse.json(
      { error: "Gagal mengedit berita" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/news/admin/[id]
========================= */
export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ✅ WAJIB
    const beritaId = Number(id);

    if (isNaN(beritaId)) {
      return NextResponse.json(
        { error: "ID tidak valid" },
        { status: 400 }
      );
    }

    await prisma.berita.delete({
      where: { id: beritaId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
