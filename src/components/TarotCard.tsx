"use client";
import type { DrawnCard } from "@/lib/tarot";

interface Props {
  card: DrawnCard;
  flipped: boolean;
  onClick: () => void;
}

export default function TarotCard({ card, flipped, onClick }: Props) {
  return (
    <div
      className="card-container w-[120px] h-[190px] md:w-[140px] md:h-[220px] cursor-pointer select-none"
      onClick={!flipped ? onClick : undefined}
    >
      <div className={`card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
        {/* Back (face down) */}
        <div className="card-front card-pattern bg-gradient-to-br from-mystic-deep-mid via-mystic-purple-dark to-mystic-deep border border-mystic-gold/30 flex items-center justify-center">
          {/* Star pattern overlay */}
          <div className="card-star-pattern" />

          {/* Center ornament */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-mystic-gold/30 flex items-center justify-center">
              <span className="text-mystic-gold/60 text-xl animate-pulse-glow">✦</span>
            </div>
          </div>

          {/* Corner decorations */}
          <span className="absolute top-3 left-3 text-mystic-gold/20 text-[8px]">✦</span>
          <span className="absolute top-3 right-3 text-mystic-gold/20 text-[8px]">✦</span>
          <span className="absolute bottom-3 left-3 text-mystic-gold/20 text-[8px]">✦</span>
          <span className="absolute bottom-3 right-3 text-mystic-gold/20 text-[8px]">✦</span>
        </div>

        {/* Front (face up) */}
        <div
          className={`card-back bg-gradient-to-b from-mystic-deep via-mystic-purple-dark/80 to-mystic-deep 
                      border border-mystic-gold/50 flex flex-col items-center justify-center p-4 text-center
                      ${card.reversed ? "rotate-180" : ""}`}
        >
          {/* Top ornament line */}
          <div className="absolute top-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-mystic-gold/30 to-transparent" />

          <span className="text-4xl md:text-5xl mb-3 drop-shadow-lg">{card.card.emoji || "✦"}</span>
          <p className="font-display text-mystic-gold text-xs md:text-sm leading-tight mb-1.5">
            {card.card.name}
          </p>
          {card.reversed && (
            <span className="inline-block px-2 py-0.5 bg-mystic-purple/40 text-mystic-gold/70 text-[9px] rounded-full tracking-wider uppercase border border-mystic-gold/20">
              Reversed
            </span>
          )}
          {!card.reversed && (
            <span className="text-mystic-star/30 text-[9px] tracking-wider uppercase">
              Upright
            </span>
          )}
          <p className="text-mystic-star/30 text-[8px] mt-2 tracking-wider">{card.card.keywords[0]}</p>

          {/* Bottom ornament line */}
          <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-mystic-gold/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
