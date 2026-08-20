import type { Config } from "tailwindcss";

/**
 * Palette notes — every text tone here is measured against the page
 * background (#05050a) and the card surface (#0c0c14):
 *
 *   paper  16.7:1   body copy, headings
 *   muted   8.5:1   secondary copy — passes WCAG AA at any size
 *   faint   5.5:1   micro-labels and metadata only
 *   lime   17.3:1   accents, CTAs
 *   cyan   13.2:1   secondary accent
 *   violet  3.6:1   DECORATIVE ONLY (glows, gradients) — never text
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        surface: "#0c0c14",
        "surface-2": "#12121c",
        "surface-3": "#1a1a28",
        line: "#23233a",
        "line-strong": "#32324e",
        paper: "#e8e8ef",
        muted: "#a5a5c0",
        faint: "#82829e",
        lime: "#CCFF00",
        "lime-dim": "#9fc700",
        cyan: "#00e5ff",
        violet: "#7c3aed",
        "violet-light": "#a78bfa",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      maxWidth: {
        site: "1180px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
