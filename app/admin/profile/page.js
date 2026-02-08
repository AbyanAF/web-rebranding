// app/admin/profile/page.js
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ChangePasswordForm from '@/components/admin/ChangePasswordForm';
import { getCurrentAdmin } from '@/lib/auth';

export default async function AdminProfile() {
  const admin = await getCurrentAdmin();

  // Kalau belum login atau token invalid → redirect ke login admin
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Profile Admin</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Kelola informasi akun dan keamanan password Anda.
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
          <h2>Informasi Akun</h2>
          <p>Detail login dan status akun Anda saat ini.</p>
        </div>

        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {admin.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: '1.1rem', margin: '0' }}>
                <strong>Username:</strong> {admin.username}
              </p>
              <p style={{ color: '#6b7280', marginTop: '4px', fontSize: '0.95rem' }}>
                Terakhir login: {/* Nanti isi dari auth timestamp kalau ada, misal admin.lastLogin */}
              </p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Ubah Password</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Untuk keamanan, gunakan password yang kuat dan berbeda dari sebelumnya.
          </p>

          <ChangePasswordForm username={admin.username} />
        </div>
      </div>
    </div>
  );
}