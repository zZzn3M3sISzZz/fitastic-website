import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        ink: "var(--color-ink)",
        lime: {
          DEFAULT: "var(--color-lime)",
          bright: "var(--color-lime-bright)",
        },
        navy: "var(--color-navy)",
        muted: "var(--color-muted)",
        soft: "var(--color-soft)",
        surface: "var(--color-surface)",
        line: "var(--color-line)",
        dot: "var(--color-dot)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1440px",
      },
      spacing: {
        gutter: "var(--space-gutter)",
      },
      transitionDuration: {
        tap: "180ms",
      },
    },
  },
  plugins: [],
};

export default config;
