"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username === "mrrayati" && password === "Mohsen4112") {
      localStorage.setItem("admin-auth", "true");
      setError("");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoComplete="current-password"
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-blue-900 text-white rounded py-2 font-semibold hover:bg-blue-800 transition">Login</button>
        </form>
      </div>
    </div>
  );
} 