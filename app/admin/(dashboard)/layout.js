import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/styles/admin.css";

export default async function AdminLayout({ children }) {
  // ✅ WAJIB await
  const cookieStore = await cookies();
  const adminId = cookieStore.get("adminId");

  if (!adminId) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminNavbar />
      <div className="admin-wrapper">
        <AdminSidebar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </>
  );
}
