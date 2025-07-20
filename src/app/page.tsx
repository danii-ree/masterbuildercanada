"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";

export default function Home() {
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);
  const [estimateName, setEstimateName] = useState("");
  const [estimateEmail, setEstimateEmail] = useState("");
  const [estimateDesc, setEstimateDesc] = useState("");
  const [estimateStatus, setEstimateStatus] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch("/api/portfolio")
  //     .then((res) => res.json())
  //     .then((data) => setPortfolioImages(data.images || []));
  // }, []);

  async function handleEstimateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstimateStatus(null);
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: estimateName, email: estimateEmail, description: estimateDesc }),
    });
    if (res.ok) {
      setEstimateStatus("Your request has been sent!");
      setEstimateName("");
      setEstimateEmail("");
      setEstimateDesc("");
      setShowEstimate(false);
    } else {
      setEstimateStatus("There was an error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans">
      {/* Navigation */}
      {/* <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo-placeholder.svg" alt="Logo" width={48} height={32} />
          <span className="font-bold text-xl tracking-wide">Master Builder Custom Carpentry</span>
        </div>
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>
      </nav> */}

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image src="https://i.imgur.com/GdIkuL6.jpeg" alt="Hero" fill className="object-cover z-0" priority />
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">Master Builder</h1>
            <div className="text-lg tracking-widest mb-2">Custom Carpentery</div>
          </div>
        </div>
      </section>

      {/* Add this button at the top or in a prominent place */}
      <div className="flex justify-center my-8">
        <button onClick={() => setShowEstimate(true)} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">Get an Estimate</button>
      </div>
      {/* Estimate Modal */}
      {showEstimate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowEstimate(false)} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Get an Estimate</h2>
            <form onSubmit={handleEstimateSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Name" value={estimateName} onChange={e => setEstimateName(e.target.value)} className="border rounded px-4 py-2 text-gray-500" required />
              <input type="email" placeholder="Email" value={estimateEmail} onChange={e => setEstimateEmail(e.target.value)} className="border rounded px-4 py-2 text-gray-500" required />
              <textarea placeholder="Describe your project" value={estimateDesc} onChange={e => setEstimateDesc(e.target.value)} className="border rounded px-4 py-2 min-h-[100px] text-gray-500" required />
              <button type="submit" className="bg-blue-900 text-white rounded py-2 font-semibold hover:bg-blue-800 transition">Send Request</button>
            </form>
            {estimateStatus && <div className="mt-4 text-center text-blue-700">{estimateStatus}</div>}
          </div>
        </div>
      )}

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-blue-900 text-lg font-semibold mb-2 tracking-widest">MISSION</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To leave a mark on our company to make it better than we found it by listening to the needs of our collaborators, customers, suppliers and partners by solving their problems in an innovative way with passion.
          </p>
        </div>
        <div className="w-full h-48 md:h-64 relative">
          <Image src="https://i.imgur.com/AfLX6DQ.jpeg" alt="Mission" fill className="object-cover rounded-lg shadow" />
        </div>
      </section>

      {/* Portfolio Section 
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {portfolioImages.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No projects yet.</div>
          )}
          {portfolioImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <Image src={`/portfolio/${img}`} alt="Project" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="bg-[#e9eef6] py-16 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-3xl w-full flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6 w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center md:text-left">Get in Touch</h2>
            <div className="flex items-center gap-4 text-blue-800">
              <Phone className="w-6 h-6" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-lg font-semibold">(647) 525-1581</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-blue-800">
              <Mail className="w-6 h-6" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-lg font-semibold">masterbuildercanada@outlook.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-blue-800">
              <MapPin className="w-6 h-6" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-lg font-semibold">Toronto, Ontario</div>
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-2xl text-blue-700 justify-center md:justify-start">
              <a href="https://www.instagram.com/master_builder_ca/"><Instagram className="w-6 h-6" /></a>
              <a href="https://www.youtube.com/channel/UCIsa4_K-06uI0lYo9j5xAiw"><Youtube className="w-6 h-6" /></a>
            </div>
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center md:text-left">Working Hours</h3>
            <div className="flex flex-col gap-2 text-blue-900">
              <div className="flex justify-between w-full">
                <span>Monday - Friday</span>
                <span>6:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Saturday & Sunday</span>
                <span>6:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
