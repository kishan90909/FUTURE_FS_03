/** @type {import('tailwindcss').Config} */
module.exports = {
  // ✅ REQUIRED for dark mode toggle
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/context/**/*.{js,jsx}",
    "./src/data/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        // 🎯 ORIGINAL E-COMMERCE BRAND COLORS
        brandDark: "#111827",   // dark slate (text, buttons)
        brandLight: "#f9fafb",  // light background
        brandGray: "#6b7280",   // muted text
        brandAccent: "#2563eb", // blue accent (CTA, focus)
      },

      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },

  plugins: [],
};
