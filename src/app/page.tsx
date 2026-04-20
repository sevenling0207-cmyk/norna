"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Starfield from "@/components/Starfield";

/* ─── Data ─── */
const readings = [
  {
    id: "three-card",
    title: "Three-Card Spread",
    subtitle: "Past · Present · Future",
    desc: "The classic reading to illuminate any question. Three cards reveal the threads of time woven around your query.",
    price: "Free",
    href: "/reading/three-card",
    popular: true,
    image: "/images/hero_slide_3_1024x1024.jpg",
  },
  {
    id: "love",
    title: "Love Reading",
    subtitle: "Heart · Partner · Union",
    desc: "Explore the energies that flow between souls. Understand what draws you together and what seeks healing.",
    price: "$2.99",
    href: "/reading/love",
    image: "/images/hero_slide_2_1024x1024.jpg",
  },
  {
    id: "daily",
    title: "Daily Card",
    subtitle: "Today's Guidance",
    desc: "A single card to set your intention for the day. A morning ritual trusted by thousands of seekers.",
    price: "Free",
    href: "/reading/daily",
    image: "/images/horscope-optimized.webp",
  },
  {
    id: "palmistry",
    title: "Palm Reading",
    subtitle: "Lines of Destiny",
    desc: "Upload a photo of your palm and let AI trace the ancient lines that map your fate and fortune.",
    price: "$4.99",
    href: "#",
    soon: true,
    image: "/images/expeert-guidance-optimized.webp",
  },
];

const testimonials = [
  { name: "Aria M.", text: "Norna's reading about my career change was eerily accurate. Three months later, everything unfolded exactly as the cards suggested.", rating: 5, avatar: "/images/Sylvia_720x720.jpg" },
  { name: "James K.", text: "I was skeptical, but the love reading gave me clarity I hadn't found anywhere else. The AI interpretation felt deeply personal.", rating: 5, avatar: "/images/2f1e35ed-af66-4cdb-9476-cc1751dafafd.jpg" },
  { name: "Luna S.", text: "The three-card spread helped me understand a pattern I'd been blind to for years. Truly transformative experience.", rating: 5, avatar: "/images/4ca4ecb8-e85d-42c7-abd6-51822f637106.jpg" },
  { name: "Marcus W.", text: "I do a daily reading every morning now. It's become my meditation ritual. Norna just gets it.", rating: 5, avatar: "/images/90b66218-dea6-422d-a584-01ba5707e630_cr.jpg" },
  { name: "Sophia R.", text: "Beautiful interface, profound insights. This is what modern divination should look like.", rating: 5, avatar: "/images/ee8a9583-0921-42c2-a5fa-ce428fbce24d.jpg" },
  { name: "Daniel T.", text: "The premium reading blew my mind. So specific to my situation — not generic fortune cookie stuff.", rating: 5, avatar: "/images/Sylvia_720x720.jpg" },
];

const steps = [
  { num: "01", title: "Your Questions, Answered", desc: "Focus your mind and ask what weighs on your heart. Our trusted AI readers can help you find love or find your direction.", image: "/images/easy-start1-optimized.webp" },
  { num: "02", title: "Draw Your Cards", desc: "Tap to reveal each card. The ancient symbols from the Norse Norns hold messages meant only for you.", image: "/images/easy-start2-optimized.webp" },
  { num: "03", title: "Get Authentic Answers", desc: "Real guidance you can use — feel energized about your future. Deep, personal, AI-powered interpretations.", image: "/images/easy-start3-optimized.webp" },
];

const faqs = [
  { q: "How does AI tarot work?", a: "Our AI draws from centuries of tarot wisdom and interprets card combinations in the context of your specific question, creating readings that are both traditional and deeply personal." },
  { q: "Are the readings accurate?", a: "Tarot is a tool for reflection and insight, not prediction. Our AI provides thoughtful interpretations that help you see your situation from new perspectives and discover hidden patterns." },
  { q: "What's included in a free reading?", a: "Free readings include a card draw with a concise interpretation. Premium unlocks deep multi-paragraph analysis, card relationship insights, and actionable guidance." },
  { q: "Is my data private?", a: "Absolutely. Your questions and readings are not stored or shared. Each session is ephemeral — your spiritual journey remains yours alone." },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* ═══ Navigation ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--deep)]/80 backdrop-blur-xl border-b border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <Link href="/" className="font-display text-xl tracking-[0.25em] text-[var(--gold)] font-semibold">
            NORNA
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/reading" className="hidden md:block text-xs tracking-[0.2em] uppercase text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors duration-300">
              Readings
            </Link>
            <Link href="#how-it-works" className="hidden md:block text-xs tracking-[0.2em] uppercase text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors duration-300">
              How It Works
            </Link>
            <Link
              href="/reading"
              className="btn-shimmer text-xs tracking-[0.15em] uppercase px-6 py-2.5 bg-[var(--gold)] text-[var(--deep)] rounded-full font-semibold hover:bg-[var(--gold-light)] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ Hero with Background Image ═══ */}
      <section className="relative z-10 min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero_slide_4_1024x1024.jpg"
            alt="Mystical cosmic background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep)]/70 via-[var(--deep)]/50 to-[var(--deep)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep)]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
          <p
            className={`text-[var(--gold)]/60 text-[11px] md:text-xs tracking-[0.5em] uppercase mb-8 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            ✦ Ancient Wisdom, Modern Insight ✦
          </p>

          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-gold-gradient">Discover What</span>
            <br />
            <span className="text-[var(--cream)]">The Stars Reveal</span>
          </h1>

          <p
            className={`text-[var(--cream)]/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            AI-powered tarot readings guided by the wisdom of the Norse Norns.
            Join thousands who trust Norna for clarity and direction.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[600ms] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              href="/reading"
              className="btn-shimmer inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--gold)] text-[var(--deep)] rounded-full text-sm font-semibold tracking-wider hover:bg-[var(--gold-light)] transition-all duration-300 shadow-lg shadow-[var(--gold)]/20"
            >
              Begin Your Reading
            </Link>
            <Link
              href="#readings"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[var(--cream)]/20 text-[var(--cream)]/80 rounded-full text-sm tracking-wider hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-all duration-300 backdrop-blur-sm"
            >
              Explore Readings
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[var(--cream)]/20 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--gold)]/30 to-transparent" />
        </div>
      </section>

      {/* ═══ Readings Section ═══ */}
      <section id="readings" className="relative z-10 px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">Our Offerings</p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--cream)] mb-5">
              Choose Your <span className="text-gold-gradient italic">Reading</span>
            </h2>
            <p className="text-[var(--cream)]/40 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Each spread reveals different facets of your journey. Select the one that calls to your spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {readings.map((r, i) => (
              <Link
                key={r.id}
                href={r.href}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  r.soon ? "opacity-50 pointer-events-none" : "hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--gold)]/10"
                }`}
                style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${200 + i * 100}ms forwards` }}
              >
                {/* Card background image */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/60 to-transparent" />

                  {r.popular && (
                    <span className="absolute top-4 right-4 bg-[var(--gold)] text-[var(--deep)] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full z-10">
                      Popular
                    </span>
                  )}
                  {r.soon && (
                    <span className="absolute top-4 right-4 bg-[var(--purple)]/60 text-[var(--cream)]/80 text-[9px] tracking-wider uppercase px-3 py-1 rounded-full border border-[var(--purple)]/30 z-10">
                      Soon
                    </span>
                  )}

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <p className="text-[var(--gold)]/60 text-[9px] tracking-[0.2em] uppercase mb-1">{r.subtitle}</p>
                    <h3 className="font-display text-lg text-[var(--cream)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-300">
                      {r.title}
                    </h3>
                    <p className="text-[var(--cream)]/40 text-xs leading-relaxed mb-3 line-clamp-2">{r.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold tracking-wider ${r.price === "Free" ? "text-emerald-400/80" : "text-[var(--gold)]"}`}>
                        {r.price}
                      </span>
                      {!r.soon && (
                        <span className="text-[var(--gold)]/40 text-xs group-hover:text-[var(--gold)] transition-colors tracking-wider">
                          Begin →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="how-it-works" className="relative z-10 px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--cream)] mb-5">
              It&apos;s Easy to <span className="text-gold-gradient italic">Get Started</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group text-center"
                style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${200 + i * 150}ms forwards` }}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 mx-auto max-w-[320px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[var(--deep)]/30" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center">
                    <span className="text-[var(--deep)] text-sm font-bold">{step.num}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl text-[var(--cream)] mb-3">{step.title}</h3>
                <p className="text-[var(--cream)]/40 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Expert Guidance CTA ═══ */}
      <section className="relative z-10 px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/images/expeert-guidance-optimized.webp"
              alt="Expert guidance"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep)]/90 via-[var(--deep)]/70 to-[var(--deep)]/40" />
            <div className="relative z-10 p-10 md:p-16 max-w-lg">
              <p className="text-[var(--gold)]/60 text-[11px] tracking-[0.4em] uppercase mb-4">Expert Guidance</p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)] mb-5 leading-tight">
                Ancient Wisdom,<br />
                <span className="text-gold-gradient italic">Made Modern</span>
              </h2>
              <p className="text-[var(--cream)]/50 text-sm md:text-base leading-relaxed mb-8">
                Discover why thousands trust Norna for guidance. Get answers to your questions with AI-powered tarot, rune readings, and cosmic insights. Our mission is to help you see how your stars are aligned.
              </p>
              <Link
                href="/reading"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-3.5 bg-[var(--gold)] text-[var(--deep)] rounded-full text-sm font-semibold tracking-wider hover:bg-[var(--gold-light)] transition-all duration-300"
              >
                Start Reading →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="relative z-10 py-24 md:py-32 overflow-hidden">
        <div className="text-center mb-14 px-6">
          <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl text-[var(--cream)] mb-5">
            Trusted by <span className="text-gold-gradient italic">Happy Clients</span>
          </h2>
          <p className="text-[var(--cream)]/40 text-sm max-w-md mx-auto">
            Your path is unique — Norna empowers you with cosmic guidance and transformative insights.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--deep)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--deep)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[340px] md:w-[400px] mx-3 rounded-2xl border border-[var(--gold)]/[0.08] bg-[var(--deep-mid)]/50 backdrop-blur-sm p-7">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-[var(--gold)]">
                      <path d="M7 0l1.75 5.25H14l-4.375 3.15L11.375 14 7 10.85 2.625 14l1.75-5.6L0 5.25h5.25z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--cream)]/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--gold)]/20">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="text-[var(--gold)]/70 text-sm font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Horoscope / Norse Mythology Section ═══ */}
      <section className="relative z-10 px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">Norse Mythology</p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)] mb-5 leading-tight">
                The Norns Guide<br />
                <span className="text-gold-gradient italic">Your Destiny</span>
              </h2>
              <p className="text-[var(--cream)]/50 text-sm md:text-base leading-relaxed mb-6">
                In Norse mythology, the three Norns — Urd (Past), Verdandi (Present), and Skuld (Future) — sit at the base of Yggdrasil, the World Tree, weaving the threads of fate for all beings. Our AI channels their ancient wisdom to bring you readings of profound depth and insight.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Urd", domain: "What Was", image: "/images/first-aett-creation-freyr-frejya-norse-mythology-in-elder-futhark_300x250_crop_center.jpg" },
                  { name: "Verdandi", domain: "What Is", image: "/images/second-aett-transformation-heimdall-mordgrud-norse-mythology-in-elder-futhark_300x250_crop_center.jpg" },
                  { name: "Skuld", domain: "What Shall Be", image: "/images/third-aett-evolution-tyr-zisa-norse-mythology-in-elder-futhark_300x250_crop_center.jpg" },
                ].map((norn) => (
                  <div key={norn.name} className="relative rounded-xl overflow-hidden aspect-square group">
                    <Image src={norn.image} alt={norn.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="150px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 z-10">
                      <p className="font-display text-sm text-[var(--gold)]">{norn.name}</p>
                      <p className="text-[var(--cream)]/40 text-[9px] tracking-wider">{norn.domain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] hidden md:block">
              <Image
                src="/images/horscope-optimized.webp"
                alt="Horoscope and cosmic guidance"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-transparent to-[var(--deep)]/30" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <p className="font-display text-2xl text-[var(--cream)] mb-2">Free Daily Guidance</p>
                <p className="text-[var(--cream)]/50 text-sm mb-4">Join thousands who start their morning with Norna.</p>
                <Link
                  href="/reading/daily"
                  className="inline-flex items-center gap-2 text-[var(--gold)] text-sm font-medium hover:text-[var(--gold-light)] transition-colors"
                >
                  Draw Today&apos;s Card →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative z-10 px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--gold)]/50 text-[11px] tracking-[0.4em] uppercase mb-4">Questions</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)]">
              Frequently <span className="text-gold-gradient italic">Asked</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--gold)]/[0.08] overflow-hidden transition-colors duration-300 hover:border-[var(--gold)]/20 bg-[var(--deep-mid)]/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display text-sm md:text-base text-[var(--cream)]/90">{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`text-[var(--gold)]/50 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-[var(--cream)]/40 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden">
          <Image
            src="/images/cta-background.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--deep)]/80" />
          <div className="relative z-10 text-center py-16 md:py-24 px-8">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--cream)] mb-4">
              Your destiny is one card away
            </h2>
            <p className="text-[var(--cream)]/40 text-sm md:text-base mb-10 max-w-md mx-auto">
              Join thousands who trust the Norns for guidance. Start your free reading now and discover what the stars have aligned for you.
            </p>
            <Link
              href="/reading"
              className="btn-shimmer inline-flex items-center gap-3 px-12 py-4 bg-[var(--gold)] text-[var(--deep)] rounded-full text-sm font-semibold tracking-wider hover:bg-[var(--gold-light)] transition-all duration-300 shadow-lg shadow-[var(--gold)]/20"
            >
              Start Free Reading →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative z-10 border-t border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <p className="font-display text-lg tracking-[0.25em] text-[var(--gold)] mb-4">NORNA</p>
              <p className="text-[var(--cream)]/30 text-sm leading-relaxed max-w-sm">
                AI-powered tarot readings guided by the wisdom of the Norse Norns. Ancient symbols, modern insight. Our mission is to help you see how your stars are aligned.
              </p>
            </div>
            <div>
              <p className="text-[var(--cream)]/50 text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold">Readings</p>
              <div className="space-y-3">
                <Link href="/reading/three-card" className="block text-[var(--cream)]/30 text-sm hover:text-[var(--gold)] transition-colors">Three-Card Spread</Link>
                <Link href="/reading/love" className="block text-[var(--cream)]/30 text-sm hover:text-[var(--gold)] transition-colors">Love Reading</Link>
                <Link href="/reading/daily" className="block text-[var(--cream)]/30 text-sm hover:text-[var(--gold)] transition-colors">Daily Card</Link>
              </div>
            </div>
            <div>
              <p className="text-[var(--cream)]/50 text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold">Company</p>
              <div className="space-y-3">
                <span className="block text-[var(--cream)]/30 text-sm cursor-pointer hover:text-[var(--gold)] transition-colors">Privacy Policy</span>
                <span className="block text-[var(--cream)]/30 text-sm cursor-pointer hover:text-[var(--gold)] transition-colors">Terms of Service</span>
                <span className="block text-[var(--cream)]/30 text-sm cursor-pointer hover:text-[var(--gold)] transition-colors">Contact</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--gold)]/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--cream)]/20 text-xs tracking-wider">
              © 2024 Norna. For entertainment purposes. The stars guide, but you decide.
            </p>
            <p className="text-[var(--cream)]/15 text-xs">
              Never miss a retrograde ✦
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
