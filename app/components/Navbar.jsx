"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    pathname === path ? "active" : "";

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <img src="/images/logo-pemkot-semarang-png-3.png" 
        alt="Logo Kota Semarang" 
        className="logo-img"/>
        <div className="navbar-logo">
          <Link href="/" onClick={closeMenu}>
            Sekolah Berkarakter
          </Link>
        </div>

        {/* TOGGLE (MOBILE) */}
        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* MENU */}
        <nav className={`navbar-menu ${open ? "open" : ""}`}>
          <Link
            href="/"
            className={isActive("/")}
            onClick={closeMenu}
          >
            Beranda
          </Link>

          <Link
            href="/berita"
            className={isActive("/berita")}
            onClick={closeMenu}
          >
            Berita
          </Link>

          <Link
            href="/tentang"
            className={isActive("/tentang")}
            onClick={closeMenu}
          >
            Tentang
          </Link>

          <Link
            href="/kegiatan"
            className={isActive("/kegiatan")}
            onClick={closeMenu}
          >
            Kegiatan
          </Link>

          <Link
            href="/nilai"
            className={isActive("/nilai")}
            onClick={closeMenu}
          >
            Nilai
          </Link>

          <Link
            href="/kontak"
            className={isActive("/kontak")}
            onClick={closeMenu}
          >
            Kontak
          </Link>

          {/* ADMIN */}
          <Link
            href="/admin/login"
            className={isActive("/admin/login")}
            onClick={closeMenu}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
