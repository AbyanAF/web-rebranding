export const metadata = {
  title: "Kontak | Sekolah Berkarakter Kota Semarang",
  description:
    "Informasi kontak Program Sekolah Berkarakter Kota Semarang."
};

export default function Kontak() {
  return (
    <section className="page">
      <h1 className="page-title">Kontak</h1>

      <p className="page-desc">
        Untuk informasi lebih lanjut mengenai Program Sekolah
        Berkarakter Kota Semarang, silakan menghubungi kami melalui
        informasi berikut.
      </p>

      <div className="kontak-grid">
        <div className="kontak-card">
          <h3>Informasi Kontak</h3>
          <ul>
            <li><strong>Alamat:</strong> Jl. Pendidikan No. 10, Semarang</li>
            <li><strong>Email:</strong> sekolahberkarakter@example.go.id</li>
            <li><strong>Telepon:</strong> (024) 555-1234</li>
            <li><strong>Jam Operasional:</strong> Senin – Jumat, 08.00 – 16.00 WIB</li>
          </ul>
        </div>

        <div className="kontak-note">
          <h3>Catatan</h3>
          <p>
            Website ini merupakan bagian dari proyek rebranding
            Program Sekolah Berkarakter Kota Semarang dan digunakan
            sebagai media informasi serta edukasi kepada masyarakat.
            Data bersifat contoh dan dapat disesuaikan.
          </p>
        </div>
      </div>
    </section>
  );
}
