"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

/* =========================
   MASTER KARAKTER
========================= */
const KARAKTER_LIST = [
  { key: "RELIGIUS", label: "Religius" },
  { key: "DISIPLIN", label: "Disiplin" },
  { key: "INTEGRITAS", label: "Integritas" },
  { key: "GOTONG_ROYONG", label: "Gotong Royong" },
  { key: "MANDIRI", label: "Mandiri" },
  { key: "KREATIF", label: "Kreatif" },
  { key: "NASIONALISME", label: "Nasionalisme" },
  { key: "PEDULI_LINGKUNGAN", label: "Peduli Lingkungan" },
];

export default function EditBeritaPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    karakter: "RELIGIUS",
  });

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    if (!id) return;

    async function fetchBerita() {
      const res = await fetch(`/api/news/admin/${id}`);
      const data = await res.json();

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        karakter: data.karakter || "RELIGIUS",
      });

      setLoading(false);
    }

    fetchBerita();
  }, [id]);

  /* =========================
     SUBMIT
  ========================= */
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/news/admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin/berita");
    } else {
      alert("Gagal mengedit berita");
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Memuat data...</p>;
  }

  return (
    <div className="admin-page">
      <div className="admin-layout">

        {/* KIRI */}
        <aside className="admin-side" />

        {/* TENGAH */}
        <main className="admin-form">
          <h2>Edit Berita</h2>

          <form onSubmit={handleSubmit}>
            <label>Judul</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <label>Slug</label>
            <input
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
              required
            />

            <label>Karakter</label>
            <select
              value={form.karakter}
              onChange={(e) =>
                setForm({ ...form, karakter: e.target.value })
              }
              required
            >
              {KARAKTER_LIST.map((k) => (
                <option key={k.key} value={k.key}>
                  {k.label}
                </option>
              ))}
            </select>

            <label>Isi Berita</label>
            <textarea
              rows={12}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              required
            />

            <button className="admin-btn" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </main>

        {/* KANAN */}
        <aside className="admin-note">
          <h4>Catatan</h4>
          <ul>
            <li>Pastikan isi berita jelas & rapi</li>
            <li>Minimal 2 paragraf</li>
            <li>Gunakan bahasa formal</li>
          </ul>
        </aside>

      </div>
    </div>
  );
}
