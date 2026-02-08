import Link from "next/link";

export const metadata = {
  title: "Kegiatan | Sekolah Berkarakter Kota Semarang",
  description:
    "Berbagai kegiatan Sekolah Berkarakter untuk membentuk peserta didik yang berintegritas dan berakhlak."
};

export default function KegiatanPage() {
  return (
    <section className="section-soft">
      <div className="section-inner kegiatan">
        <h1>Kegiatan Sekolah Berkarakter</h1>

        <div className="kegiatan-grid">
          <div className="kegiatan-card">
              <img src="/images/Literasi.webp" alt="Gerakan Literasi Sekolah" />
              <span className="kegiatan-badge">Literasi</span>
              <h3>Gerakan Literasi Sekolah</h3>
              <p>
                Membentuk budaya membaca dan menulis untuk meningkatkan daya pikir kritis
                dan karakter peserta didik.
              </p>
            </div>

            <div className="kegiatan-card">
              <img src="/images/gotongroyong.jpg" alt="Gotong Royong" />
              <span className="kegiatan-badge">Gotong Royong</span>
              <h3>Gotong Royong</h3>
              <p>
                Menumbuhkan sikap peduli, kebersamaan, dan tanggung jawab terhadap
                lingkungan sekolah.
              </p>
            </div>

            <div className="kegiatan-card">
              <img src="/images/Disiplin.jpg" alt="Pembiasaan Disiplin" />
              <span className="kegiatan-badge">Pembiasaan</span>
              <h3>Pembiasaan Disiplin</h3>
              <p>
                Membentuk sikap disiplin melalui kegiatan rutin dan tata tertib sekolah.
              </p>
            </div>

            <div className="kegiatan-card">
              <img src="/images/Apel Pagi.jpg" alt="Apel Pagi" />
              <span className="kegiatan-badge">Kebangsaan</span>
              <h3>Apel & Pembiasaan Pagi</h3>
              <p>
                Menanamkan nilai nasionalisme, tanggung jawab, dan kedisiplinan peserta
                didik.
              </p>
            </div>

            <div className="kegiatan-card">
              <img src="/images/Digital Education.jpg" alt="Pendidikan Karakter Digital" />
              <span className="kegiatan-badge">Digital</span>
              <h3>Pendidikan Karakter Digital</h3>
              <p>
                Membentuk etika, tanggung jawab, dan literasi digital dalam penggunaan
                teknologi.
              </p>
            </div>

            <div className="kegiatan-card">
              <img src="/images/Sosial.jpg" alt="Kegiatan Sosial dan Lingkungan" />
              <span className="kegiatan-badge">Lingkungan</span>
              <h3>Kegiatan Sosial & Lingkungan</h3>
              <p>
                Menumbuhkan kepedulian sosial dan kesadaran menjaga lingkungan sekitar.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}
