"use client";

import Image from "next/image";

export default function AdminProfilePage() {
  // dummy data dulu (nanti bisa dari session / database)
  const admin = {
    username: "Admin Sekolah",
    avatar: "/avatar-admin.png", // taruh di /public
  };

  return (
    <div className="admin-profile">
      <div className="profile-card">
        <div className="avatar-wrapper">
          <Image
            src={admin.avatar}
            alt="Admin Avatar"
            width={120}
            height={120}
            className="avatar"
          />
        </div>

        <h2 className="username">{admin.username}</h2>
        <p className="role">Administrator</p>
      </div>
    </div>
  );
}
