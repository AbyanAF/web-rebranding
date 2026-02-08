"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    setLoading(false);

    if (res.ok) {
      router.push("/admin/berita");
    } else {
      setError("Username atau password salah");
    }
  }

  return (
    <div className="admin-auth-wrapper">
      <div className="admin-login-card">
        <h1>Login Admin</h1>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button disabled={loading}>
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
