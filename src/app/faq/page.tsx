import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Norna Tarot Readings",
  description: "Frequently asked questions about Norna's AI-powered tarot readings. Learn how it works, your privacy, payments, and more.",
};

const faqs = [
  {
    q: "What is tarot?",
    a: "Tarot is a centuries-old practice of using a deck of 78 symbolic cards to gain insight into life's questions. Each card carries rich archetypal imagery that speaks to different aspects of the human experience — from love and career to personal growth and spiritual development.",
  },
  {
    q: "How does AI interpret the cards?",
    a: "Our AI has been trained on extensive tarot scholarship, symbolism, and interpretive traditions. When you draw cards, the AI considers each card's meaning, its position in the spread, whether it's reversed, and your specific question to generate a personalized, nuanced reading — much like a skilled human reader would.",
  },
  {
    q: "Is this real fortune-telling?",
    a: "Norna is designed for entertainment and personal reflection. Tarot readings can be a powerful tool for self-discovery and introspection, but they should not replace professional advice for medical, legal, or financial decisions. Think of it as a mirror for your thoughts, not a crystal ball.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We don't store your questions or reading results on our servers after your session ends. We don't require sign-up for free readings, and we never share personal information with third parties. Your spiritual journey is yours alone.",
  },
  {
    q: "What's included in a free reading?",
    a: "Free readings include the card draw experience and a concise interpretation covering the key themes and messages of your spread. Premium readings unlock deeper analysis, card relationship insights, actionable guidance, and timing predictions.",
  },
  {
    q: "How do payments work?",
    a: "Premium readings are one-time purchases — no subscriptions, no hidden fees. You pay once and receive instant access to your full reading. Payments are processed securely through Stripe.",
  },
  {
    q: "Can I get a refund?",
    a: "Since readings are delivered instantly as digital content, we generally cannot offer refunds. However, if you experience a technical issue that prevents you from receiving your reading, please contact us and we'll make it right.",
  },
  {
    q: "How often should I do a reading?",
    a: "There's no hard rule! Many people enjoy a daily single-card pull for reflection. For deeper spreads like the Celtic Cross, we recommend waiting at least a few weeks between readings on the same topic to allow the energy to shift.",
  },
];

export default function FaqPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,20,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-gold-gradient font-bold">NORNA</Link>
          <Link href="/" className="text-[#9ca3af] text-sm hover:text-white transition-colors">← Home</Link>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[#9ca3af] text-base sm:text-lg">Everything you need to know about Norna</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto mt-6" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group glass-card overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h2 className="font-display text-white text-base sm:text-lg font-medium pr-4">{faq.q}</h2>
                  <span className="text-[#d4a853]/50 text-xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-[#9ca3af] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-[#9ca3af] mb-6">Still have questions?</p>
            <Link href="/reading" className="btn-gold inline-block px-10 py-4 text-base font-semibold tracking-wide">
              Try a Free Reading →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[rgba(255,255,255,0.04)] py-8 text-center">
        <p className="text-[#9ca3af]/40 text-xs">© 2026 Norna. For entertainment purposes only.</p>
      </footer>
    </>
  );
}
