import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Sekolah Berkarakter",
  description: "Program Pemerintah Kota Semarang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
