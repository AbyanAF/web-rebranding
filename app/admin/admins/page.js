// app/admin/admins/page.js
'use client';

import Link from 'next/link';
import AddAdminForm from '@/components/admin/AddAdminForm';

export default function ManageAdmins() {
  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Kelola Admin</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Tambah atau kelola akun admin untuk akses dashboard sekolah.
      </p>

      {/* Tombol Kembali ke Dashboard */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin"
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '1rem',
          }}
        >
          ← Kembali ke Dashboard
        </Link>
      </div>

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
          <div className="empty-icon" style={{ fontSize: '4rem', color: '#9ca3af' }}>
            👥
          </div>
          <h3 style={{ margin: '16px 0 8px', color: '#111827' }}>Belum ada admin tambahan</h3>
          <p style={{ color: '#6b7280', margin: '0' }}>
            Admin pertama adalah yang Anda gunakan sekarang. Tambahkan admin baru di atas untuk tim.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '16px', fontStyle: 'italic' }}>
            (Daftar admin akan muncul otomatis setelah integrasi dengan database selesai)
          </p>
        </div>
      </div>
    </div>
  );
}