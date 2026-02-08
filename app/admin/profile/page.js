// app/admin/profile/page.js
'use client';

import ChangePasswordForm from '@/components/admin/ChangePasswordForm';

export default function AdminProfile() {
  // nanti ganti dengan username dari session/auth (sementara hardcode)
  const username = "admin_saat_ini"; // ← ganti dengan logic auth nanti

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile Admin</h1>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Informasi Akun</h2>
        <p className="mb-6 text-lg">
          Username: <strong>{username}</strong>
        </p>

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Ubah Password</h2>
        <ChangePasswordForm username={username} />
      </div>
    </div>
  );
}