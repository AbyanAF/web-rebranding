import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Karakter } from "@prisma/client";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const content = formData.get("content");
    const karakter = formData.get("karakter");
    const image = formData.get("image");

    // ✅ VALIDASI ENUM
    if (!Object.values(Karakter).includes(karakter)) {
      return NextResponse.json(
        { error: "Karakter tidak valid" },
        { status: 400 }
      );
    }

    let fileName = null;

    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fileName = `${Date.now()}-${image.name}`;
      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    }

    const berita = await prisma.berita.create({
      data: {
        title,
        slug,
        content,
        karakter, // ✅ ENUM AMAN
        image: fileName,
      },
    });

    return NextResponse.json(berita);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menambahkan berita" },
      { status: 500 }
    );
  }
}
