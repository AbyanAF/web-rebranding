import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sekolah Berkarakter</h3>
          <p>
            Program Pemerintah Kota Semarang dalam membangun karakter peserta didik
            melalui nilai-nilai kebangsaan, integritas, dan gotong royong.
          </p>
        </div>

        <div className="footer-section">
          <h4>Menu</h4>
          <ul>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/tentang">Tentang</Link></li>
            <li><Link href="/kegiatan">Kegiatan</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Kontak</h4>
          <p>Dinas Pendidikan Kota Semarang</p>
          <p>Email: disdik@semarangkota.go.id</p>
          <p>Telepon: (024) 123456</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Pemerintah Kota Semarang. All rights reserved.
      </div>
    </footer>
  );
}
