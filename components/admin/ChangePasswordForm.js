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
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage('Konfirmasi password tidak sama');
      setLoading(false);
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium">Password Saat Ini</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password Baru</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Konfirmasi Password Baru</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Simpan Perubahan'}
      </button>

      {message && (
        <p className={`mt-3 ${message.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}