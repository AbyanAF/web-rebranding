// Misal: app/admin/dashboard/page.js atau komponen utama admin
"use client";

import Image from "next/image";

export default function AdminProfilePage() {
  // dummy data dulu (nanti ambil dari auth/session)
  const admin = {
    username: "Admin Sekolah",
    avatar: "/avatar-admin.png", // pastikan file ada di /public/avatar-admin.png
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card-header" style={{ textAlign: 'center', padding: '24px 24px 16px' }}>
          <h1 style={{ fontSize: '1.8rem', margin: '0' }}>Dashboard Admin</h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>
            Selamat datang kembali, kelola akun dan keamanan di sini.
          </p>
        </div>

        <div className="card-body" style={{ padding: '32px 24px', textAlign: 'center' }}>
          {/* Avatar & Info */}
          <div className="avatar-wrapper" style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 16px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '4px solid #2563eb'
          }}>
            <Image
              src={admin.avatar}
              alt="Admin Avatar"
              width={120}
              height={120}
              className="avatar"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <h2 className="username" style={{
            fontSize: '1.6rem',
            margin: '0 0 4px',
            color: '#111827'
          }}>
            {admin.username}
          </h2>

          <p className="role" style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: '0 0 32px'
          }}>
            Administrator Sekolah Berkarakter
          </p>

          {/* Link Actions - Diperindah jadi card-like buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="/admin/profile"
              className="action-link"
              style={{
                display: 'block',
                padding: '16px 24px',
                background: '#eff6ff',
                color: '#1d4ed8',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'all 0.2s',
                border: '1px solid #bfdbfe'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#dbeafe';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#eff6ff';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Ubah Password Saya
            </a>

            <a
              href="/admin/admins"
              className="action-link"
              style={{
                display: 'block',
                padding: '16px 24px',
                background: '#f0fdf4',
                color: '#15803d',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'all 0.2s',
                border: '1px solid #bbf7d0'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#dcfce7';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(22,163,74,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f0fdf4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Kelola Admin Lain (Tambah/Hapus)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}