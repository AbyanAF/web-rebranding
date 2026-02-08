import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DetailBerita({ params }) {
  const { slug } = await params;

  const berita = await prisma.berita.findUnique({
    where: { slug },
  });

  if (!berita) notFound();

  return (
    <section className="section-soft">
      <article className="detail-berita">
        {/* ===== HERO IMAGE ===== */}
        <div className="detail-hero">
          <img
            src={
              berita.image
                ? berita.image.startsWith("/")
                  ? berita.image
                  : `/uploads/${berita.image}`
                : "/placeholder.jpg"
            }
            alt={berita.title}
          />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="detail-container">
          {/* breadcrumb */}
          <nav className="detail-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <Link href="/berita">Berita</Link>
          </nav>

          <span className={`berita-tag karakter-${berita.karakter}`}>
            {berita.karakter.replace("_", " ")}
          </span>

          <h1 className="detail-title">{berita.title}</h1>

          <time className="detail-date">
            {new Date(berita.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>

          <div className="detail-content">
            <div
              className="detail-article"
              dangerouslySetInnerHTML={{ __html: berita.content }}
            />
          </div>

          <div className="detail-footer">
            <Link href="/berita">← Kembali ke Berita</Link>
          </div>
        </div>
      </article>
    </section>
  );
}
