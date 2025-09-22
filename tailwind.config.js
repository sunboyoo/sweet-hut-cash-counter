/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1f6b3b",
          dark: "#14502a",
          light: "#4a9b68",
        },
        accent: {
          DEFAULT: "#ffb545",
          dark: "#d68a1e",
        },
        surface: {
          DEFAULT: "#f6fbf4",
          dark: "#1b1b1f",
        },
      },
      boxShadow: {
        card: "0 12px 24px -12px rgba(18, 145, 89, 0.45)",
      },
      keyframes: {
        pulseScale: {
          "0%": { transform: "scale(0.97)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        countUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-scale": "pulseScale 180ms ease-out",
        "count-up": "countUp 260ms ease-out",
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
