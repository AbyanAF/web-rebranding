// components/admin/AddAdminForm.js
'use client';

import { useState } from 'react';

export default function AddAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
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
      } else {
        setMessage(data.error || 'Gagal menambah admin');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          className="w-full border rounded px-3 py-2"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Tambah Admin'}
      </button>

      {message && (
        <p className={`mt-3 ${message.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}