"use client";

import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border
                 flex items-center justify-center
                 border-gray-300 dark:border-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
