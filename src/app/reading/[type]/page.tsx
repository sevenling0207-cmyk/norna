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
    subtitle: "The threads of time converge for your answer",
    count: 3,
    labels: ["Past", "Present", "Future"],
  },
  love: {
    title: "Love Reading",
    subtitle: "Let the cards illuminate the bonds between hearts",
    count: 3,
    labels: ["You", "Partner", "Connection"],
  },
  daily: {
    title: "Daily Horoscope",
    subtitle: "One card to set the tone for your day",
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
    const text = `✦ My Norna Reading ✦\n\n${cards.map((c, i) => `${config.labels[i]}: ${c.card.emoji} ${c.card.name}${c.reversed ? " (Reversed)" : ""}`).join("\n")}\n\nGet your reading at norna.app`;
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
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/" className="font-display text-xl tracking-[0.2em] text-mystic-gold">
          NORNA
        </Link>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="pt-4 md:pt-8 pb-8">
          <Link
            href="/reading"
            className="inline-flex items-center gap-2 text-mystic-star/40 text-sm hover:text-mystic-gold transition-colors duration-300 mb-6"
          >
            <span>←</span>
            <span>Back to Readings</span>
          </Link>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-gold-gradient mb-2">
            {config.title}
          </h1>
          <p className="text-mystic-star/40 text-sm">{config.subtitle}</p>
        </div>

        {/* ─── Phase 1: Ask ─── */}
        {phase === "ask" && (
          <div className="animate-fade-in space-y-8">
            {type !== "daily" ? (
              <div className="space-y-3">
                <label className="block font-display text-mystic-star/60 text-sm">
                  What question is on your mind?
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Focus your intention here..."
                  className="w-full glass rounded-2xl p-5 text-mystic-star text-sm leading-relaxed
                             placeholder:text-mystic-star/20 focus:border-mystic-gold/40 focus:outline-none 
                             focus:ring-1 focus:ring-mystic-gold/20 resize-none h-32 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">🌅</div>
                <p className="text-mystic-star/60 text-sm leading-relaxed">
                  Clear your mind. Take a deep breath.<br />
                  When you&apos;re ready, draw your card.
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!question.trim() && type !== "daily"}
              className="btn-shimmer w-full py-4 md:py-5 bg-mystic-gold/10 border border-mystic-gold/60 text-mystic-gold 
                         rounded-2xl text-base md:text-lg font-display tracking-wider
                         hover:bg-mystic-gold hover:text-mystic-deep
                         disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-mystic-gold/10 disabled:hover:text-mystic-gold
                         transition-all duration-500"
            >
              Draw {config.count === 1 ? "Your Card" : "Your Cards"} ✦
            </button>
          </div>
        )}

        {/* ─── Phase 2: Cards ─── */}
        {phase === "cards" && (
          <div className="animate-fade-in">
            <p className="text-center text-mystic-star/40 text-sm mb-8 tracking-wider">
              Tap each card to reveal its message
            </p>

            <div className={`flex justify-center gap-4 md:gap-6 ${config.count === 1 ? "" : "flex-wrap"}`}>
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-mystic-gold/50 text-[10px] md:text-xs mb-3 tracking-[0.2em] uppercase font-display">
                    {config.labels[i]}
                  </p>
                  <TarotCard card={card} flipped={flipped[i]} onClick={() => flipCard(i)} />
                </div>
              ))}
            </div>

            {flipped.every(Boolean) && loading && (
              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4">
                  <div className="w-2 h-2 bg-mystic-gold rounded-full animate-pulse" />
                  <p className="text-mystic-gold font-display text-sm tracking-wider">
                    The Norns are reading your fate...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Phase 3: Reading ─── */}
        {phase === "reading" && readingData && (
          <div className="space-y-6" style={{ animation: "slideUp 0.6s ease-out forwards" }}>
            {/* Card summary row */}
            <div className="flex justify-center gap-4 mb-8">
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-mystic-gold/40 text-[9px] tracking-[0.15em] uppercase mb-2 font-display">
                    {config.labels[i]}
                  </p>
                  <div className="w-16 h-24 md:w-20 md:h-28 glass rounded-xl flex flex-col items-center justify-center border-mystic-gold/20">
                    <span className="text-2xl md:text-3xl mb-1">{card.card.emoji || "✦"}</span>
                    <p className="text-mystic-star/70 text-[8px] md:text-[9px] leading-tight px-1 font-display">
                      {card.card.name}
                    </p>
                    {card.reversed && (
                      <p className="text-mystic-gold/40 text-[7px] mt-0.5">Reversed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Free Reading */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="ornament-divider text-mystic-gold/50 text-xs tracking-[0.2em] mb-6">
                ✦ Your Reading ✦
              </div>
              <div className="text-mystic-star/70 leading-relaxed text-sm md:text-base space-y-4">
                <p>{readingData.free}</p>
              </div>
            </div>

            {/* Premium Locked */}
            <div className="relative glass rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="ornament-divider text-mystic-gold/50 text-xs tracking-[0.2em] mb-6">
                ✦ Deep Insight ✦
              </div>
              <div className="text-mystic-star/70 leading-relaxed text-sm space-y-4 blur-[6px] select-none pointer-events-none">
                {readingData.premium
                  .split("\n\n")
                  .slice(0, 4)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-mystic-deep via-mystic-deep/60 to-transparent pointer-events-none" />

              {/* Unlock prompt */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-mystic-gold/30 flex items-center justify-center mb-3">
                  <span className="text-mystic-gold">🔮</span>
                </div>
                <p className="text-mystic-star/50 text-xs mb-4 tracking-wider">
                  The full revelation awaits...
                </p>
              </div>
            </div>

            {/* Unlock button */}
            <button
              className="btn-shimmer w-full py-4 md:py-5 bg-mystic-gold text-mystic-deep 
                         rounded-2xl text-base md:text-lg font-display font-semibold tracking-wider
                         hover:bg-mystic-gold-light transition-all duration-300
                         shadow-lg shadow-mystic-gold/20"
            >
              Unlock Full Reading — $2.99 ✦
            </button>

            {/* Share + New Reading */}
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 py-3 glass rounded-2xl text-mystic-star/40 hover:text-mystic-gold hover:border-mystic-gold/30 
                           text-sm transition-all duration-300 tracking-wider"
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
                className="flex-1 py-3 glass rounded-2xl text-mystic-star/40 hover:text-mystic-gold hover:border-mystic-gold/30 
                           text-sm transition-all duration-300 tracking-wider"
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
