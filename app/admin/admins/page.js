// app/admin/admins/page.js
'use client';

import { useState } from 'react';
import AddAdminForm from '@/components/admin/AddAdminForm';

export default function ManageAdmins() {
  // kalau nanti ada API list admin, fetch di sini
  // sementara tampilkan form tambah saja

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kelola Admin</h1>
      
      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Tambah Admin Baru</h2>
        <AddAdminForm />
      </div>

      {/* kalau sudah ada list, tambah di sini nanti */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Daftar Admin</h2>
        <p className="text-gray-500">Fitur list admin akan ditambahkan setelah login & API list selesai.</p>
      </div>
    </div>
  );
}