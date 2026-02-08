"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/news/admin", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/berita");
    } else {
      alert("Gagal menambahkan berita");
    }
  }

    return (
  <div className="admin-page">
    <div className="admin-layout">

      {/* KIRI (kosong / spacer) */}
      <aside className="admin-side" />

      {/* TENGAH - FORM */}
      <main className="admin-form">
        <h2>Tambah Berita</h2>

        <form onSubmit={handleSubmit}>
          <label>Judul</label>
          <input name="title" required />

          <label>Slug</label>
          <input name="slug" required />

          <label>Karakter</label>
          <select name="karakter" required>
            <option value="">-- Pilih Karakter --</option>
            <option value="RELIGIUS">Religius</option>
            <option value="DISIPLIN">Disiplin</option>
            <option value="INTEGRITAS">Integritas</option>
            <option value="GOTONG_ROYONG">Gotong Royong</option>
            <option value="MANDIRI">Mandiri</option>
            <option value="KREATIF">Kreatif</option>
            <option value="NASIONALISME">Nasionalisme</option>
            <option value="PEDULI_LINGKUNGAN">Peduli Lingkungan</option>
          </select>

          <label>Isi Berita</label>
          <textarea name="content" rows={6} required />

          <label>Gambar</label>
          <input type="file" name="image" accept="image/*" />

          <button className="admin-btn" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </main>

      {/* KANAN - CATATAN */}
      <aside className="admin-note">
        <h4>Catatan Penulisan</h4>
        <ul>
          <li>Gunakan tag <code>&lt;p&gt;</code> untuk paragraf</li>
          <li>Gunakan <code>&lt;strong&gt;</code> untuk penekanan</li>
          <li>Judul sebaiknya singkat & jelas</li>
          <li>Isi berita minimal 2 paragraf</li>
          <li>Disarankan gambar dengan dimensi 1000x750</li>
        </ul>
      </aside>

    </div>
  </div>
);
}

