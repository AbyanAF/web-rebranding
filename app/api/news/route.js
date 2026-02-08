import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const karakter = searchParams.get("karakter");

  const berita = await prisma.berita.findMany({
    where: karakter ? { karakter } : {},
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(berita);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const news = await prisma.berita.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        karakter: body.karakter,
        image: body.image || "/placeholder.jpg", // ✅
      },
    });

    return NextResponse.json(news);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan berita" },
      { status: 500 }
    );
  }
}
