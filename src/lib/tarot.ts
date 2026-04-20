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
  image: string | null;
}

export interface DrawnCard {
  card: TarotCardData;
  reversed: boolean;
}

// Map of card images actually available in /public/images/cards/
const availableImages = new Set([
  "ace-of-cups.jpg","ace-of-pentacles.jpg","ace-of-swords.jpg","ace-of-wands.jpg",
  "chariot.jpg","death.jpg",
  "eight-of-cups.jpg","eight-of-pentacles.jpg","eight-of-swords.jpg","eight-of-wands.jpg",
  "emperor.jpg","empress.jpg",
  "five-of-cups.jpg","five-of-pentacles.jpg","five-of-swords.jpg","five-of-wands.jpg",
  "fool.jpg",
  "four-of-cups.jpg","four-of-pentacles.jpg","four-of-swords.jpg","four-of-wands.jpg",
  "hermit.jpg","high-priestess.jpg",
  "judgement.jpg","justice.jpg","justice2.jpg",
  "king-of-cups.jpg","king-of-pentacles.jpg","king-of-swords.jpg","king-of-wands.jpg",
  "knight-of-cups.jpg","knight-of-pentacles.jpg","knight-of-swords.jpg","knight-of-wands.jpg",
  "magician.jpg",
  "nine-of-cups.jpg","nine-of-pentacles.jpg","nine-of-swords.jpg","nine-of-wands.jpg",
  "page-of-cups.jpg","page-of-pentacles.jpg","page-of-swords.jpg","page-of-wands.jpg",
  "queen-of-cups.jpg","queen-of-pentacles.jpg","queen-of-swords.jpg","queen-of-wands.jpg",
  "seven-of-cups.jpg","seven-of-pentacles.jpg","seven-of-swords.jpg","seven-of-wands.jpg",
  "six-of-cups.jpg","six-of-pentacles.jpg","six-of-swords.jpg","six-of-wands.jpg",
  "star.jpg","strength.jpg","sun.jpg","temperance.jpg",
  "ten-of-cups.jpg","ten-of-pentacles.jpg","ten-of-swords.jpg","ten-of-wands.jpg",
  "the-chariot.jpg","the-devil.jpg","the-emperor.jpg","the-empress.jpg",
  "the-fool.jpg","the-hanged-man.jpg","the-hermit.jpg","the-high-priestess.jpg",
  "the-lovers.jpg","the-magician.jpg","the-moon.jpg","the-star.jpg","the-sun.jpg",
  "the-tower.jpg","the-world.jpg",
  "three-of-cups.jpg","three-of-pentacles.jpg","three-of-swords.jpg","three-of-wands.jpg",
  "two-of-cups.jpg","two-of-pentacles.jpg","two-of-swords.jpg","two-of-wands.jpg",
  "wheel-of-fortune.jpg",
]);

function resolveImage(name: string): string | null {
  // Try "the-fool" style first (lowercase, hyphenated)
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  if (availableImages.has(slug + ".jpg")) return `/images/cards/${slug}.jpg`;
  // Try without "the-" prefix for major arcana
  const noThe = slug.replace(/^the-/, "");
  if (availableImages.has(noThe + ".jpg")) return `/images/cards/${noThe}.jpg`;
  return null;
}

const majorArcana: TarotCardData[] = [
  { id: 0, name: "The Fool", arcana: "major", emoji: "🃏", keywords: ["beginnings", "innocence", "spontaneity"], upright: "New beginnings, free spirit, innocence", reversed: "Recklessness, risk-taking, holding back", image: resolveImage("The Fool") },
  { id: 1, name: "The Magician", arcana: "major", emoji: "🎩", keywords: ["manifestation", "power", "action"], upright: "Willpower, creation, manifestation", reversed: "Manipulation, poor planning, untapped talents", image: resolveImage("The Magician") },
  { id: 2, name: "The High Priestess", arcana: "major", emoji: "🌙", keywords: ["intuition", "mystery", "subconscious"], upright: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, withdrawal, silence", image: resolveImage("The High Priestess") },
  { id: 3, name: "The Empress", arcana: "major", emoji: "👑", keywords: ["abundance", "nurturing", "nature"], upright: "Femininity, beauty, abundance", reversed: "Dependence, smothering, emptiness", image: resolveImage("The Empress") },
  { id: 4, name: "The Emperor", arcana: "major", emoji: "🏛️", keywords: ["authority", "structure", "control"], upright: "Authority, structure, solid foundation", reversed: "Tyranny, rigidity, lack of discipline", image: resolveImage("The Emperor") },
  { id: 5, name: "The Hierophant", arcana: "major", emoji: "📿", keywords: ["tradition", "conformity", "education"], upright: "Spiritual wisdom, tradition, conformity", reversed: "Rebellion, subversion, new approaches", image: resolveImage("The Hierophant") },
  { id: 6, name: "The Lovers", arcana: "major", emoji: "💕", keywords: ["love", "harmony", "choices"], upright: "Love, harmony, relationships, alignment", reversed: "Imbalance, misalignment, disharmony", image: resolveImage("The Lovers") },
  { id: 7, name: "The Chariot", arcana: "major", emoji: "⚔️", keywords: ["determination", "willpower", "victory"], upright: "Control, willpower, success, determination", reversed: "Lack of control, aggression, no direction", image: resolveImage("The Chariot") },
  { id: 8, name: "Strength", arcana: "major", emoji: "🦁", keywords: ["courage", "patience", "compassion"], upright: "Inner strength, bravery, compassion", reversed: "Self-doubt, weakness, insecurity", image: resolveImage("Strength") },
  { id: 9, name: "The Hermit", arcana: "major", emoji: "🏔️", keywords: ["solitude", "reflection", "guidance"], upright: "Soul-searching, introspection, being alone", reversed: "Isolation, loneliness, withdrawal", image: resolveImage("The Hermit") },
  { id: 10, name: "Wheel of Fortune", arcana: "major", emoji: "🎡", keywords: ["destiny", "luck", "cycles"], upright: "Good luck, karma, life cycles, destiny", reversed: "Bad luck, resistance to change, breaking cycles", image: resolveImage("Wheel of Fortune") },
  { id: 11, name: "Justice", arcana: "major", emoji: "⚖️", keywords: ["fairness", "truth", "law"], upright: "Justice, fairness, truth, law", reversed: "Unfairness, dishonesty, lack of accountability", image: resolveImage("Justice") },
  { id: 12, name: "The Hanged Man", arcana: "major", emoji: "🙃", keywords: ["surrender", "perspective", "pause"], upright: "Pause, surrender, letting go, new perspectives", reversed: "Delays, resistance, stalling", image: resolveImage("The Hanged Man") },
  { id: 13, name: "Death", arcana: "major", emoji: "🦋", keywords: ["transformation", "endings", "change"], upright: "Endings, change, transformation, transition", reversed: "Resistance to change, fear of beginnings", image: resolveImage("Death") },
  { id: 14, name: "Temperance", arcana: "major", emoji: "🏺", keywords: ["balance", "moderation", "patience"], upright: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess, lack of purpose", image: resolveImage("Temperance") },
  { id: 15, name: "The Devil", arcana: "major", emoji: "😈", keywords: ["shadow", "attachment", "addiction"], upright: "Shadow self, attachment, addiction, restriction", reversed: "Releasing limiting beliefs, exploring dark thoughts", image: resolveImage("The Devil") },
  { id: 16, name: "The Tower", arcana: "major", emoji: "⚡", keywords: ["upheaval", "revelation", "awakening"], upright: "Sudden change, upheaval, chaos, revelation", reversed: "Fear of change, averting disaster", image: resolveImage("The Tower") },
  { id: 17, name: "The Star", arcana: "major", emoji: "⭐", keywords: ["hope", "faith", "renewal"], upright: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair, disconnection", image: resolveImage("The Star") },
  { id: 18, name: "The Moon", arcana: "major", emoji: "🌕", keywords: ["illusion", "fear", "subconscious"], upright: "Illusion, fear, anxiety, subconscious", reversed: "Release of fear, repressed emotion", image: resolveImage("The Moon") },
  { id: 19, name: "The Sun", arcana: "major", emoji: "☀️", keywords: ["joy", "success", "vitality"], upright: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, feeling down, overly optimistic", image: resolveImage("The Sun") },
  { id: 20, name: "Judgement", arcana: "major", emoji: "📯", keywords: ["rebirth", "calling", "absolution"], upright: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, refusal of self-examination", image: resolveImage("Judgement") },
  { id: 21, name: "The World", arcana: "major", emoji: "🌍", keywords: ["completion", "achievement", "travel"], upright: "Completion, integration, accomplishment", reversed: "Lack of completion, stagnation", image: resolveImage("The World") },
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
      const name = `${rank.label} of ${suit.name.charAt(0).toUpperCase() + suit.name.slice(1)}`;
      cards.push({
        id: id++,
        name,
        arcana: "minor",
        suit: suit.name,
        number: rank.n,
        emoji: suit.emoji,
        keywords: rank.kw,
        upright: rank.up.replace("{theme}", suit.theme),
        reversed: rank.rev,
        image: resolveImage(name),
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
