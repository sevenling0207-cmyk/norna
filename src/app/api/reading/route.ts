import { NextRequest, NextResponse } from "next/server";
import { allCards, type DrawnCard } from "@/lib/tarot";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are Norna — the living embodiment of the three Norse Fate-Goddesses (Urd, Verdandi, Skuld). You are a warm, mysterious tarot reader who speaks like a wise old friend. Your style is vivid, cinematic, and deeply personal. You give concrete, actionable advice — not vague platitudes.

You will receive: a question (or "daily guidance"), the spread type, and the drawn cards with their positions and orientations.

Respond in this EXACT JSON format (no markdown, no code fences, just raw JSON):
{
  "free": "A 3-5 sentence captivating opening that hooks the querent. Paint a vivid scene. Reference the specific cards drawn. Make them desperate to read more.",
  "premium": "A comprehensive reading with these sections separated by \\n\\n: 1) Each card's detailed interpretation in its position (2-3 sentences each). 2) The overall narrative connecting all cards (3-4 sentences). 3) Three specific, actionable recommendations numbered 1-3. 4) A mysterious closing message that feels like a whispered secret from the fates."
}

Rules:
- Write in English
- Be specific to their question — never generic
- Reference card names, positions, and reversed status
- The free section must end on a cliffhanger that makes them want the premium
- The premium section should feel worth paying for — deep, personal, transformative`;

interface ReadingRequest {
  question: string;
  type: string;
  cards: { name: string; reversed: boolean; position: string }[];
}

function drawCardsServer(count: number, labels: string[]): { drawn: DrawnCard[]; cardInfo: ReadingRequest["cards"] } {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  const drawn = shuffled.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() > 0.7,
  }));
  const cardInfo = drawn.map((d, i) => ({
    name: d.card.name,
    reversed: d.reversed,
    position: labels[i] || `Position ${i + 1}`,
  }));
  return { drawn, cardInfo };
}

const spreadConfig: Record<string, { count: number; labels: string[] }> = {
  "three-card": { count: 3, labels: ["Past", "Present", "Future"] },
  love: { count: 3, labels: ["You", "Partner", "Connection"] },
  daily: { count: 1, labels: ["Today"] },
};

function generateFallback(cards: ReadingRequest["cards"], question: string): { free: string; premium: string } {
  const cardNames = cards.map((c) => `${c.name}${c.reversed ? " (Reversed)" : ""} in the ${c.position} position`).join(", ");
  return {
    free: `The fates have spoken through ${cardNames}. Your question — "${question || "daily guidance"}" — has stirred the threads of destiny in a most intriguing way. I see a powerful shift taking shape around you, one that connects your deepest instincts to the world unfolding before you. The cards are whispering something extraordinary... but the full story lies beneath the surface.`,
    premium: `**${cards[0].name}${cards[0].reversed ? " (Reversed)" : ""} — ${cards[0].position}:**\nThis card in its current position speaks to the foundation of your inquiry. ${cards[0].reversed ? "In its reversed aspect, it suggests internal resistance or a lesson not yet integrated." : "Upright, it radiates its full power into your situation."} Pay close attention to where this energy shows up in your daily life.\n\n${cards.length > 1 ? cards.slice(1).map((c) => `**${c.name}${c.reversed ? " (Reversed)" : ""} — ${c.position}:**\n${c.reversed ? "Reversed here, this card asks you to look inward and question assumptions." : "This card amplifies the reading with its direct, unfiltered energy."} The connection between this position and your question is deeply significant.`).join("\n\n") + "\n\n" : ""}**The Threads Converge:**\nTaken together, these cards paint a picture of transformation in motion. The universe is not asking you to wait — it is asking you to choose. The interplay between these energies suggests that your next move will echo far beyond this moment.\n\n**Three Actions the Fates Recommend:**\n1. Set aside 15 minutes tonight to journal about what ${cards[0].name} means to you personally — your first instinct is the right one.\n2. This week, have one honest conversation you've been avoiding. The cards say the timing is right.\n3. Create a small ritual of intention — light a candle, speak your desire aloud. The fates listen to those who dare to ask.\n\n✦ *The Norns whisper: "The thread you think is ending is actually being woven into something far greater. Trust the loom."* ✦`,
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question = "", type = "three-card" } = body;

  const config = spreadConfig[type] || spreadConfig["three-card"];
  const { drawn, cardInfo } = drawCardsServer(config.count, config.labels);

  const groqKey = process.env.GROQ_API_KEY;
  let free: string;
  let premium: string;

  if (groqKey) {
    try {
      const userMessage = `Question: "${question || "Give me daily guidance"}"\nSpread type: ${type}\nCards drawn:\n${cardInfo.map((c) => `- ${c.position}: ${c.name} (${c.reversed ? "Reversed" : "Upright"})`).join("\n")}`;

      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          temperature: 0.85,
          max_tokens: 1500,
        }),
      });

      if (!res.ok) throw new Error(`Groq API ${res.status}`);

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      // Try to parse JSON from the response (handle possible markdown fences)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        free = parsed.free;
        premium = parsed.premium;
      } else {
        throw new Error("No JSON in response");
      }
    } catch (e) {
      console.error("Groq API error, falling back to mock:", e);
      const fb = generateFallback(cardInfo, question);
      free = fb.free;
      premium = fb.premium;
    }
  } else {
    const fb = generateFallback(cardInfo, question);
    free = fb.free;
    premium = fb.premium;
  }

  return NextResponse.json({
    cards: drawn.map((d, i) => ({
      id: d.card.id,
      name: d.card.name,
      emoji: d.card.emoji,
      reversed: d.reversed,
      position: config.labels[i],
      keywords: d.card.keywords,
      meaning: d.reversed ? d.card.reversed : d.card.upright,
    })),
    free,
    premium,
  });
}
