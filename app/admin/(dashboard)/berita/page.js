"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchBerita() {
    const res = await fetch("/api/news", {
      cache: "no-store",
    });
    const data = await res.json();
    setBerita(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Yakin hapus berita ini?")) return;

    const res = await fetch(`/api/news/admin/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchBerita();
    } else {
      alert("Gagal menghapus berita");
    }
  }

  useEffect(() => {
    fetchBerita();
  }, []);

  return (
    <>
      <div className="admin-header">
        <h2>Manajemen Berita</h2>

        <Link href="/admin/berita/tambah" className="admin-btn">
          + Tambah Berita
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Karakter</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {berita.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.karakter}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="actions">
                  {/* ✅ EDIT PAKAI ID */}
                  <Link
                    href={`/admin/berita/edit/${item.id}`}
                    className="edit"
                  >
                    Edit
                  </Link>

                  {/* ✅ DELETE PAKAI ID */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
