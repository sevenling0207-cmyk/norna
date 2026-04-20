import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Your Reading — Norna",
  description: "Select from our tarot reading types: Three-Card Spread, Love Reading, Daily Horoscope, or Celtic Cross.",
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
