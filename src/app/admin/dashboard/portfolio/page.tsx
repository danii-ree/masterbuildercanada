"use client";
import { useState, useRef, useEffect } from "react";

export default function PortfolioAdmin() {
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setPortfolio(data.images || []);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!fileInputRef.current?.files?.length) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    await fetch("/api/portfolio/upload", {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    fetchPortfolio();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete(img: string) {
    await fetch(`/api/portfolio/delete?img=${encodeURIComponent(img)}`, { method: "DELETE" });
    fetchPortfolio();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Portfolio</h2>
      <form onSubmit={handleUpload} className="flex gap-4 items-center mb-6">
        <input type="file" accept="image/*" ref={fileInputRef} className="border rounded px-2 py-1" required />
        <button type="submit" className="bg-blue-900 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {portfolio.map((img, idx) => (
          <div key={idx} className="relative group border rounded overflow-hidden">
            <img src={`/portfolio/${img}`} alt="Portfolio" className="w-full h-32 object-cover" />
            <button onClick={() => handleDelete(img)} className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
} 