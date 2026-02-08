"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // ⛔ klik di luar dropdown → nutup
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  }

  return (
    <header className="admin-navbar">
      <h1>Admin Panel</h1>

      <div className="admin-profile" ref={menuRef}>
        <button
          className="admin-profile-btn"
          onClick={() => setOpen(!open)}
        >
          Admin <span>▾</span>
        </button>

        {open && (
          <div className="admin-dropdown">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/admin/profil");
              }}
            >
              ✏️ Edit Profil
            </button>

            <button
              onClick={handleLogout}
              className="logout"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
