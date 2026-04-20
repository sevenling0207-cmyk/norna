"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.children.length > 0) return;

    // Regular stars
    for (let i = 0; i < 160; i++) {
      const star = document.createElement("div");
      const size = Math.random() < 0.1 ? 2 + Math.random() * 2 : 1 + Math.random() * 1.5;
      star.className = `star${size > 3 ? " star--large" : ""}`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${2 + Math.random() * 5}s`);
      star.style.setProperty("--delay", `${Math.random() * 4}s`);
      star.style.width = star.style.height = `${size}px`;
      el.appendChild(star);
    }

    // Shooting stars
    for (let i = 0; i < 3; i++) {
      const shoot = document.createElement("div");
      shoot.className = "shooting-star";
      shoot.style.left = `${Math.random() * 60}%`;
      shoot.style.top = `${Math.random() * 40}%`;
      shoot.style.setProperty("--shoot-duration", `${4 + Math.random() * 4}s`);
      shoot.style.setProperty("--shoot-delay", `${i * 5 + Math.random() * 5}s`);
      el.appendChild(shoot);
    }
  }, []);

  return <div ref={ref} className="starfield" aria-hidden="true" />;
}
