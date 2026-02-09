// app/admin/edit-profile/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProfile() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  // Ambil data profile saat ini untuk pre-fill form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/admin/profile');
        if (res.ok) {
          const data = await res.json();
          setFullName(data.fullName || '');
          setEmail(data.email || '');
          setAddress(data.address || '');
          setProfilePicture(data.profilePicture || '');
        }
      } catch (err) {
        console.error('Gagal load profile:', err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, address, profilePicture }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile berhasil diperbarui!');
        setTimeout(() => {
          router.push('/admin/profil');
          router.refresh();
        }, 1500);
      } else {
        setMessage(data.error || 'Gagal memperbarui profile');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container">
        <p style={{ textAlign: 'center', marginTop: '100px' }}>Memuat data profile...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Edit Profile Admin</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>
        Lengkapi atau ubah informasi pribadi Anda.
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
          <h2>Informasi Pribadi</h2>
          <p>Update nama lengkap, email, alamat, dan foto profil (URL).</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nama Lengkap</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (opsional)</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="contoh@sekolahberkarakter.id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Alamat</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                rows="3"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">URL Foto Profil (opsional)</label>
              <input
                id="profilePicture"
                type="url"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="form-input"
                placeholder="https://example.com/foto-saya.jpg"
              />
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
                Input URL gambar (misal dari imgur atau upload manual ke folder public).
              </p>
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'disabled' : ''}`}
              disabled={loading}
              style={{ marginTop: '16px' }}
            >
              {loading ? 'Memproses...' : 'Simpan Perubahan'}
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