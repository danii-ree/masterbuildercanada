"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin-auth") !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-[#f5f6fa]">
      <aside className="w-56 bg-blue-900 text-white flex flex-col py-8 px-4 min-h-screen">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin/dashboard" className="hover:bg-blue-800 rounded px-3 py-2">Dashboard</Link>
          <Link href="/admin/dashboard/portfolio" className="hover:bg-blue-800 rounded px-3 py-2">Portfolio</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
} 