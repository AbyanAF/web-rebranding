// app/admin/admins/page.js
// TIDAK ADA 'use client'; di sini → server component

import Link from 'next/link';
import AddAdminForm from '@/components/admin/AddAdminForm';
import AdminTable from '@/components/admin/AdminTable'; // ← import dari file baru (atau sesuaikan path kalau lu taruh di components)
import { prisma } from '@/lib/prisma';

export default async function ManageAdmins() {
  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      address: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Kelola Admin</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Tambah atau kelola akun admin untuk akses dashboard.
      </p>

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

      <div className="card" style={{ marginBottom: '40px' }}>
        <div className="card-header">
          <h2>Tambah Admin Baru</h2>
          <p>Buat akun admin dengan username dan password yang kuat (minimal 8 karakter).</p>
        </div>
        <div className="card-body">
          <AddAdminForm />
        </div>
      </div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Daftar Admin</h2>

      {admins.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon" style={{ fontSize: '4rem', color: '#9ca3af' }}>👥</div>
            <h3 style={{ margin: '16px 0 8px' }}>Belum ada admin tambahan</h3>
            <p style={{ color: '#6b7280' }}>
              Tambahkan admin baru di atas untuk mendukung tim pengelola sekolah.
            </p>
          </div>
        </div>
      ) : (
        <AdminTable admins={admins} />
      )}
    </div>
  );
}