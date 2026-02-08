import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* =========================
   GET /api/news/[slug]
   ========================= */
export async function GET(req, { params }) {
  try {
    const berita = await prisma.berita.findUnique({
      where: { slug: params.slug },
    });

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(berita);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal mengambil berita" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT /api/news/[slug]
   ========================= */
export async function PUT(req, { params }) {
  try {
    const { slug } = params;
    const body = await req.json();

    const { title, content, karakter } = body;

    if (!title || !content || !karakter) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const berita = await prisma.berita.update({
      where: { slug },
      data: {
        title,
        slug: newSlug,
        content,
        karakter,
      },
    });

    return NextResponse.json(berita);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal update berita" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/news/[slug]
   ========================= */
export async function DELETE(req, { params }) {
  try {
    await prisma.berita.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
