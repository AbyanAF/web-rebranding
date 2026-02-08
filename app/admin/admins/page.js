// app/admin/admins/page.js
'use client';

import AddAdminForm from '@/components/admin/AddAdminForm';

export default function ManageAdmins() {
  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Kelola Admin</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Tambah atau kelola akun admin untuk akses dashboard.
      </p>

      <div className="card">
        <div className="card-header">
          <h2>Tambah Admin Baru</h2>
          <p>Buat akun admin dengan username dan password yang kuat (minimal 8 karakter).</p>
        </div>
        <div className="card-body">
          <AddAdminForm />
        </div>
      </div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Daftar Admin</h2>
      <div className="card">
        <div className="empty-state">
          <div className="empty-icon">👥</div> {/* atau pakai SVG kalau mau */}
          <h3>Belum ada admin tambahan</h3>
          <p>Tambahkan admin baru di atas untuk mendukung tim pengelola sekolah.</p>
        </div>
      </div>
    </div>
  );
}