// app/admin/edit-password/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('Memuat...');
  const router = useRouter();

  // Ambil username dari API profile (atau dari auth kalau sudah full)
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await fetch('/api/admin/profile');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || 'admin');
        }
      } catch (err) {
        setUsername('Error');
      }
    };
    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Konfirmasi password baru tidak cocok');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password baru minimal 8 karakter');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password berhasil diubah!');
        setTimeout(() => {
          router.push('/admin/profil');
          router.refresh();
        }, 1500);
      } else {
        setMessage(data.error || 'Gagal mengubah password');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Ubah Password</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Ganti kata sandi akun admin Anda untuk meningkatkan keamanan.
      </p>

      {/* Tombol Kembali */}
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
          <h2>Form Ubah Password</h2>
          <p>Masukkan password lama dan password baru yang kuat.</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="current-password">Password Saat Ini</label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-password">Password Baru</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Konfirmasi Password Baru</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'disabled' : ''}`}
              disabled={loading}
              style={{ marginTop: '16px' }}
            >
              {loading ? 'Memproses...' : 'Ubah Password'}
            </button>

            {message && (
              <div
                className={`message ${
                  message.includes('berhasil') ? 'message-success' : 'message-error'
                }`}
                style={{ marginTop: '16px' }}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}