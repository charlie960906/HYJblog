"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const renderIcon = () => {
    if (theme === "light") return <Sun className="w-5 h-5 text-amber-500" />;
    if (theme === "dark") return <Moon className="w-5 h-5 text-neutral-100" />;
    return <Monitor className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
      aria-label="切換主題"
      title={theme === "light" ? "切換為深色" : theme === "dark" ? "切換為系統預設" : "切換為淺色"}
    >
      {renderIcon()}
    </button>
  );
}