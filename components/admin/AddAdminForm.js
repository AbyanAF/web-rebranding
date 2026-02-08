// components/admin/AddAdminForm.js
'use client';

import { useState } from 'react';

export default function AddAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi tidak cocok');
      return;
    }
    if (password.length < 8) {
      setMessage('Password minimal 8 karakter');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Admin berhasil ditambahkan!');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.error || 'Gagal menambah admin');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          className="form-input"
          placeholder="masukkan username baru"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="minimal 8 karakter"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Konfirmasi Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
          placeholder="ulangi password"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${loading ? 'disabled' : ''}`}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Tambah Admin'}
      </button>

      {message && (
        <div className={`message ${message.includes('berhasil') || message.includes('ditambahkan') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}
    </form>
  );
}