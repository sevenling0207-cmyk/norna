import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{background:'radial-gradient(ellipse at 50% 40%, #1a1040 0%, #0a0a14 60%)'}}>
      <div className="mb-8">
        <span className="font-display text-8xl sm:text-9xl font-bold text-gold-gradient">404</span>
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-4">
        The cards don&apos;t show this path
      </h1>
      <p className="text-[#9ca3af] text-sm sm:text-base mb-10 max-w-md">
        The page you&apos;re seeking has vanished into the mist. Perhaps the Norns have a different journey in mind for you.
      </p>
      <Link href="/" className="btn-gold inline-block px-8 py-3.5 text-sm font-semibold tracking-wide">
        Return Home →
      </Link>
    </main>
  );
}
