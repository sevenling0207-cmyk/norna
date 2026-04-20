"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Starfield from "@/components/Starfield";

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold tracking-wide">
            NORNA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#readings" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Readings</a>
            <a href="#how-it-works" className="text-sm text-[#9ca3af] hover:text-white transition-colors">How It Works</a>
            <a href="#about" className="text-sm text-[#9ca3af] hover:text-white transition-colors">About</a>
            <Link href="/reading" className="btn-gold px-5 py-2.5 text-sm font-semibold">
              Get Your Reading
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(10,10,20,0.95)] backdrop-blur-xl border-t border-[rgba(212,168,83,0.08)] px-4 py-6 space-y-4">
          <a href="#readings" className="block text-[#9ca3af] hover:text-white" onClick={() => setMobileOpen(false)}>Readings</a>
          <a href="#how-it-works" className="block text-[#9ca3af] hover:text-white" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#about" className="block text-[#9ca3af] hover:text-white" onClick={() => setMobileOpen(false)}>About</a>
          <Link href="/reading" className="btn-gold block text-center px-5 py-3 text-sm font-semibold" onClick={() => setMobileOpen(false)}>
            Get Your Reading
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ─── Reading Cards Data ─── */
const readings = [
  {
    title: "Three-Card Spread",
    desc: "Past, present, future revealed",
    price: "Free first reading",
    image: "/images/hero_slide_2_1024x1024.jpg",
    slug: "three-card",
    free: true,
  },
  {
    title: "Love Reading",
    desc: "Understand your heart's path",
    price: "$6.99",
    image: "/images/hero_slide_3_1024x1024.jpg",
    slug: "love",
  },
  {
    title: "Daily Horoscope",
    desc: "Your cosmic forecast",
    price: "Free",
    image: "/images/horscope-optimized.webp",
    slug: "daily",
    free: true,
  },
  {
    title: "Celtic Cross",
    desc: "Deep life guidance",
    price: "$9.99",
    image: "/images/hero_slide_4_1024x1024.jpg",
    slug: "celtic-cross",
  },
];

const steps = [
  {
    num: "01",
    title: "Ask Your Question",
    desc: "Focus your mind on what matters most. Type your question or simply let the universe guide you.",
    image: "/images/easy-start1-optimized.webp",
  },
  {
    num: "02",
    title: "Draw Your Cards",
    desc: "Select your cards from the spread. Each card is drawn with intention, channeling ancient Norse energy.",
    image: "/images/easy-start2-optimized.webp",
  },
  {
    num: "03",
    title: "Receive Your Reading",
    desc: "Our AI interprets the cards through the lens of the Norns, delivering personalized wisdom just for you.",
    image: "/images/easy-start3-optimized.webp",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "I was skeptical at first, but my three-card reading was eerily accurate. It helped me see my relationship situation with completely new eyes.",
    stars: 5,
  },
  {
    name: "James K.",
    text: "The Celtic Cross reading gave me incredible clarity about my career path. The Norse mythology angle makes it feel so much more grounded and powerful.",
    stars: 5,
  },
  {
    name: "Luna R.",
    text: "I do a daily reading every morning now. It's become my ritual. The insights are thoughtful and always feel relevant to what I'm going through.",
    stars: 5,
  },
];

/* ─── Stars Rating ─── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#d4a853">
          <path d="M12 2L14.09 8.26L20.18 8.58L15.54 12.42L17.09 18.5L12 15.27L6.91 18.5L8.46 12.42L3.82 8.58L9.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Starfield />
      <Navbar />

      <main className="relative z-10">
        {/* ═══ Hero ═══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero_slide_4_1024x1024.jpg"
            alt="Mystical background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover What the Stars{" "}
              <span className="text-gold-gradient">Hold for You</span>
            </h1>
            <p className="text-[#9ca3af] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered tarot readings guided by ancient Norse wisdom
            </p>
            <Link
              href="/reading"
              className="btn-gold inline-block px-8 py-4 text-base sm:text-lg font-semibold tracking-wide"
            >
              Start Your Free Reading →
            </Link>
            <p className="mt-6 text-[#9ca3af]/70 text-sm">
              ✦ Trusted by 10,000+ seekers worldwide
            </p>
          </div>
        </section>

        {/* ═══ Readings ═══ */}
        <section id="readings" className="py-20 sm:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Explore Our Readings
              </h2>
              <div className="section-divider mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {readings.map((r) => (
                <Link key={r.slug} href={`/reading/${r.slug}`} className="group glass-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
                    {r.free && (
                      <span className="absolute top-3 right-3 bg-[rgba(212,168,83,0.2)] border border-[rgba(212,168,83,0.3)] text-[#f0d48a] text-xs px-2.5 py-1 rounded-full font-medium">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-white mb-1">{r.title}</h3>
                    <p className="text-[#9ca3af] text-sm mb-4">{r.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f0d48a] text-sm font-medium">{r.price}</span>
                      <span className="text-[#9ca3af] text-xs group-hover:text-[#d4a853] transition-colors">
                        Try Now →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ How It Works ═══ */}
        <section id="how-it-works" className="py-20 sm:py-28 px-4 bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                How Norna Works
              </h2>
              <div className="section-divider mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step) => (
                <div key={step.num} className="text-center">
                  <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 rounded-2xl overflow-hidden glass-card">
                    <Image src={step.image} alt={step.title} fill className="object-cover" />
                  </div>
                  <span className="text-gold-gradient font-display text-sm font-bold tracking-widest">{step.num}</span>
                  <h3 className="font-display text-xl font-semibold text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Brand Story ═══ */}
        <section id="about" className="py-20 sm:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  The Wisdom of the{" "}
                  <span className="text-gold-gradient">Norns</span>
                </h2>
                <p className="text-[#9ca3af] leading-relaxed mb-6">
                  In Norse mythology, three powerful beings known as the Norns weave the threads of fate for every
                  living soul. Urd sees your past, Verdandi knows your present, and Skuld glimpses your future.
                </p>
                <p className="text-[#9ca3af] leading-relaxed mb-8">
                  Norna channels this ancient wisdom through modern AI, delivering personalized readings that speak
                  directly to your situation. Each reading draws from centuries of runic tradition, interpreted through
                  the lens of the three fates who sit at the roots of Yggdrasil.
                </p>
                <Link href="/reading" className="btn-gold-outline inline-block px-6 py-3 text-sm font-semibold">
                  Begin Your Journey
                </Link>
              </div>
              <div className="relative aspect-square max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/images/first-aett-creation-freyr-frejya-norse-mythology-in-elder-futhark_300x250_crop_center.jpg"
                  alt="Norse runes"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Testimonials ═══ */}
        <section className="py-20 sm:py-28 px-4 bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                What Our Seekers Say
              </h2>
              <div className="section-divider mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="glass-card p-6 sm:p-8">
                  <Stars count={t.stars} />
                  <p className="text-[#9ca3af] text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
          <Image
            src="/images/cta-background.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a14]/80" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Discover Your Path?
            </h2>
            <p className="text-[#9ca3af] mb-10 text-base sm:text-lg">
              Your first three-card reading is completely free. No sign-up required.
            </p>
            <Link href="/reading" className="btn-gold inline-block px-10 py-4 text-base sm:text-lg font-semibold tracking-wide">
              Start Your Free Reading →
            </Link>
          </div>
        </section>

        {/* ═══ Footer ═══ */}
        <footer className="bg-[#060610] border-t border-[rgba(255,255,255,0.04)] py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="font-display text-white font-semibold mb-4 text-sm">About</h4>
                <ul className="space-y-2.5">
                  <li><a href="#about" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">The Norns</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-white font-semibold mb-4 text-sm">Readings</h4>
                <ul className="space-y-2.5">
                  <li><Link href="/reading/three-card" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Three-Card</Link></li>
                  <li><Link href="/reading/love" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Love Reading</Link></li>
                  <li><Link href="/reading/celtic-cross" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Celtic Cross</Link></li>
                  <li><Link href="/reading/daily" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Daily Horoscope</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-white font-semibold mb-4 text-sm">Resources</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Tarot Guide</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Norse Mythology</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-white font-semibold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-[#9ca3af] text-sm hover:text-white transition-colors">Refund Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#9ca3af]/60 text-xs">
                © 2026 Norna. For entertainment purposes only.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-[#9ca3af]/60 hover:text-[#d4a853] transition-colors" aria-label="Instagram">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#9ca3af]/60 hover:text-[#d4a853] transition-colors" aria-label="Twitter">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#9ca3af]/60 hover:text-[#d4a853] transition-colors" aria-label="TikTok">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V12.5a8.26 8.26 0 005.58 2.16V11.2a4.82 4.82 0 01-3.59-1.53 4.82 4.82 0 01-1.41-2.98z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
