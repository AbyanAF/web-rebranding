import Link from "next/link";

/* ambil berita dari backend */
async function getBerita() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export const metadata = {
  title: "Sekolah Berkarakter | Kota Semarang",
  description:
    "Program Pemerintah Kota Semarang dalam membentuk karakter peserta didik",
};

export default async function HomePage() {
  const berita = await getBerita();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          
          {/* KIRI */}
          <div className="hero-text">
            <h1>
              Sekolah <span>Berkarakter</span>
            </h1>

            <p>
              Program Pemerintah Kota Semarang dalam membentuk peserta didik
              yang berintegritas, berakhlak mulia, dan berjiwa gotong royong
              melalui pembiasaan positif di lingkungan sekolah.
            </p>

            <div className="hero-actions">
              <a href="/tentang" className="btn-primary">
                Pelajari Program
              </a>
              <a href="/kegiatan" className="btn-outline">
                Lihat Kegiatan
              </a>
            </div>
          </div>

          {/* KANAN */}
          <div className="hero-visual">
            <div className="hero-box">
              <img src="/karakter/pendidikan-karakter.jpg"
              alt="Ilustrasi Pendidikan Karakter"></img>
            </div>
          </div>
        </div>
      </section>

      {/* NILAI KARAKTER */}
      <section className="program">
        <h2>Nilai Karakter Unggulan</h2>

        <div className="program-grid">
          {[
            {
              slug: "integritas",
              img: "/karakter/integritas-dalam-bekerja.png",
              title: "Integritas",
              desc: "Menanamkan sikap jujur dan tanggung jawab.",
            },
            {
              slug: "disiplin",
              img: "/karakter/OIP.jpg",
              title: "Disiplin",
              desc: "Membentuk kebiasaan tertib dan patuh aturan.",
            },
            {
              slug: "gotong-royong",
              img: "/karakter/gotong royong.png",
              title: "Gotong Royong",
              desc: "Menumbuhkan kepedulian dan kerja sama.",
            },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/berita?karakter=${item.slug}`}
              className="program-card"
            >
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BERITA */}
      <section className="berita">
        <h2>Berita & Informasi</h2>

        {berita.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            Belum ada berita
          </p>
        ) : (
          <div className="berita-grid">
            {berita.map((item) => (
              <article key={item.id} className="berita-card">
                <div className="berita-image">
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
                </div>

                <div className="berita-body">
                  <span className="berita-tag">
                    {item.karakter}
                  </span>

                  <h3>{item.title}</h3>

                  <p>
                    {item.content.slice(0, 120)}...
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
    </>
  );
}
console.log(process.env.NEXT_PUBLIC_BASE_URL);
