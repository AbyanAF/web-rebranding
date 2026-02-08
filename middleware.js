import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ IZINKAN HALAMAN LOGIN
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔐 AMBIL COOKIE LOGIN ADMIN
  const adminId = req.cookies.get("adminId")?.value;

  // ❌ BLOK SEMUA /admin JIKA BELUM LOGIN
  if (!adminId) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

// ⛔ PENTING: JANGAN KENA API
export const config = {
  matcher: ["/admin/:path*"],
};
