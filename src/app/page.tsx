"use client";
import Image, { type StaticImageData } from "next/image";
import logo from "./logo.png";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";
import pic1 from "./pictures/1.jpg";
import pic2 from "./pictures/2.jpg";
import pic3 from "./pictures/3.jpg";
import pic4 from "./pictures/4.jpg";
import pic5 from "./pictures/5.jpg";
import pic6 from "./pictures/6.jpg";
import pic7 from "./pictures/7.jpg";
import pic8 from "./pictures/8.jpg";
import pic9 from "./pictures/9.jpg";
import pic10 from "./pictures/10.jpg";
import pic11 from "./pictures/11.jpg";

export default function Home() {
  // const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);
  const [estimateName, setEstimateName] = useState("");
  const [estimateEmail, setEstimateEmail] = useState("");
  const [estimateDesc, setEstimateDesc] = useState("");
  const [estimateStatus, setEstimateStatus] = useState<string | null>(null);
  const revealContainerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      {/* Premium Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-200">
              <Image src={logo} alt="The Cedar Touch logo" fill className="object-contain rounded-full" priority />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl tracking-wide text-blue-950">The Cedar Touch</div>
              <div className="text-xs uppercase tracking-[0.2em] text-blue-700/70">Custom Carpentry</div>
            </div>
          </div>
          {/* <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setShowEstimate(true)} className="inline-flex items-center justify-center rounded-full bg-blue-900 px-5 py-2 text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              Get an Estimate
            </button>
          </div> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center overflow-hidden reveal is-visible" data-reveal>
        <Image src="https://i.imgur.com/GdIkuL6.jpeg" alt="Hero" fill className="object-cover z-0" priority />
        <div className="absolute inset-0 hero-overlay z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            The Cedar Touch
          </h1>
          <p className="mt-4 text-base md:text-lg uppercase tracking-[0.35em] text-white/80">Custom Carpentry</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setShowEstimate(true)} className="inline-flex items-center justify-center rounded-full bg-blue-500/90 px-6 py-3 text-white font-semibold shadow-lg hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              Get an Estimate
            </button>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-white font-semibold ring-1 ring-white/30 hover:bg-white/15 transition">
              Contact
            </a>
          </div>
        </div>
      </section>
      {/* Estimate Modal */}
      {showEstimate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="estimate-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowEstimate(false);
          }}
        >
          <div
            className="absolute inset-0 bg-black/50 animate-overlay-in"
            onClick={() => setShowEstimate(false)}
          />
          <div className="relative z-10 w-full max-w-lg px-6">
            <div className="bg-white rounded-2xl elevated p-8 md:p-10 animate-modal-in">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="estimate-title" className="font-display text-2xl md:text-3xl text-blue-950">
                    Get an Estimate
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Share a few details and we’ll get back with a tailored quote.
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setShowEstimate(false)}
                  className="inline-flex h-10 w-14 items-center text-xl justify-center rounded-full text-gray-600  hover:bg-gray-50"
                >
                  x
                </button>
              </div>

              <form onSubmit={handleEstimateSubmit} className="mt-6 grid grid-cols-1 gap-5">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-blue-900">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={estimateName}
                    onChange={(e) => setEstimateName(e.target.value)}
                    placeholder="John Doe"
                    className="h-11 rounded-lg border border-gray-200 bg-white px-4 text-gray-900 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-blue-900">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={estimateEmail}
                    onChange={(e) => setEstimateEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-11 rounded-lg border border-gray-200 bg-white px-4 text-gray-900 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="desc" className="text-sm font-medium text-blue-900">Project details</label>
                  <textarea
                    id="desc"
                    value={estimateDesc}
                    onChange={(e) => setEstimateDesc(e.target.value)}
                    placeholder="Tell us about size, materials, style, and timeline."
                    className="min-h-[120px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowEstimate(false)}
                    className="inline-flex items-center justify-center rounded-full px-5 h-11 text-sm font-semibold text-blue-900 ring-1 ring-blue-200 hover:bg-blue-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 h-11 text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    Send Request
                  </button>
                </div>

                {estimateStatus && (
                  <div className="text-center text-blue-700 text-sm">{estimateStatus}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center" ref={revealContainerRef}>
        <div className="order-2 md:order-1 reveal" data-reveal>
          <h2 className="font-display text-2xl text-blue-950 tracking-wide mb-3">Our Mission</h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-blue-900 to-blue-400 rounded mb-6" />
          <p className="text-gray-700 text-lg leading-relaxed">
            To leave a mark on every project we touch by listening deeply and building with precision. We serve collaborators, customers, suppliers, and partners with solutions that are innovative, enduring, and crafted with passion.
          </p>
        </div>
        <div className="order-1 md:order-2 relative reveal is-visible" data-reveal>
          {/* Prevent peeking slides from overlapping mission copy on small screens */}
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-2 md:hidden bg-gradient-to-r from-[#f5f6fa] via-transparent to-[#f5f6fa]" />
          <PremiumCarousel
            images={[pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11]}
            altTexts={[
              "Finished carpentry project 1",
              "Finished carpentry project 2",
              "Finished carpentry project 3",
              "Finished carpentry project 4",
              "Finished carpentry project 5",
              "Finished carpentry project 6",
              "Finished carpentry project 7",
              "Finished carpentry project 8",
              "Finished carpentry project 9",
              "Finished carpentry project 10",
              "Finished carpentry project 11",
            ]}
          />
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
      <section id="contact" className="bg-[#e9eef6] py-20 flex justify-center">
        <div className="bg-white rounded-3xl elevated p-10 md:p-12 max-w-5xl w-full flex flex-col md:flex-row gap-12 items-start reveal" data-reveal>
          <div className="flex-1 space-y-6 w-full">
            <h2 className="font-display text-3xl md:text-4xl text-blue-950 mb-6 text-center md:text-left">Get in Touch</h2>
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
                <div className="text-lg font-semibold">thecedartouch@outlook.com</div>
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

            {/* Estimate CTA Card */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 text-white ring-1 ring-white/10">
              <h4 className="font-display text-xl">Have a project in mind?</h4>
              <p className="mt-1 text-white/80">Tell us about your vision and we’ll provide a tailored estimate.</p>
              <button onClick={() => setShowEstimate(true)} className="mt-4 inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2 font-semibold ring-1 ring-white/30 hover:bg-white/20 transition">
                Get an Estimate
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type CarouselProps = {
  images: StaticImageData[];
  altTexts: string[];
  intervalMs?: number;
};

function PremiumCarousel({ images, altTexts, intervalMs = 4500 }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const count = images.length;
  const [isSmall, setIsSmall] = useState(true);

  // Determine mobile vs desktop to change layout/animation strategy
  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, isHovering]);

  function goTo(newIndex: number) {
    setIndex((newIndex + count) % count);
  }

  function relPosition(i: number, active: number, len: number) {
    let diff = i - active;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff; // negative = left, positive = right
  }

  return (
    <div
      className={`reveal relative select-none mx-auto ${
        isSmall
          ? "w-[min(92vw,380px)] aspect-[9/16] rounded-xl overflow-hidden"
          : "md:w-full md:h-96 md:aspect-auto md:rounded-2xl md:overflow-visible"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => goTo(index + 1)}
      onContextMenu={(e) => {
        e.preventDefault();
        goTo(index - 1);
      }}
      role="button"
      aria-label="Carousel: click to go next, right-click to go previous"
      data-reveal
    >
      {/* Slides */}
      <div className={`absolute inset-0 ${isSmall ? "overflow-hidden" : "overflow-visible"}`}>
        {images.map((img, i) => {
          if (isSmall) {
            // Crossfade stacked variant for portrait/phone to avoid overlap
            const isActive = i === index;
            const isNeighbor = i === (index + 1) % count || i === (index - 1 + count) % count;
            const z = isActive ? 30 : isNeighbor ? 20 : 10;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0.98})`,
                  transition: "opacity 420ms ease, transform 520ms cubic-bezier(0.22,1,0.36,1)",
                  zIndex: z,
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-black/10 bg-black/5">
                  <Image src={img} alt={altTexts[i] ?? `Slide ${i + 1}`} fill className="object-cover" priority={i === 0} quality={90} sizes="(min-width: 768px) 50vw, 90vw" />
                </div>
              </div>
            );
          } else {
            // Peek neighbors on larger screens
            const pos = relPosition(i, index, count);
            const clamped = Math.max(-2, Math.min(2, pos));
            const slideWidthPct = 44; // larger base width for sharper neighbors
            const offsetPct = clamped * 36; // tighter spacing between slides
            const scale = clamped === 0 ? 1 : clamped === -1 || clamped === 1 ? 0.98 : 0.94;
            const opacity = clamped === 0 ? 1 : clamped === -1 || clamped === 1 ? 0.7 : 0.24;
            const z = clamped === 0 ? 30 : clamped === -1 || clamped === 1 ? 20 : 10;
            const blurClass = ""; // keep neighbors sharp for better perceived quality
            const visibility = Math.abs(pos) > 2 ? "hidden" : "block";
            return (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 ${visibility}`}
                style={{
                  transform: `translateX(-50%) translateY(-50%) translateX(${offsetPct}%) scale(${scale})`,
                  transition: "transform 520ms cubic-bezier(0.22,1,0.36,1), opacity 420ms ease",
                  opacity,
                  zIndex: z,
                  width: `${slideWidthPct}%`,
                  height: "100%",
                }}
              >
                <div className={`relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-black/10 bg-black/5 ${blurClass}`}>
                  <Image src={img} alt={altTexts[i] ?? `Slide ${i + 1}`} fill className="object-cover" priority={i === 0} quality={90} sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 90vw" />
                  {clamped !== 0 && <div className="absolute inset-0 bg-black/20" />}
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Controls overlay at the bottom of the image */}
      <div className="absolute inset-x-0 bottom-2 z-40 px-3 md:px-4 md:hidden" data-no-drag>
        <div className="flex items-center justify-between md:justify-center gap-3">
          <button
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-blue-900 ring-1 ring-black/10 hover:bg-white transition shadow md:hidden"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>

          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-blue-900 ring-1 ring-black/10 hover:bg-white transition shadow md:hidden"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
