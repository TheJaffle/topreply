import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f5f0",
        ink: "#1f2937",
        muted: "#6b7280",
        stroke: "#d6d3d1",
        accent: "#1d4ed8"
      },
      boxShadow: {
        panel: "0 18px 45px -28px rgba(15, 23, 42, 0.24)"
      },
      fontFamily: {
        sans: ["Aptos", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
