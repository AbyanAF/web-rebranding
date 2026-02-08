import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    message: "Logout berhasil",
  });

  res.cookies.set({
    name: "adminId",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return res;
}
