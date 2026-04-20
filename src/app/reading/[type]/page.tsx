"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Starfield from "@/components/Starfield";
import TarotCard from "@/components/TarotCard";
import { drawCards } from "@/lib/tarot";
import type { DrawnCard } from "@/lib/tarot";

const spreadConfig: Record<string, { title: string; subtitle: string; count: number; labels: string[] }> = {
  "three-card": {
    title: "Three-Card Spread",
    subtitle: "Past · Present · Future",
    count: 3,
    labels: ["Past", "Present", "Future"],
  },
  love: {
    title: "Love Reading",
    subtitle: "Heart · Partner · Union",
    count: 3,
    labels: ["You", "Partner", "Connection"],
  },
  daily: {
    title: "Daily Card",
    subtitle: "Today's guidance awaits",
    count: 1,
    labels: ["Today"],
  },
};

interface ReadingResult {
  cards: {
    id: number;
    name: string;
    emoji: string;
    reversed: boolean;
    position: string;
    keywords: string[];
    meaning: string;
  }[];
  free: string;
  premium: string;
}

export default function ReadingPage() {
  const params = useParams();
  const type = params.type as string;
  const config = spreadConfig[type] || spreadConfig["three-card"];

  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState<"ask" | "cards" | "reading">("ask");
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [readingData, setReadingData] = useState<ReadingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!question.trim() && type !== "daily") return;
    const drawn = drawCards(config.count);
    setCards(drawn);
    setFlipped(new Array(config.count).fill(false));
    setPhase("cards");
  };

  const flipCard = (i: number) => {
    if (flipped[i]) return;
    const next = [...flipped];
    next[i] = true;
    setFlipped(next);
    if (next.every(Boolean)) {
      setTimeout(() => fetchReading(), 800);
    }
  };

  const fetchReading = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, type }),
      });
      const data: ReadingResult = await res.json();
      setReadingData(data);
    } catch {
      setReadingData({
        cards: [],
        free: "The cosmic connection wavered. The cards have been drawn, but the fates ask you to try again.",
        premium: "",
      });
    }
    setLoading(false);
    setPhase("reading");
  };

  const handleShare = async () => {
    const text = `✦ My Norna Reading ✦\n\n${cards.map((c, i) => `${config.labels[i]}: ${c.card.name}${c.reversed ? " (Reversed)" : ""}`).join("\n")}\n\nGet your reading at norna.app`;
    if (navigator.share) {
      await navigator.share({ title: "My Norna Reading", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <main className="relative min-h-screen">
      <Starfield />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--deep)]/80 backdrop-blur-xl border-b border-[var(--gold)]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <Link href="/" className="font-display text-xl tracking-[0.25em] text-[var(--gold)] font-semibold">
            NORNA
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-24 pt-24 md:pt-28">
        {/* Header */}
        <div className="pb-8">
          <Link
            href="/reading"
            className="inline-flex items-center gap-2 text-[var(--cream)]/30 text-xs tracking-wider hover:text-[var(--gold)] transition-colors duration-300 mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Back
          </Link>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-gold-gradient mb-2">
            {config.title}
          </h1>
          <p className="text-[var(--cream)]/30 text-xs tracking-[0.15em]">{config.subtitle}</p>
        </div>

        {/* ─── Phase: Ask ─── */}
        {phase === "ask" && (
          <div className="animate-fade-in space-y-6">
            {type !== "daily" ? (
              <div className="space-y-3">
                <label className="block text-[var(--cream)]/50 text-xs tracking-[0.1em] uppercase font-display">
                  What question weighs on your mind?
                </label>
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src="/images/hero_slide_4_1024x1024.jpg"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Focus your intention here..."
                    className="relative z-10 w-full rounded-xl p-5 bg-[var(--deep)]/70 border border-[var(--gold)]/[0.1] text-[var(--cream)] text-sm leading-relaxed
                               placeholder:text-[var(--cream)]/20 focus:border-[var(--gold)]/30 focus:outline-none
                               resize-none h-32 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <p className="text-[var(--cream)]/20 text-[10px]">The more specific your question, the deeper the insight.</p>
              </div>
            ) : (
              <div className="relative rounded-xl border border-[var(--gold)]/[0.08] overflow-hidden p-8 text-center">
                <div className="absolute inset-0 opacity-15">
                  <Image
                    src="/images/horscope-optimized.webp"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full border border-[var(--gold)]/20 flex items-center justify-center mb-5 bg-[var(--deep)]/50">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--gold)]/60">
                      <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1" />
                      <path d="M10 1v4M10 15v4M1 10h4M15 10h4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <p className="text-[var(--cream)]/50 text-sm leading-relaxed">
                    Clear your mind. Take a deep breath.<br />
                    When you&apos;re ready, draw your card.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!question.trim() && type !== "daily"}
              className="btn-shimmer w-full py-4 bg-[var(--gold)] text-[var(--deep)]
                         rounded-xl text-sm font-semibold tracking-[0.15em]
                         hover:bg-[var(--gold-light)]
                         disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[var(--gold)]
                         transition-all duration-500"
            >
              Draw {config.count === 1 ? "Your Card" : "Your Cards"}
            </button>
          </div>
        )}

        {/* ─── Phase: Cards ─── */}
        {phase === "cards" && (
          <div className="animate-fade-in">
            <p className="text-center text-[var(--cream)]/30 text-xs mb-10 tracking-[0.15em]">
              Tap each card to reveal its message
            </p>

            <div className={`flex justify-center gap-5 md:gap-8 ${config.count === 1 ? "" : "flex-wrap"}`}>
              {cards.map((card, i) => (
                <div key={i} className="text-center" style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${i * 150}ms forwards` }}>
                  <p className="text-[var(--gold)]/40 text-[10px] mb-3 tracking-[0.25em] uppercase font-display">
                    {config.labels[i]}
                  </p>
                  <TarotCard card={card} flipped={flipped[i]} onClick={() => flipCard(i)} />
                </div>
              ))}
            </div>

            {flipped.every(Boolean) && loading && (
              <div className="text-center mt-14">
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/[0.1] px-8 py-4 bg-[var(--deep-mid)]/50 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[var(--gold)]/60 rounded-full animate-pulse" />
                  <p className="text-[var(--gold)]/70 font-display text-xs tracking-[0.15em]">
                    The Norns are weaving your fate...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Phase: Reading ─── */}
        {phase === "reading" && readingData && (
          <div className="space-y-6 animate-slide-up">
            {/* Card summary */}
            <div className="flex justify-center gap-5 mb-10">
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-[var(--gold)]/35 text-[9px] tracking-[0.2em] uppercase mb-2 font-display">
                    {config.labels[i]}
                  </p>
                  <div className="w-16 h-24 md:w-20 md:h-28 rounded-lg border border-[var(--gold)]/15 bg-[var(--deep-mid)]/50 flex flex-col items-center justify-center backdrop-blur-sm">
                    <p className="text-[var(--cream)]/70 text-[8px] md:text-[9px] leading-tight px-1 font-display text-center">
                      {card.card.name}
                    </p>
                    {card.reversed && (
                      <p className="text-[var(--gold)]/40 text-[7px] mt-1">Reversed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Free Reading */}
            <div className="rounded-xl border border-[var(--gold)]/[0.08] p-6 md:p-8 bg-[var(--deep-mid)]/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--gold)]/20" />
                <span className="text-[var(--gold)]/50 text-[10px] tracking-[0.25em] uppercase font-display">Your Reading</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--gold)]/20" />
              </div>
              <div className="text-[var(--cream)]/60 leading-relaxed text-sm space-y-4">
                <p>{readingData.free}</p>
              </div>
            </div>

            {/* Premium Locked */}
            <div className="relative rounded-xl border border-[var(--gold)]/[0.08] p-6 md:p-8 overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--gold)]/20" />
                <span className="text-[var(--gold)]/50 text-[10px] tracking-[0.25em] uppercase font-display">Deep Insight</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--gold)]/20" />
              </div>

              <div className="text-[var(--cream)]/50 leading-relaxed text-sm space-y-4 blur-[6px] select-none pointer-events-none">
                {readingData.premium.split("\n\n").slice(0, 4).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/70 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)]/25 flex items-center justify-center mb-3 bg-[var(--deep)]/50">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--gold)]/60">
                    <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M5 7V5a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <p className="text-[var(--cream)]/35 text-[10px] tracking-[0.15em]">
                  The full revelation awaits
                </p>
              </div>
            </div>

            <button
              className="btn-shimmer w-full py-4 bg-[var(--gold)] text-[var(--deep)]
                         rounded-xl text-sm font-semibold tracking-[0.1em]
                         hover:bg-[var(--gold-light)] transition-all duration-300
                         shadow-lg shadow-[var(--gold)]/15"
            >
              Unlock Full Reading — $2.99
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-xl border border-[var(--gold)]/[0.08] text-[var(--cream)]/40 hover:text-[var(--gold)] hover:border-[var(--gold)]/25
                           text-xs tracking-wider transition-all duration-300"
              >
                Share ↗
              </button>
              <button
                onClick={() => {
                  setPhase("ask");
                  setQuestion("");
                  setCards([]);
                  setReadingData(null);
                }}
                className="flex-1 py-3 rounded-xl border border-[var(--gold)]/[0.08] text-[var(--cream)]/40 hover:text-[var(--gold)] hover:border-[var(--gold)]/25
                           text-xs tracking-wider transition-all duration-300"
              >
                New Reading
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
