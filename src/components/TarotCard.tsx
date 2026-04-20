"use client";

interface TarotCardProps {
  isFlipped: boolean;
  onClick?: () => void;
  frontContent?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function TarotCard({ isFlipped, onClick, frontContent, size = "md" }: TarotCardProps) {
  const sizes = {
    sm: "w-[100px] h-[162px] sm:w-[110px] sm:h-[180px]",
    md: "w-[120px] h-[195px] sm:w-[140px] sm:h-[228px]",
    lg: "w-[130px] h-[211px] sm:w-[160px] sm:h-[260px]",
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
          {/* Inner border */}
          <div className="absolute inset-[5px] rounded-lg border border-[rgba(212,168,83,0.25)]" />
          <div className="absolute inset-[10px] rounded-md border border-[rgba(212,168,83,0.12)]" />
          
          {/* Diamond pattern */}
          <div
            className="absolute top-1/2 left-1/2 w-[55%] h-[55%]"
            style={{
              transform: "translate(-50%, -50%) rotate(45deg)",
              border: "1px solid rgba(212,168,83,0.3)",
            }}
          />
          
          {/* Circle */}
          <div
            className="absolute top-1/2 left-1/2 w-[40%]"
            style={{
              transform: "translate(-50%, -50%)",
              paddingBottom: "40%",
              border: "1px solid rgba(212,168,83,0.25)",
              borderRadius: "50%",
            }}
          />
          
          {/* Rays */}
          <div
            className="absolute inset-0"
            style={{
              background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(212,168,83,0.08) 0deg, transparent 10deg, transparent 20deg)",
            }}
          />
          
          {/* Center star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.09 8.26L20.18 8.58L15.54 12.42L17.09 18.5L12 15.27L6.91 18.5L8.46 12.42L3.82 8.58L9.91 8.26L12 2Z"
                fill="rgba(212,168,83,0.15)"
                stroke="rgba(212,168,83,0.5)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          
          {/* Corner dots */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.3)]" />
          
          {/* NORNA text */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-[rgba(212,168,83,0.3)] text-[8px] tracking-[0.3em] font-display">NORNA</span>
          </div>
        </div>

        {/* Front (visible when flipped) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center p-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, #1a1535 0%, #0f0d22 50%, #1a1535 100%)",
            border: "1.5px solid rgba(212,168,83,0.3)",
            boxShadow: "0 0 25px rgba(212,168,83,0.2)",
          }}
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />
          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />
          
          {frontContent}
        </div>
      </div>
    </div>
  );
}
