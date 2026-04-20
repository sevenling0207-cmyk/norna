"use client";

import Image from "next/image";

interface TarotCardProps {
  isFlipped: boolean;
  onClick?: () => void;
  frontContent?: React.ReactNode;
  cardImage?: string;
  cardName?: string;
  isReversed?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function TarotCard({ isFlipped, onClick, frontContent, cardImage, cardName, isReversed, size = "md" }: TarotCardProps) {
  const sizes = {
    sm: "w-[110px] h-[178px] sm:w-[130px] sm:h-[210px]",
    md: "w-[130px] h-[210px] sm:w-[155px] sm:h-[252px]",
    lg: "w-[150px] h-[243px] sm:w-[185px] sm:h-[300px]",
  };

  return (
    <div
      className={`cursor-pointer ${sizes[size]}`}
      onClick={onClick}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Back (visible when not flipped) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, #1a1535 0%, #0d0b20 50%, #1a1535 100%)",
            border: "1.5px solid rgba(212,168,83,0.4)",
            boxShadow: "0 0 20px rgba(212,168,83,0.15), inset 0 0 40px rgba(212,168,83,0.05)",
          }}
        >
          <div className="absolute inset-[5px] rounded-lg border border-[rgba(212,168,83,0.25)]" />
          <div className="absolute inset-[10px] rounded-md border border-[rgba(212,168,83,0.12)]" />
          <div
            className="absolute top-1/2 left-1/2 w-[55%] h-[55%]"
            style={{ transform: "translate(-50%, -50%) rotate(45deg)", border: "1px solid rgba(212,168,83,0.3)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[40%]"
            style={{ transform: "translate(-50%, -50%)", paddingBottom: "40%", border: "1px solid rgba(212,168,83,0.25)", borderRadius: "50%" }}
          />
          <div className="absolute inset-0" style={{ background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(212,168,83,0.08) 0deg, transparent 10deg, transparent 20deg)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.09 8.26L20.18 8.58L15.54 12.42L17.09 18.5L12 15.27L6.91 18.5L8.46 12.42L3.82 8.58L9.91 8.26L12 2Z" fill="rgba(212,168,83,0.15)" stroke="rgba(212,168,83,0.5)" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-[rgba(212,168,83,0.3)] text-[8px] tracking-[0.3em] font-display">NORNA</span>
          </div>
        </div>

        {/* Front (visible when flipped) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1.5px solid rgba(212,168,83,0.3)",
            boxShadow: "0 0 25px rgba(212,168,83,0.2)",
          }}
        >
          {cardImage ? (
            <div className="relative w-full h-full">
              <Image
                src={cardImage}
                alt={cardName || "Tarot card"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 170px, 220px"
              />
              {/* Dark gradient overlay at bottom for card name */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              {cardName && (
                <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                  <p className="font-display text-white text-[11px] sm:text-sm leading-tight drop-shadow-lg">
                    {cardName}
                  </p>
                  {isReversed && (
                    <p className="text-[#d4a853] text-[9px] sm:text-[10px] mt-0.5 drop-shadow-lg">↻ Reversed</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center p-3"
              style={{ background: "linear-gradient(145deg, #1a1535 0%, #0f0d22 50%, #1a1535 100%)" }}
            >
              <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />
              <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />
              {frontContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
