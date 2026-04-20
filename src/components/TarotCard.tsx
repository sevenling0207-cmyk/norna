"use client";

interface TarotCardProps {
  isFlipped: boolean;
  onClick?: () => void;
  frontContent?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function TarotCard({ isFlipped, onClick, frontContent, size = "md" }: TarotCardProps) {
  const sizes = {
    sm: "w-28 h-44",
    md: "w-[110px] h-[180px] sm:w-[130px] sm:h-[210px]",
    lg: "w-44 h-72",
  };

  return (
    <div
      className={`card-container cursor-pointer ${sizes[size]}`}
      onClick={onClick}
    >
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Back */}
        <div className="card-front tarot-back-pattern">
          <div className="tarot-back-rays" />
          <div className="tarot-back-diamond" />
          <div className="tarot-back-circle" />
          {/* Center star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-30">
              <path
                d="M12 2L14.09 8.26L20.18 8.58L15.54 12.42L17.09 18.5L12 15.27L6.91 18.5L8.46 12.42L3.82 8.58L9.91 8.26L12 2Z"
                stroke="rgba(212,168,83,0.6)"
                strokeWidth="1"
              />
            </svg>
          </div>
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[rgba(212,168,83,0.2)] rounded-tl" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[rgba(212,168,83,0.2)] rounded-tr" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[rgba(212,168,83,0.2)] rounded-bl" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[rgba(212,168,83,0.2)] rounded-br" />
        </div>
        {/* Front */}
        <div className="card-back bg-[#0d0d1a] border border-[rgba(212,168,83,0.15)] flex items-center justify-center p-3">
          {frontContent}
        </div>
      </div>
    </div>
  );
}
