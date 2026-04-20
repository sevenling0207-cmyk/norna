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
          deep: "#1a0a2e",
          purple: "#2d1b4e",
          gold: "#c9a84c",
          "gold-light": "#e0c872",
          star: "#f0e6d3",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "flip": "flip 0.8s ease-in-out",
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
