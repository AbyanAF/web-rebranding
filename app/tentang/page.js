export default function TentangPage() {
  return (
    <section className="visi-misi-section">
      <div className="visi-misi-container">
        <h1>Visi & Misi Sekolah Berkarakter</h1>

        {/* VISI */}
        <div className="visi-box">
          <h2>Visi</h2>
          <p>
            Terwujudnya generasi berkarakter yang berintegritas, berakhlak mulia,
            cerdas, dan berdaya saing melalui budaya sekolah yang positif dan
            kolaboratif.
          </p>
        </div>

        {/* MISI */}
        <section className="misi-section">
          <h2 className="section-title">Misi</h2>
        </section>
        <div className="misi-grid">
          <div className="misi-card">
            <h4>Menanamkan nilai karakter dalam proses pembelajaran</h4>
            <p>
              Mengintegrasikan nilai religius, disiplin, dan integritas dalam setiap
              kegiatan belajar mengajar di sekolah.
            </p>
          </div>

          <div className="misi-card">
            <h4>Mengembangkan budaya sekolah yang positif dan inklusif</h4>
            <p>
              Menciptakan lingkungan sekolah yang saling menghargai, aman, dan
              mendukung perkembangan karakter peserta didik.
            </p>
          </div>

          <div className="misi-card">
            <h4>Melibatkan peran aktif orang tua dan masyarakat</h4>
            <p>
              Membangun kolaborasi antara sekolah, orang tua, dan masyarakat
              dalam pembentukan karakter peserta didik.
            </p>
          </div>

          <div className="misi-card">
            <h4>Menciptakan lingkungan belajar yang aman dan bermakna</h4>
            <p>
              Menyediakan suasana belajar yang nyaman, kondusif, dan mendorong
              tumbuhnya sikap positif pada peserta didik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
