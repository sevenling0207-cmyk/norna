"use client";
import type { DrawnCard } from "@/lib/tarot";

interface Props {
  card: DrawnCard;
  flipped: boolean;
  onClick: () => void;
}

export default function TarotCard({ card, flipped, onClick }: Props) {
  return (
    <div className="card-container w-28 h-44 md:w-32 md:h-48 cursor-pointer" onClick={!flipped ? onClick : undefined}>
      <div className={`card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
        {/* Back (face down) */}
        <div className="card-front bg-gradient-to-br from-mystic-purple to-mystic-deep border-2 border-mystic-gold/40 
                        flex items-center justify-center">
          <div className="text-mystic-gold/60 text-4xl">✦</div>
          <div className="absolute inset-2 border border-mystic-gold/20 rounded-lg" />
        </div>

        {/* Front (face up) */}
        <div className={`card-back bg-gradient-to-br from-mystic-deep via-mystic-purple to-mystic-deep 
                        border-2 border-mystic-gold/60 flex flex-col items-center justify-center p-3 text-center
                        ${card.reversed ? "rotate-180" : ""}`}>
          <span className="text-3xl mb-2">{card.card.emoji || "✦"}</span>
          <p className="text-mystic-gold text-xs font-serif leading-tight">{card.card.name}</p>
          <p className="text-mystic-star/40 text-[9px] mt-1">{card.card.keywords[0]}</p>
        </div>
      </div>
    </div>
  );
}
