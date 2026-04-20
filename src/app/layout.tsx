import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Norna — Ancient Wisdom, Modern Insight",
  description: "AI-powered tarot readings guided by the wisdom of the Norse Norns. Discover what the stars have in store for you.",
  manifest: "/manifest.json",
  icons: { apple: "/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#1a0a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js')`}} />
      </body>
    </html>
  );
}
