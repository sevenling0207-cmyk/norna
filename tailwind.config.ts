import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          deep: "#0f0c29",
          "deep-mid": "#1a0a2e",
          "deep-end": "#302b63",
          purple: "#6b4c9a",
          "purple-dark": "#2d1b4e",
          gold: "#c9a84c",
          "gold-light": "#e0c872",
          "gold-dark": "#a88a3a",
          star: "#f0e6d3",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-slow": "twinkle 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-delay": "fadeIn 1s ease-out 0.3s forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-up-delay": "slideUp 0.6s ease-out 0.2s forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.05)" },
          "50%": { boxShadow: "0 0 30px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "mystic-gradient": "linear-gradient(135deg, #0f0c29 0%, #1a0a2e 50%, #302b63 100%)",
        "gold-gradient": "linear-gradient(135deg, #c9a84c 0%, #e0c872 50%, #c9a84c 100%)",
        "gold-text": "linear-gradient(90deg, #c9a84c, #e0c872, #c9a84c)",
      },
    },
  },
  plugins: [],
};
export default config;
