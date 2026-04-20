"use client";
import Image from "next/image";
import type { DrawnCard } from "@/lib/tarot";

interface Props {
  card: DrawnCard;
  flipped: boolean;
  onClick: () => void;
}

export default function TarotCard({ card, flipped, onClick }: Props) {
  return (
    <div
      className="card-container w-[110px] h-[175px] md:w-[130px] md:h-[205px] cursor-pointer select-none"
      onClick={!flipped ? onClick : undefined}
    >
      <div className={`card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
        {/* ─── Back (face down) — with image ─── */}
        <div className="card-front rounded-xl overflow-hidden border border-[var(--gold)]/25 hover:border-[var(--gold)]/40 transition-colors duration-500 relative">
          <Image
            src="/images/hero_slide_3_1024x1024.jpg"
            alt="Card back"
            fill
            className="object-cover opacity-40"
            sizes="130px"
          />
          <div className="absolute inset-0 tarot-back-pattern bg-gradient-to-b from-[var(--deep-mid)]/80 via-[var(--purple-dark)]/70 to-[var(--deep-mid)]/80" />
          {/* Geometric layers */}
          <div className="absolute inset-0">
            <div className="tarot-back-rays" />
            <div className="tarot-back-diamond"><div /></div>
            <div className="tarot-back-circle" />
          </div>

          {/* Center ornament */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[var(--gold)]/50">
              <path d="M14 0L16 12L28 14L16 16L14 28L12 16L0 14L12 12L14 0Z" fill="currentColor" />
            </svg>
          </div>

          {/* Corner marks */}
          <svg className="absolute top-2.5 left-2.5 w-3 h-3 text-[var(--gold)]/20 z-10" viewBox="0 0 12 12" fill="none">
            <path d="M0 0L12 0M0 0L0 12" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-3 h-3 text-[var(--gold)]/20 z-10" viewBox="0 0 12 12" fill="none">
            <path d="M12 0L0 0M12 0L12 12" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-3 h-3 text-[var(--gold)]/20 z-10" viewBox="0 0 12 12" fill="none">
            <path d="M0 12L12 12M0 12L0 0" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-3 h-3 text-[var(--gold)]/20 z-10" viewBox="0 0 12 12" fill="none">
            <path d="M12 12L0 12M12 12L12 0" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* ─── Front (face up) ─── */}
        <div
          className={`card-back rounded-xl overflow-hidden border border-[var(--gold)]/30 relative flex flex-col items-center justify-center p-4 text-center
                      ${card.reversed ? "rotate-180" : ""}`}
        >
          {/* Background image */}
          <Image
            src="/images/hero_slide_2_1024x1024.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="130px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-mid)]/90 via-[var(--purple-dark)]/80 to-[var(--deep)]/90" />

          {/* Top line */}
          <div className="absolute top-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/25 to-transparent z-10" />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border border-[var(--gold)]/25 flex items-center justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--gold)]/60">
                <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8L7 0Z" fill="currentColor" />
              </svg>
            </div>

            <p className="font-display text-[var(--gold)] text-[11px] md:text-xs leading-tight mb-1.5 px-1">
              {card.card.name}
            </p>

            {card.reversed ? (
              <span className="inline-block px-2 py-0.5 border border-[var(--gold)]/20 text-[var(--gold)]/60 text-[8px] rounded-full tracking-wider uppercase">
                Reversed
              </span>
            ) : (
              <span className="text-[var(--cream)]/25 text-[8px] tracking-wider uppercase">
                Upright
              </span>
            )}

            <p className="text-[var(--cream)]/25 text-[7px] mt-2.5 tracking-[0.1em] max-w-[80%]">
              {card.card.keywords[0]}
            </p>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/25 to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}
