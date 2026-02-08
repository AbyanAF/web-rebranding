import Link from "next/link";

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

/* =========================
   FETCH DATA
========================= */
async function getBerita(karakter) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news`;

  if (karakter) {
    url += `?karakter=${karakter}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil berita");
  }

  return res.json();
}

export const metadata = {
  title: "Berita | Sekolah Berkarakter",
};

/* =========================
   PAGE
========================= */
export default async function BeritaPage({ searchParams }) {
  // ✅ FIX: searchParams di App Router = Promise
  const params = await searchParams;
  const karakter = params?.karakter || null;

  const berita = await getBerita(karakter);

  return (
    <section className="berita-page">
      <h1>Berita & Informasi</h1>

      {/* ================= FILTER ================= */}
      <div className="berita-filter">
        <Link
          href="/berita"
          className={!karakter ? "active" : ""}
        >
          Semua
        </Link>

        {KARAKTER_LIST.map((k) => (
          <Link
            key={k.key}
            href={`/berita?karakter=${k.key}`}
            className={karakter === k.key ? "active" : ""}
          >
            {k.label}
          </Link>
        ))}
      </div>

      {/* ================= LIST ================= */}
      {berita.length === 0 ? (
        <p className="berita-empty">
          Belum ada berita untuk kategori ini.
        </p>
      ) : (
        <div className="berita-grid">
          {berita.map((item) => (
            <article key={item.id} className="berita-card">
              <img
                src={
                  item.image
                    ? item.image.startsWith("/")
                      ? item.image
                      : `/uploads/${item.image}`
                    : "/placeholder.jpg"
                }
                alt={item.title}
              />

              <div className="berita-body">
                {/* ✅ BADGE WARNA PER KARAKTER */}
                <span
                  className={`berita-tag karakter-${item.karakter}`}
                >
                  {item.karakter.replace("_", " ")}
                </span>

                <h3>{item.title}</h3>

                <p>
                  {item.content.length > 120
                    ? item.content.slice(0, 120) + "..."
                    : item.content}
                </p>

                <Link
                  href={`/berita/${item.slug}`}
                  className="berita-link"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
