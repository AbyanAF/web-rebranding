export default function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      {/* HEADER */}
      <header className="admin-header">
        <h1>Dashboard Admin</h1>
        <p>
          Selamat datang di panel admin <strong>Sekolah Berkarakter</strong>.
          Gunakan halaman ini sebagai panduan sebelum menulis berita.
        </p>
      </header>

      {/* CARD PANDUAN */}
      <div className="admin-card">
        <h2>📌 Panduan Menulis Berita yang Baik</h2>

        <ol className="admin-guide">
          <li>
            <strong>Judul jelas & informatif</strong>
            <p>
              Gunakan judul singkat, padat, dan mencerminkan isi berita.
              Hindari judul terlalu panjang atau ambigu.
            </p>
          </li>

          <li>
            <strong>Gunakan slug yang rapi</strong>
            <p>
              Slug harus huruf kecil, tanpa spasi, dan dipisahkan tanda
              strip (-). Contoh: <code>kegiatan-pramuka-2025</code>
            </p>
          </li>

          <li>
            <strong>Pilih karakter yang sesuai</strong>
            <p>
              Sesuaikan karakter berita seperti <em>Disiplin</em>,
              <em> Tanggung Jawab</em>, atau <em>Gotong Royong</em>
              agar mudah difilter di halaman publik.
            </p>
          </li>

          <li>
            <strong>Isi berita terstruktur</strong>
            <p>
              Gunakan paragraf yang rapi, jelas, dan mudah dibaca.
              Hindari satu paragraf terlalu panjang.
            </p>
          </li>

          <li>
            <strong>Periksa kembali sebelum simpan</strong>
            <p>
              Pastikan tidak ada typo, karakter sudah benar,
              dan isi berita sesuai konteks pendidikan.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
