/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        zoomIn: "zoomIn 0.6s ease-out forwards",
        spinSlow: "spinSlow 20s linear infinite",
        typing: "typing 2s steps(30, end) forwards",
        blink: "blink 0.7s step-end infinite",
      },
    },
  },
  plugins: [],
};
