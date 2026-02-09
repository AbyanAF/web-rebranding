// app/admin/admins/AdminTable.js
'use client';

import { useRouter } from 'next/navigation';

export default function AdminTable({ admins }) {
  const router = useRouter();

  const handleDelete = async (id, username) => {
    if (!confirm(`Yakin hapus admin "${username}"? Permanen!`)) return;

    try {
      const res = await fetch('/api/admin/delete-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Admin berhasil dihapus');
        router.refresh(); // refresh data halaman tanpa reload full
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi');
    }
  };

  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Username</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Nama Lengkap</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Alamat</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Dibuat Pada</th>
            <th style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px 16px' }}>{admin.username}</td>
              <td style={{ padding: '12px 16px' }}>{admin.fullName || '-'}</td>
              <td style={{ padding: '12px 16px' }}>{admin.email || '-'}</td>
              <td style={{ padding: '12px 16px' }}>{admin.address || '-'}</td>
              <td style={{ padding: '12px 16px' }}>
                {new Date(admin.createdAt).toLocaleString('id-ID', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button
                  onClick={() => handleDelete(admin.id, admin.username)}
                  style={{
                    color: '#dc2626',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}