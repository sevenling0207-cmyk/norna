"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
    title: "Daily Horoscope",
    subtitle: "Today's guidance awaits",
    count: 1,
    labels: ["Today"],
  },
  "celtic-cross": {
    title: "Celtic Cross",
    subtitle: "A comprehensive life reading",
    count: 6,
    labels: ["Present", "Challenge", "Foundation", "Past", "Crown", "Future"],
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
    <>
      <Starfield />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,20,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <Link href="/" className="font-display text-2xl text-gold-gradient font-bold">NORNA</Link>
          <Link href="/reading" className="text-[#9ca3af] text-sm hover:text-white transition-colors">← Back</Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pb-24 pt-24 sm:pt-28">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{config.title}</h1>
          <p className="text-[#9ca3af] text-sm tracking-wide">{config.subtitle}</p>
          <div className="section-divider mt-4" />
        </div>

        {/* ─── Ask Phase ─── */}
        {phase === "ask" && (
          <div className="space-y-6 animate-fade-in-up">
            {type !== "daily" ? (
              <div className="space-y-3">
                <label className="block text-[#9ca3af] text-xs tracking-wider uppercase font-display">
                  What question weighs on your mind?
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Focus your intention here..."
                  className="w-full rounded-xl p-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(212,168,83,0.1)]
                             text-white text-sm leading-relaxed placeholder:text-[#9ca3af]/30
                             focus:border-[rgba(212,168,83,0.3)] focus:outline-none focus:ring-1 focus:ring-[rgba(212,168,83,0.15)]
                             resize-none h-32 transition-all duration-300"
                />
                <p className="text-[#9ca3af]/50 text-xs">The more specific your question, the deeper the insight.</p>
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border border-[rgba(212,168,83,0.15)] flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#d4a853]/60">
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  Clear your mind. Take a deep breath.<br />
                  When you&apos;re ready, draw your card.
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!question.trim() && type !== "daily"}
              className="btn-gold w-full py-4 text-sm font-semibold tracking-wider
                         disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Draw {config.count === 1 ? "Your Card" : "Your Cards"}
            </button>
          </div>
        )}

        {/* ─── Cards Phase ─── */}
        {phase === "cards" && (
          <div>
            <p className="text-center text-[#9ca3af]/60 text-xs mb-10 tracking-wider">
              Tap each card to reveal its message
            </p>

            <div className={`flex justify-center gap-4 sm:gap-6 flex-wrap`}>
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="text-center"
                  style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${i * 150}ms forwards` }}
                >
                  <p className="text-[#d4a853]/50 text-[10px] mb-3 tracking-widest uppercase font-display">
                    {config.labels[i]}
                  </p>
                  <TarotCard
                    isFlipped={flipped[i]}
                    onClick={() => flipCard(i)}
                    size={config.count <= 3 ? "lg" : "md"}
                    frontContent={
                      <div className="text-center px-2">
                        <p className="font-display text-white text-xs sm:text-sm leading-tight mb-1">{card.card.name}</p>
                        {card.reversed && <p className="text-[#d4a853]/50 text-[10px]">Reversed</p>}
                      </div>
                    }
                  />
                </div>
              ))}
            </div>

            {flipped.every(Boolean) && loading && (
              <div className="text-center mt-14">
                <div className="inline-flex items-center gap-3 glass-card px-8 py-4">
                  <div className="w-2 h-2 bg-[#d4a853]/60 rounded-full animate-pulse" />
                  <p className="text-[#d4a853]/70 font-display text-xs tracking-wider">
                    The Norns are weaving your fate...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Reading Phase ─── */}
        {phase === "reading" && readingData && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Card summary */}
            <div className="flex justify-center gap-4 mb-10 flex-wrap">
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-[#d4a853]/40 text-[9px] tracking-widest uppercase mb-2 font-display">
                    {config.labels[i]}
                  </p>
                  <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg border border-[rgba(212,168,83,0.12)] bg-[rgba(255,255,255,0.02)] flex flex-col items-center justify-center">
                    <p className="text-white/70 text-[8px] sm:text-[9px] leading-tight px-1 font-display text-center">
                      {card.card.name}
                    </p>
                    {card.reversed && <p className="text-[#d4a853]/40 text-[7px] mt-1">Reversed</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Free reading */}
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(212,168,83,0.15)]" />
                <span className="text-[#d4a853]/50 text-[10px] tracking-widest uppercase font-display">Your Reading</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(212,168,83,0.15)]" />
              </div>
              <div className="text-[#9ca3af] leading-relaxed text-sm space-y-4">
                {readingData.free.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Premium locked */}
            <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(212,168,83,0.15)]" />
                <span className="text-[#d4a853]/50 text-[10px] tracking-widest uppercase font-display">Deep Insight</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(212,168,83,0.15)]" />
              </div>

              <div className="paywall-blur text-[#9ca3af] leading-relaxed text-sm space-y-4">
                {(readingData.premium || "The deeper threads of your reading reveal hidden patterns and connections that transform understanding into actionable wisdom. Each card speaks not only of its position but of its relationship to every other card in the spread.").split("\n\n").slice(0, 3).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#d4a853]/50 mb-2">
                  <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 9V6a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <p className="text-[#9ca3af]/40 text-xs tracking-wider">The full revelation awaits</p>
              </div>
            </div>

            <button className="btn-gold w-full py-4 text-sm font-semibold tracking-wider">
              Unlock Full Reading — $2.99
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-full border border-[rgba(212,168,83,0.1)] text-[#9ca3af]/60 hover:text-[#d4a853] hover:border-[rgba(212,168,83,0.25)] text-xs tracking-wider transition-all"
              >
                Share ↗
              </button>
              <button
                onClick={() => { setPhase("ask"); setQuestion(""); setCards([]); setReadingData(null); }}
                className="flex-1 py-3 rounded-full border border-[rgba(212,168,83,0.1)] text-[#9ca3af]/60 hover:text-[#d4a853] hover:border-[rgba(212,168,83,0.25)] text-xs tracking-wider transition-all"
              >
                New Reading
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
