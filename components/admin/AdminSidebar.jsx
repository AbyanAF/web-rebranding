import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/berita">Kelola Berita</Link>
      <Link href="/admin/profil">Profil</Link>
    </aside>
  );
}
