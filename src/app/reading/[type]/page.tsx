"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Starfield from "@/components/Starfield";
import TarotCard from "@/components/TarotCard";
import { drawCards } from "@/lib/tarot";
import type { DrawnCard } from "@/lib/tarot";

const spreadConfig: Record<string, { title: string; count: number; labels: string[] }> = {
  "three-card": { title: "Three Card Spread", count: 3, labels: ["Past", "Present", "Future"] },
  love: { title: "Love Reading", count: 3, labels: ["You", "Partner", "Connection"] },
  daily: { title: "Daily Fortune", count: 1, labels: ["Today"] },
};

interface ReadingResult {
  cards: { id: number; name: string; emoji: string; reversed: boolean; position: string; keywords: string[]; meaning: string }[];
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
        free: "The cosmic connection wavered for a moment. The cards have been drawn, but the fates ask you to try again.",
        premium: "",
      });
    }
    setLoading(false);
    setPhase("reading");
  };

  return (
    <main className="relative min-h-screen px-6 py-16">
      <Starfield />
      <div className="relative z-10 max-w-lg mx-auto">
        <Link href="/reading" className="text-mystic-gold/60 text-sm hover:text-mystic-gold transition-colors">
          ← Back
        </Link>

        <h1 className="text-2xl md:text-3xl font-serif text-mystic-gold mt-6 mb-8">{config.title}</h1>

        {/* Phase 1: Ask */}
        {phase === "ask" && (
          <div className="animate-fade-in space-y-6">
            <p className="text-mystic-star/60">
              {type === "daily" ? "Clear your mind and draw your card." : "Focus on your question..."}
            </p>
            {type !== "daily" && (
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-mystic-purple/50 border border-mystic-gold/20 rounded-xl p-4 text-mystic-star 
                           placeholder:text-mystic-star/30 focus:border-mystic-gold/60 focus:outline-none resize-none h-28"
              />
            )}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-mystic-gold/20 border border-mystic-gold text-mystic-gold 
                         rounded-full text-lg hover:bg-mystic-gold hover:text-mystic-deep transition-all duration-500"
            >
              Draw {config.count === 1 ? "Your Card" : "Your Cards"} ✦
            </button>
          </div>
        )}

        {/* Phase 2: Cards */}
        {phase === "cards" && (
          <div className="animate-fade-in">
            <p className="text-mystic-star/60 text-center mb-8">Tap each card to reveal</p>
            <div className={`flex justify-center gap-4 ${config.count === 1 ? "" : "flex-wrap"}`}>
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-mystic-gold/60 text-xs mb-2 tracking-widest uppercase">{config.labels[i]}</p>
                  <TarotCard card={card} flipped={flipped[i]} onClick={() => flipCard(i)} />
                </div>
              ))}
            </div>
            {flipped.every(Boolean) && loading && (
              <div className="text-center mt-8 animate-pulse">
                <p className="text-mystic-gold font-serif text-lg">✦ The Norns are reading your fate... ✦</p>
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Reading */}
        {phase === "reading" && readingData && (
          <div className="animate-slide-up space-y-6">
            {/* Cards summary */}
            <div className="flex justify-center gap-3 mb-6">
              {cards.map((card, i) => (
                <div key={i} className="text-center">
                  <p className="text-mystic-gold/60 text-[10px] mb-1 uppercase">{config.labels[i]}</p>
                  <div className="w-16 h-24 bg-mystic-purple rounded-lg border border-mystic-gold/30 flex items-center justify-center text-2xl">
                    {card.card.emoji || "✦"}
                  </div>
                  <p className="text-mystic-star text-[10px] mt-1 max-w-[70px] leading-tight">{card.card.name}</p>
                  {card.reversed && <p className="text-mystic-gold/40 text-[9px]">Reversed</p>}
                </div>
              ))}
            </div>

            {/* Free reading */}
            <div className="bg-mystic-purple/30 border border-mystic-gold/10 rounded-2xl p-6">
              <h2 className="text-mystic-gold font-serif text-lg mb-4">✦ Your Reading</h2>
              <div className="text-mystic-star/80 leading-relaxed space-y-3 text-sm">
                <p>{readingData.free}</p>
              </div>
            </div>

            {/* Locked premium section */}
            <div className="relative bg-mystic-purple/30 border border-mystic-gold/10 rounded-2xl p-6 overflow-hidden">
              <h2 className="text-mystic-gold font-serif text-lg mb-4">✦ Deep Insight</h2>
              <div className="text-mystic-star/80 leading-relaxed space-y-3 text-sm blur-[6px] select-none pointer-events-none">
                {readingData.premium.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-mystic-deep/90 via-mystic-deep/40 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="text-center">
                  <p className="text-mystic-gold/80 text-xs mb-3">The full reading awaits...</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-mystic-gold border-0 text-mystic-deep rounded-full text-lg font-semibold 
                               hover:bg-mystic-gold-light transition-all duration-300 shadow-lg shadow-mystic-gold/20">
              Unlock Full Reading — $2.99 ✦
            </button>

            <button
              onClick={() => {
                setPhase("ask");
                setQuestion("");
                setCards([]);
                setReadingData(null);
              }}
              className="w-full py-3 text-mystic-gold/60 hover:text-mystic-gold text-sm transition-colors"
            >
              Start New Reading
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
