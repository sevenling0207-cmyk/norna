export interface TarotCardData {
  id: number;
  name: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  number?: number;
  emoji: string;
  keywords: string[];
  upright: string;
  reversed: string;
}

export interface DrawnCard {
  card: TarotCardData;
  reversed: boolean;
}

const majorArcana: TarotCardData[] = [
  { id: 0, name: "The Fool", arcana: "major", emoji: "🃏", keywords: ["beginnings", "innocence", "spontaneity"], upright: "New beginnings, free spirit, innocence", reversed: "Recklessness, risk-taking, holding back" },
  { id: 1, name: "The Magician", arcana: "major", emoji: "🎩", keywords: ["manifestation", "power", "action"], upright: "Willpower, creation, manifestation", reversed: "Manipulation, poor planning, untapped talents" },
  { id: 2, name: "The High Priestess", arcana: "major", emoji: "🌙", keywords: ["intuition", "mystery", "subconscious"], upright: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, withdrawal, silence" },
  { id: 3, name: "The Empress", arcana: "major", emoji: "👑", keywords: ["abundance", "nurturing", "nature"], upright: "Femininity, beauty, abundance", reversed: "Dependence, smothering, emptiness" },
  { id: 4, name: "The Emperor", arcana: "major", emoji: "🏛️", keywords: ["authority", "structure", "control"], upright: "Authority, structure, solid foundation", reversed: "Tyranny, rigidity, lack of discipline" },
  { id: 5, name: "The Hierophant", arcana: "major", emoji: "📿", keywords: ["tradition", "conformity", "education"], upright: "Spiritual wisdom, tradition, conformity", reversed: "Rebellion, subversion, new approaches" },
  { id: 6, name: "The Lovers", arcana: "major", emoji: "💕", keywords: ["love", "harmony", "choices"], upright: "Love, harmony, relationships, alignment", reversed: "Imbalance, misalignment, disharmony" },
  { id: 7, name: "The Chariot", arcana: "major", emoji: "⚔️", keywords: ["determination", "willpower", "victory"], upright: "Control, willpower, success, determination", reversed: "Lack of control, aggression, no direction" },
  { id: 8, name: "Strength", arcana: "major", emoji: "🦁", keywords: ["courage", "patience", "compassion"], upright: "Inner strength, bravery, compassion", reversed: "Self-doubt, weakness, insecurity" },
  { id: 9, name: "The Hermit", arcana: "major", emoji: "🏔️", keywords: ["solitude", "reflection", "guidance"], upright: "Soul-searching, introspection, being alone", reversed: "Isolation, loneliness, withdrawal" },
  { id: 10, name: "Wheel of Fortune", arcana: "major", emoji: "🎡", keywords: ["destiny", "luck", "cycles"], upright: "Good luck, karma, life cycles, destiny", reversed: "Bad luck, resistance to change, breaking cycles" },
  { id: 11, name: "Justice", arcana: "major", emoji: "⚖️", keywords: ["fairness", "truth", "law"], upright: "Justice, fairness, truth, law", reversed: "Unfairness, dishonesty, lack of accountability" },
  { id: 12, name: "The Hanged Man", arcana: "major", emoji: "🙃", keywords: ["surrender", "perspective", "pause"], upright: "Pause, surrender, letting go, new perspectives", reversed: "Delays, resistance, stalling" },
  { id: 13, name: "Death", arcana: "major", emoji: "🦋", keywords: ["transformation", "endings", "change"], upright: "Endings, change, transformation, transition", reversed: "Resistance to change, fear of beginnings" },
  { id: 14, name: "Temperance", arcana: "major", emoji: "🏺", keywords: ["balance", "moderation", "patience"], upright: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, lack of purpose" },
  { id: 15, name: "The Devil", arcana: "major", emoji: "😈", keywords: ["shadow", "attachment", "addiction"], upright: "Shadow self, attachment, addiction, restriction", reversed: "Releasing limiting beliefs, exploring dark thoughts" },
  { id: 16, name: "The Tower", arcana: "major", emoji: "⚡", keywords: ["upheaval", "revelation", "awakening"], upright: "Sudden change, upheaval, chaos, revelation", reversed: "Fear of change, averting disaster" },
  { id: 17, name: "The Star", arcana: "major", emoji: "⭐", keywords: ["hope", "faith", "renewal"], upright: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, disconnection" },
  { id: 18, name: "The Moon", arcana: "major", emoji: "🌕", keywords: ["illusion", "fear", "subconscious"], upright: "Illusion, fear, anxiety, subconscious", reversed: "Release of fear, repressed emotion" },
  { id: 19, name: "The Sun", arcana: "major", emoji: "☀️", keywords: ["joy", "success", "vitality"], upright: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, feeling down, overly optimistic" },
  { id: 20, name: "Judgement", arcana: "major", emoji: "📯", keywords: ["rebirth", "calling", "absolution"], upright: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, refusal of self-examination" },
  { id: 21, name: "The World", arcana: "major", emoji: "🌍", keywords: ["completion", "achievement", "travel"], upright: "Completion, integration, accomplishment", reversed: "Lack of completion, stagnation" },
];

function generateMinorArcana(): TarotCardData[] {
  const suits: { name: "wands" | "cups" | "swords" | "pentacles"; emoji: string; theme: string }[] = [
    { name: "wands", emoji: "🪄", theme: "passion" },
    { name: "cups", emoji: "🏆", theme: "emotion" },
    { name: "swords", emoji: "⚔️", theme: "intellect" },
    { name: "pentacles", emoji: "💰", theme: "material" },
  ];

  const ranks = [
    { n: 1, label: "Ace", kw: ["new opportunity", "potential"], up: "New opportunity in {theme}", rev: "Missed chance, delays" },
    { n: 2, label: "Two", kw: ["balance", "decision"], up: "Partnership, balance in {theme}", rev: "Imbalance, indecision" },
    { n: 3, label: "Three", kw: ["growth", "collaboration"], up: "Growth and expansion", rev: "Overextension, delays" },
    { n: 4, label: "Four", kw: ["stability", "foundation"], up: "Stability, contemplation", rev: "Restlessness, stagnation" },
    { n: 5, label: "Five", kw: ["conflict", "challenge"], up: "Conflict, competition", rev: "Resolution, compromise" },
    { n: 6, label: "Six", kw: ["harmony", "generosity"], up: "Harmony, cooperation", rev: "Disharmony, selfishness" },
    { n: 7, label: "Seven", kw: ["reflection", "assessment"], up: "Reflection, perseverance", rev: "Impatience, giving up" },
    { n: 8, label: "Eight", kw: ["movement", "speed"], up: "Movement, swift action", rev: "Stagnation, slowdown" },
    { n: 9, label: "Nine", kw: ["culmination", "attainment"], up: "Near completion, resilience", rev: "Setbacks, inner doubts" },
    { n: 10, label: "Ten", kw: ["completion", "fulfillment"], up: "Completion, legacy", rev: "Burden, resistance to closure" },
    { n: 11, label: "Page", kw: ["curiosity", "message"], up: "Curiosity, new ideas", rev: "Immaturity, lack of direction" },
    { n: 12, label: "Knight", kw: ["action", "adventure"], up: "Action, pursuit of goals", rev: "Recklessness, haste" },
    { n: 13, label: "Queen", kw: ["nurturing", "intuition"], up: "Nurturing energy, confidence", rev: "Insecurity, dependence" },
    { n: 14, label: "King", kw: ["mastery", "leadership"], up: "Mastery, authority, control", rev: "Tyranny, rigidity" },
  ];

  const cards: TarotCardData[] = [];
  let id = 22;

  for (const suit of suits) {
    for (const rank of ranks) {
      cards.push({
        id: id++,
        name: `${rank.label} of ${suit.name.charAt(0).toUpperCase() + suit.name.slice(1)}`,
        arcana: "minor",
        suit: suit.name,
        number: rank.n,
        emoji: suit.emoji,
        keywords: rank.kw,
        upright: rank.up.replace("{theme}", suit.theme),
        reversed: rank.rev,
      });
    }
  }

  return cards;
}

export const allCards: TarotCardData[] = [...majorArcana, ...generateMinorArcana()];

export function drawCards(count: number): DrawnCard[] {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() > 0.7,
  }));
}
