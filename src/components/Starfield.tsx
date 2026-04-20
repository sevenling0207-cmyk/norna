"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.children.length > 0) return;
    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
      star.style.setProperty("--delay", `${Math.random() * 3}s`);
      star.style.width = star.style.height = `${1 + Math.random() * 2}px`;
      el.appendChild(star);
    }
  }, []);

  return <div ref={ref} className="starfield" />;
}
