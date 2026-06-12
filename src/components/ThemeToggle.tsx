"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeOption = "light" | "dark" | "system";

const THEME_CYCLE: ThemeOption[] = ["system", "light", "dark"];
const WAVE_DURATION = 1200;
const LIGHT_COLOR = "#fffaf0";
const DARK_COLOR = "#0A0A0A";

const THEME_LABELS: Record<ThemeOption, string> = {
  system: "跟隨系統",
  light: "淺色主題",
  dark: "深色主題",
};

function ThemeIcon({ theme }: { theme: ThemeOption }) {
  if (theme === "dark") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 0010.586 10.586z" />
      </svg>
    );
  }

  if (theme === "light") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm8 6a1 1 0 011-1v1a1 1 0 11-2 0v-1a1 1 0 011 1zM15.78 4.22a1 1 0 010 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7a1 1 0 011.42 0zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zM5 10a5 5 0 109.9 1H14a4 4 0 11-8 0H5z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804 3.211A1 1 0 0113 20H7a1 1 0 01-.97-1.278l.804-3.211L7.22 15H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h2.5a1 1 0 01.948.684l.406 1.622L13 16.118l.146-.812A1 1 0 0114.5 14H17a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
    </svg>
  );
}

function getResolvedThemeColor(themeName: ThemeOption) {
  if (themeName === "dark") return DARK_COLOR;
  if (themeName === "light") return LIGHT_COLOR;

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? DARK_COLOR : LIGHT_COLOR;
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-sm bg-neutral-100 dark:bg-neutral-900 shrink-0" aria-hidden tabIndex={-1} />
    );
  }

  const currentTheme: ThemeOption = THEME_CYCLE.includes(theme as ThemeOption) ? (theme as ThemeOption) : "system";
  const currentIndex = THEME_CYCLE.indexOf(currentTheme);
  const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length]!;

  const handleThemeClick = () => {
    setTheme(nextTheme);
  };

  return (
    <button
      aria-label={`切換主題，目前為${THEME_LABELS[currentTheme]}`}
      onClick={handleThemeClick}
      className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 border border-transparent dark:border-neutral-800 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
      title={`${THEME_LABELS[currentTheme]}，點擊切換`}
    >
      <ThemeIcon theme={currentTheme} />
    </button>
  );
}
