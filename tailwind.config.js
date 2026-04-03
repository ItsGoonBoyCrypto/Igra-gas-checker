/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        igra: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        kas: {
          cyan: "#00d4ff",
          teal: "#00b4cc",
          dark: "#0a1628",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Space Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        glow: {
          from: { boxShadow: "0 0 5px #00d4ff33, 0 0 10px #00d4ff22" },
          to:   { boxShadow: "0 0 15px #00d4ff66, 0 0 30px #00d4ff33" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
        "igra-gradient": "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #091420 100%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};
