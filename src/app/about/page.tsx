import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Norna — The Wisdom of the Norse Fates",
  description: "Discover the story behind Norna: ancient Norse mythology meets modern AI to deliver personalized tarot readings guided by the three fates.",
};

export default function AboutPage() {
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
              The Story of <span className="text-gold-gradient">Norna</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent mx-auto" />
          </div>

          {/* Norse Mythology */}
          <section className="mb-16">
            <div className="glass-card p-8 sm:p-10 mb-8">
              <h2 className="font-display text-2xl font-semibold text-white mb-6">The Three Norns</h2>
              <p className="text-[#9ca3af] leading-relaxed mb-4">
                In the heart of Norse cosmology, beneath the great world tree Yggdrasil, sit three powerful beings known as the Norns. They are the weavers of fate — shaping the destiny of gods and mortals alike.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                {[
                  { name: "Urd", domain: "The Past", desc: "She who sees what was. Urd understands the roots of every story — the experiences that shaped you." },
                  { name: "Verdandi", domain: "The Present", desc: "She who sees what is. Verdandi reads the energy of the current moment with crystalline clarity." },
                  { name: "Skuld", domain: "The Future", desc: "She who sees what shall be. Skuld glimpses the threads of possibility that stretch before you." },
                ].map((norn) => (
                  <div key={norn.name} className="text-center p-4 rounded-xl border border-[rgba(212,168,83,0.1)] bg-[rgba(255,255,255,0.02)]">
                    <h3 className="font-display text-[#f0d48a] text-lg font-semibold mb-1">{norn.name}</h3>
                    <p className="text-[#d4a853]/50 text-xs tracking-widest uppercase mb-3">{norn.domain}</p>
                    <p className="text-[#9ca3af] text-sm leading-relaxed">{norn.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#9ca3af] leading-relaxed">
                Every day, the Norns draw water from the Well of Urd and pour it over Yggdrasil&apos;s roots, nourishing the tree that connects all nine worlds. Their wisdom is eternal, their sight unclouded.
              </p>
            </div>
          </section>

          {/* Modern AI */}
          <section className="mb-16">
            <div className="glass-card p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-white mb-6">Ancient Wisdom, Modern Technology</h2>
              <p className="text-[#9ca3af] leading-relaxed mb-4">
                Norna bridges millennia of divinatory tradition with cutting-edge artificial intelligence. Our system draws from the rich symbolism of the 78-card tarot deck, interpreted through the lens of Norse runic wisdom.
              </p>
              <p className="text-[#9ca3af] leading-relaxed mb-4">
                Each reading is unique — generated in real-time based on your question, the cards drawn, and their positions. We don&apos;t use templates or pre-written responses. Every word is crafted specifically for your situation.
              </p>
              <p className="text-[#9ca3af] leading-relaxed">
                Whether you&apos;re seeking clarity in love, guidance in your career, or simply a moment of reflection, the Norns are here to illuminate your path.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link href="/reading" className="btn-gold inline-block px-10 py-4 text-base font-semibold tracking-wide">
              Begin Your Reading →
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
