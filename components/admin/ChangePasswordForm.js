// components/admin/ChangePasswordForm.js
'use client';

import { useState } from 'react';

export default function ChangePasswordForm({ username }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validasi tambahan di client-side
    if (newPassword !== confirmPassword) {
      setMessage('Konfirmasi password baru tidak sama');
      return;
    }
    if (newPassword.length < 8) {
      setMessage('Password baru minimal 8 karakter');
      return;
    }
    if (newPassword === currentPassword) {
      setMessage('Password baru tidak boleh sama dengan password saat ini');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password berhasil diubah!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.error || 'Gagal mengubah password');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="current-password">Password Saat Ini</label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="form-input"
          placeholder="Masukkan password lama Anda"
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
          placeholder="Minimal 8 karakter"
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
          placeholder="Ulangi password baru"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${loading ? 'disabled' : ''}`}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Simpan Perubahan'}
      </button>

      {message && (
        <div
          className={`message ${
            message.includes('berhasil') ? 'message-success' : 'message-error'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}