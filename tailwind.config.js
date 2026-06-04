/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#090b10",
        panel: "#101620",
        accent: "#00d4ff",
        mint: "#34d399",
        coral: "#fb7185",
        amber: "#f59e0b"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 38px rgba(0, 212, 255, 0.18)"
      }
    }
  },
  plugins: []
};
