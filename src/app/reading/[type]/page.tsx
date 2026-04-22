"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { drawCards, type DrawnCard } from "@/lib/tarot";

/* ─── Types ─── */
type Phase = "cinematic" | "greet" | "topic" | "spread" | "select" | "reveal" | "reading" | "result";

interface ReadingResult {
  cards: { id: number; name: string; emoji: string; reversed: boolean; position: string; keywords: string[]; meaning: string }[];
  free: string;
  premium: string;
}

/* ─── Static Data ─── */
const STARS = Array.from({ length: 30 }, (_, i) => ({
  left: `${(13 * i + 7) * 43 % 100}%`,
  top: `${(17 * i + 5) * 61 % 100}%`,
  delay: `${(0.14 * i % 2.2).toFixed(2)}s`,
  size: `${2 + i % 3}px`,
}));

const TOPICS = [
  { key: "love", label: "Love & Romance", emoji: "💕" },
  { key: "career", label: "Career & Work", emoji: "💼" },
  { key: "finance", label: "Wealth & Fortune", emoji: "💰" },
  { key: "today", label: "Today's Guidance", emoji: "✨" },
  { key: "general", label: "General Insight", emoji: "🔮" },
];

const SPREADS = [
  { key: "1", label: "1 Card", desc: "Quick insight" },
  { key: "3", label: "3 Cards", desc: "Past · Present · Future" },
];

const GREETINGS = [
  [
    { text: "The threads of fate stir... someone approaches.", expression: "✦" },
    { text: "Ah, it is you. The Norns have been expecting your visit.", expression: "⚡" },
  ],
  [
    { text: "The stars whisper of a seeker with a burning question...", expression: "★" },
    { text: "Welcome, traveler. Shall we peer into the weave of destiny?", expression: "✦" },
  ],
  [
    { text: "I sense the turning of the great wheel...", expression: "⚡" },
    { text: "Your thread glows brightly today. Come, let us read what the fates have woven.", expression: "★" },
  ],
];

const POSITIONS_3 = ["Past", "Present", "Future"];

/* ─── Cinematic Intro ─── */
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const skip = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(skip, 3200);
    return () => clearTimeout(t);
  }, [skip]);

  return (
    <div className={`tarot-cinematic${leaving ? " leaving" : ""}`} onClick={skip}>
      <div className="tarot-cin-stars" aria-hidden>
        {STARS.map((s, i) => (
          <span key={i} className="tarot-cin-star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />
        ))}
      </div>
      <div className="tarot-cin-flash" aria-hidden />
      <div className="tarot-cin-content">
        <div className="tarot-cin-center" aria-hidden>
          <div className="tarot-cin-aura" />
          <div className="tarot-cin-ring tarot-cin-ring-outer" />
          <div className="tarot-cin-ring tarot-cin-ring-mid" />
          <div className="tarot-cin-ring tarot-cin-ring-inner" />
          <div className="tarot-cin-icon-frame">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="rgba(212,168,83,0.6)" strokeWidth="1" />
              <path d="M50 10 L58 38 L90 38 L64 54 L72 82 L50 66 L28 82 L36 54 L10 38 L42 38 Z" fill="rgba(212,168,83,0.15)" stroke="rgba(212,168,83,0.5)" strokeWidth="0.5" />
              <text x="50" y="56" textAnchor="middle" fill="rgba(212,168,83,0.8)" fontSize="14" fontFamily="Playfair Display, serif" fontWeight="700">N</text>
            </svg>
          </div>
        </div>
        <div className="tarot-cin-title-block">
          <div className="tarot-cin-title-stars" aria-hidden>
            <span>★</span><span>✦</span><span>★</span>
          </div>
          <h1 className="tarot-cin-title">NORNA</h1>
        </div>
        <p className="tarot-cin-subtitle">Ancient Wisdom · Modern Insight</p>
      </div>
      <p className="tarot-cin-skip" aria-hidden>TAP TO SKIP</p>
    </div>
  );
}

/* ─── Typewriter Dialogue ─── */
function Dialogue({ text, onComplete, speed = 30 }: { text: string; onComplete?: () => void; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const idx = useRef(0);
  const interval = useRef<ReturnType<typeof setInterval>>(undefined);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const finish = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    if (timeout.current) clearTimeout(timeout.current);
    setDisplayed(text);
    setDone(true);
    timeout.current = setTimeout(() => setReady(true), 400);
  }, [text]);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);
    setReady(false);
    if (timeout.current) clearTimeout(timeout.current);
    interval.current = setInterval(() => {
      idx.current++;
      if (idx.current >= text.length) {
        clearInterval(interval.current!);
        setDisplayed(text);
        setDone(true);
        timeout.current = setTimeout(() => setReady(true), 400);
      } else {
        setDisplayed(text.slice(0, idx.current));
      }
    }, speed);
    return () => {
      if (interval.current) clearInterval(interval.current);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [text, speed]);

  const handleClick = () => {
    if (!done) { finish(); return; }
    if (ready && onComplete) onComplete();
  };

  return (
    <div className={`tarot-dialogue${done && ready ? " tarot-dialogue--ready" : ""}`} onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="tarot-dlg-name">
        <span className="tarot-dlg-icon">⚡</span>
        Norna
      </div>
      <div className="tarot-dlg-text">
        {displayed}
        {done && ready && <span className="tarot-dlg-next"> ▼</span>}
        {!done && <span className="tarot-dlg-cursor">|</span>}
      </div>
    </div>
  );
}

/* ─── Card Back SVG ─── */
function CardBack() {
  return (
    <div className="tarot-card-back">
      <div className="tarot-card-back-pattern">
        <div className="tarot-card-back-diamond" />
        <div className="tarot-card-back-rays" />
      </div>
      <div className="tarot-card-back-star">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14.09 8.26L20.18 8.58L15.54 12.42L17.09 18.5L12 15.27L6.91 18.5L8.46 12.42L3.82 8.58L9.91 8.26L12 2Z" fill="rgba(212,168,83,0.15)" stroke="rgba(212,168,83,0.5)" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="tarot-card-back-label">NORNA</div>
    </div>
  );
}

/* ─── TarotCard ─── */
function TarotCard({ card, flipped, selected, selectable, onClick, orderBadge }: {
  card: DrawnCard;
  flipped: boolean;
  selected: boolean;
  selectable: boolean;
  onClick?: () => void;
  orderBadge?: number;
}) {
  const imgSrc = card.card.image;
  const name = card.card.name;
  const direction = card.reversed ? "Reversed ↺" : "Upright ↑";

  return (
    <div
      className={`tarot-card-slot ${flipped ? "flipped" : ""} ${selected ? "selected" : ""} ${selectable ? "selectable" : ""}`}
      onClick={selectable ? onClick : undefined}
    >
      <div className="tarot-card-inner">
        <CardBack />
        <div className={`tarot-card-front ${card.reversed ? "reversed" : ""}`}>
          {imgSrc ? (
            <img className="tarot-card-front-img" src={imgSrc} alt={name} draggable={false} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1a1535, #0d0b20)", fontSize: "2rem" }}>
              {card.card.emoji}
            </div>
          )}
          <div className="tarot-card-overlay">
            <div className="tarot-card-name-main">{name}</div>
            <div className="tarot-card-direction">{direction}</div>
          </div>
        </div>
      </div>
      <div className="tarot-card-burst" />
      <div className="tarot-card-rays" />
      <div className="tarot-card-sparkles">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className="tarot-sparkle" />)}
      </div>
      {orderBadge !== undefined && <div className="tarot-card-badge">{orderBadge}</div>}
    </div>
  );
}

/* ─── Arc Deck (Fan of cards to select from) ─── */
function ArcDeck({ cards, selected, onSelect, maxSelect }: {
  cards: DrawnCard[];
  selected: Set<number>;
  onSelect: (i: number) => void;
  maxSelect: number;
}) {
  const total = cards.length;
  const arcSpan = Math.min(total * 4, 70); // degrees
  const radius = 420;

  return (
    <div className="tarot-arc-deck">
      {cards.map((card, i) => {
        const angle = -arcSpan / 2 + (arcSpan / (total - 1 || 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.sin(rad) * radius;
        const y = -Math.cos(rad) * radius + radius;
        const isSel = selected.has(i);
        const canSelect = !isSel && selected.size < maxSelect;

        return (
          <div
            key={i}
            className="tarot-arc-card-wrapper"
            style={{
              transform: `translateX(calc(-50% + ${x}px)) translateY(${y - radius + 30}px) rotate(${angle}deg)`,
              zIndex: isSel ? 20 : i,
              opacity: isSel ? 0.3 : 1,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <div
              className={`tarot-card-slot ${canSelect ? "selectable" : ""} ${isSel ? "selected" : ""}`}
              onClick={canSelect ? () => onSelect(i) : undefined}
            >
              <div className="tarot-card-inner">
                <CardBack />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main App ─── */
export default function TarotReadingApp() {
  const [phase, setPhase] = useState<Phase>("cinematic");
  const [greetIdx, setGreetIdx] = useState(0);
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  const [topic, setTopic] = useState("");
  const [spreadCount, setSpreadCount] = useState(0);
  const [deckCards] = useState(() => drawCards(22)); // full major arcana deck to pick from
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [flipIdx, setFlipIdx] = useState(0);
  const [readingData, setReadingData] = useState<ReadingResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Advance greeting dialogue
  const advanceGreet = useCallback(() => {
    if (greetIdx < greeting.length - 1) {
      setGreetIdx(greetIdx + 1);
    } else {
      setPhase("topic");
    }
  }, [greetIdx, greeting.length]);

  // Select topic
  const selectTopic = useCallback((key: string) => {
    setTopic(key);
    setPhase("spread");
  }, []);

  // Select spread
  const selectSpread = useCallback((count: number) => {
    setSpreadCount(count);
    setSelectedIndices(new Set());
    setPhase("select");
  }, []);

  // Select card from arc
  const selectCard = useCallback((i: number) => {
    setSelectedIndices(prev => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  // Confirm selection
  const confirmSelection = useCallback(() => {
    const chosen = Array.from(selectedIndices).map(i => deckCards[i]);
    setDrawnCards(chosen);
    setFlippedCards(new Array(chosen.length).fill(false));
    setFlipIdx(0);
    setPhase("reveal");
  }, [selectedIndices, deckCards]);

  // Flip next card
  const flipNext = useCallback(() => {
    if (flipIdx >= drawnCards.length) return;
    setFlippedCards(prev => {
      const next = [...prev];
      next[flipIdx] = true;
      return next;
    });
    setFlipIdx(prev => prev + 1);
  }, [flipIdx, drawnCards.length]);

  // After all cards flipped, wait then fetch reading
  useEffect(() => {
    if (phase !== "reveal") return;
    if (flippedCards.length > 0 && flippedCards.every(Boolean)) {
      const t = setTimeout(() => {
        fetchReading();
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [flippedCards, phase]);

  const fetchReading = async () => {
    setLoading(true);
    const labels = spreadCount === 1 ? ["Focus"] : POSITIONS_3;
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: TOPICS.find(t => t.key === topic)?.label || "General guidance",
          type: spreadCount === 1 ? "daily" : "three-card",
        }),
      });
      const data: ReadingResult = await res.json();
      setReadingData(data);
    } catch {
      setReadingData({
        cards: [],
        free: "The cosmic threads wavered momentarily. Your cards have been drawn, but the Norns ask you to try again.",
        premium: "",
      });
    }
    setLoading(false);
    setPhase("result");
  };

  const restart = () => {
    setPhase("cinematic");
    setGreetIdx(0);
    setTopic("");
    setSpreadCount(0);
    setSelectedIndices(new Set());
    setDrawnCards([]);
    setFlippedCards([]);
    setFlipIdx(0);
    setReadingData(null);
  };

  const handleShare = async () => {
    const labels = spreadCount === 1 ? ["Focus"] : POSITIONS_3;
    const text = `✦ My Norna Reading ✦\n\n${drawnCards.map((c, i) => `${labels[i] || ""}: ${c.card.name}${c.reversed ? " (Reversed)" : ""}`).join("\n")}\n\nDiscover your fate at norna.app`;
    if (navigator.share) {
      await navigator.share({ title: "My Norna Reading", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <>
      {/* ─── Cinematic ─── */}
      {phase === "cinematic" && <CinematicIntro onComplete={() => setPhase("greet")} />}

      {/* ─── App Shell ─── */}
      {phase !== "cinematic" && (
        <div className={`tarot-app${phase === "result" ? " phase-result" : ""}`}>
          {/* Stars */}
          <div className="tarot-stars" aria-hidden>
            {STARS.map((s, i) => (
              <span key={i} className="tarot-star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, ["--dur" as string]: `${2 + (i % 3)}s` }} />
            ))}
          </div>

          {/* ─── Greeting / Topic / Spread phases ─── */}
          {(phase === "greet" || phase === "topic" || phase === "spread") && (
            <div className="tarot-scene">
              {/* Background gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0a0a14 60%, #050510 100%)",
              }} />
              {/* Norn symbol in center */}
              <div style={{
                position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                width: 200, height: 200, opacity: 0.15,
              }}>
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="80" stroke="rgba(212,168,83,0.4)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" stroke="rgba(155,126,240,0.3)" strokeWidth="0.5" />
                  <path d="M100 20 L116 76 L180 76 L128 108 L144 164 L100 132 L56 164 L72 108 L20 76 L84 76 Z" fill="rgba(212,168,83,0.1)" stroke="rgba(212,168,83,0.3)" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Bottom overlay with dialogue */}
              <div className="tarot-bottom-overlay">
                {phase === "greet" && (
                  <Dialogue
                    key={`greet-${greetIdx}`}
                    text={greeting[greetIdx].text}
                    onComplete={advanceGreet}
                  />
                )}

                {phase === "topic" && (
                  <>
                    <Dialogue
                      text="What weighs upon your mind today? Choose a thread of fate to follow..."
                      speed={25}
                    />
                    <div className="tarot-topics">
                      {TOPICS.map(t => (
                        <button key={t.key} className="tarot-topic-btn" onClick={() => selectTopic(t.key)}>
                          <span className="tarot-topic-emoji">{t.emoji}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {phase === "spread" && (
                  <>
                    <Dialogue
                      text="How many threads shall we pull from the loom?"
                      speed={25}
                    />
                    <div className="tarot-options">
                      {SPREADS.map(s => (
                        <button key={s.key} className="tarot-option-btn" onClick={() => selectSpread(Number(s.key))}>
                          <span style={{ fontWeight: 600 }}>{s.label}</span>
                          <span style={{ fontSize: "0.68rem", color: "rgba(200,180,255,0.6)" }}>{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── Card Selection Phase ─── */}
          {phase === "select" && (
            <>
              <div className="tarot-scene" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0a0a14 60%, #050510 100%)",
                }} />
              </div>
              <div className="tarot-candidates-area">
                <div className="tarot-selected-tray">
                  {Array.from(selectedIndices).map((cardIdx, i) => {
                    const c = deckCards[cardIdx];
                    return (
                      <div key={cardIdx} className="tarot-selected-mini-wrap">
                        <div className="tarot-selected-mini">
                          {c.card.image ? (
                            <img src={c.card.image} alt={c.card.name} />
                          ) : (
                            <div style={{ width: "100%", height: "100%", background: "#1a1040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                              {c.card.emoji}
                            </div>
                          )}
                        </div>
                        <div className="tarot-selected-mini-badge">{i + 1}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="tarot-candidates-info">
                  {selectedIndices.size < spreadCount
                    ? `Choose ${spreadCount - selectedIndices.size} more card${spreadCount - selectedIndices.size > 1 ? "s" : ""}`
                    : (
                      <button className="tarot-confirm-btn" onClick={confirmSelection}>
                        ✦ Reveal Your Fate ✦
                      </button>
                    )
                  }
                </div>
                <ArcDeck
                  cards={deckCards}
                  selected={selectedIndices}
                  onSelect={selectCard}
                  maxSelect={spreadCount}
                />
              </div>
            </>
          )}

          {/* ─── Reveal Phase ─── */}
          {phase === "reveal" && (
            <div className="tarot-scene" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0a0a14 60%, #050510 100%)",
              }} />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 1rem" }}>
                <p style={{ color: "rgba(168,160,192,0.6)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "2rem" }}>
                  TAP EACH CARD TO REVEAL
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                  {drawnCards.map((card, i) => {
                    const labels = spreadCount === 1 ? ["Focus"] : POSITIONS_3;
                    return (
                      <div key={i} style={{ textAlign: "center" }}>
                        <p style={{ color: "rgba(212,168,83,0.5)", fontSize: "0.65rem", letterSpacing: "0.15em", marginBottom: "0.5rem", fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {labels[i]}
                        </p>
                        <div className={`tarot-card-slot spotlight ${flippedCards[i] ? "flipped" : ""}`}
                          onClick={() => { if (!flippedCards[i] && i === flipIdx) flipNext(); }}
                          style={{ cursor: !flippedCards[i] && i === flipIdx ? "pointer" : "default" }}
                        >
                          <div className="tarot-card-inner">
                            <CardBack />
                            <div className={`tarot-card-front ${card.reversed ? "reversed" : ""}`}>
                              {card.card.image ? (
                                <img className="tarot-card-front-img" src={card.card.image} alt={card.card.name} draggable={false} />
                              ) : (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1a1535, #0d0b20)", fontSize: "3rem" }}>
                                  {card.card.emoji}
                                </div>
                              )}
                              <div className="tarot-card-overlay">
                                <div className="tarot-card-name-main">{card.card.name}</div>
                                <div className="tarot-card-direction">{card.reversed ? "Reversed ↺" : "Upright ↑"}</div>
                              </div>
                            </div>
                          </div>
                          <div className="tarot-card-burst" />
                          <div className="tarot-card-rays" />
                          <div className="tarot-card-sparkles">
                            {Array.from({ length: 8 }).map((_, j) => <span key={j} className="tarot-sparkle" />)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {flippedCards.every(Boolean) && (
                  <div style={{ marginTop: "2rem" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "rgba(16,10,40,0.85)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: "1rem" }}>
                      <div className="tarot-loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                      <span style={{ color: "rgba(212,168,83,0.7)", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "'Playfair Display', Georgia, serif" }}>
                        The Norns are weaving your fate...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── Result Phase ─── */}
          {phase === "result" && readingData && (
            <div className="tarot-reveal-area">
              {/* Header */}
              <div style={{ textAlign: "center", padding: "1.5rem 0 0.5rem" }}>
                <p style={{ color: "rgba(212,168,83,0.7)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>✦ YOUR READING ✦</p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#f0d48a", marginTop: "0.5rem" }}>
                  {TOPICS.find(t => t.key === topic)?.label || "Your Reading"}
                </h2>
              </div>

              {/* Card summary */}
              <div className="tarot-reveal-cards">
                {drawnCards.map((card, i) => {
                  const labels = spreadCount === 1 ? ["Focus"] : POSITIONS_3;
                  return (
                    <div key={i} style={{ textAlign: "center" }}>
                      <p style={{ color: "rgba(212,168,83,0.4)", fontSize: "0.55rem", letterSpacing: "0.15em", marginBottom: "0.25rem", fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {labels[i]}
                      </p>
                      <div className="tarot-card-slot spotlight flipped">
                        <div className="tarot-card-inner">
                          <CardBack />
                          <div className={`tarot-card-front ${card.reversed ? "reversed" : ""}`}>
                            {card.card.image ? (
                              <img className="tarot-card-front-img" src={card.card.image} alt={card.card.name} draggable={false} />
                            ) : (
                              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1a1535, #0d0b20)", fontSize: "3rem" }}>
                                {card.card.emoji}
                              </div>
                            )}
                            <div className="tarot-card-overlay">
                              <div className="tarot-card-name-main">{card.card.name}</div>
                              <div className="tarot-card-direction">{card.reversed ? "Reversed ↺" : "Upright ↑"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Free reading */}
              <div className="tarot-result-section">
                <div className="tarot-result-card">
                  <div className="tarot-result-title">The Norns Speak</div>
                  <div className="tarot-result-text">
                    {readingData.free.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>

                {/* Premium locked */}
                <div className="tarot-result-card tarot-premium-lock">
                  <div className="tarot-result-title">Deep Insight</div>
                  <div className="tarot-premium-blur tarot-result-text">
                    {(readingData.premium || "The deeper threads of your reading reveal hidden patterns and connections...").split("\n\n").slice(0, 3).map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <div className="tarot-premium-overlay">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginBottom: "0.5rem" }}>
                      <rect x="4" y="9" width="12" height="9" rx="2" stroke="rgba(212,168,83,0.5)" strokeWidth="1.2" />
                      <path d="M6 9V6a4 4 0 118 0v3" stroke="rgba(212,168,83,0.5)" strokeWidth="1.2" />
                    </svg>
                    <p style={{ color: "rgba(168,160,192,0.5)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                      The full revelation awaits
                    </p>
                    <button className="tarot-confirm-btn" style={{ fontSize: "0.85rem", padding: "0.65rem 1.75rem" }}>
                      🔓 Unlock Full Reading — $2.99
                    </button>
                    <p style={{ color: "rgba(168,160,192,0.3)", fontSize: "0.65rem", marginTop: "0.5rem" }}>
                      ✦ One-time purchase · Instant access
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="tarot-action-row">
                  <button className="tarot-action-btn" onClick={handleShare}>Share ↗</button>
                  <button className="tarot-action-btn" onClick={restart}>New Reading</button>
                </div>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {loading && (
            <div className="tarot-loading-overlay">
              <div className="tarot-loading-spinner" />
              <p>The Norns are weaving your fate...</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
