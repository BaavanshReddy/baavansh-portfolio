import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        surface: "#141417",
        line: "#2A2A2F",
        paper: "#F2F2EE",
        muted: "#8C8C86",
        lime: "#CCFF00",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
