"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

const sunPath = "M12 18a6 6 0 100-12 6 6 0 000 12z";
const moonPath = "M14.5 12a5.5 5.5 0 11-10.56 3.29 4.5 4.5 0 006.77-6.77A5.48 5.48 0 0114.5 12z";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const iconPathRef = useRef<SVGPathElement | null>(null);
  const raysRef = useRef<SVGGElement | null>(null);
  const prevIsLight = useRef<boolean>(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = (resolvedTheme || theme) === "light";

  useEffect(() => {
    if (!mounted || !iconPathRef.current || !raysRef.current) return;

    const currentPath = isLight ? sunPath : moonPath;
    const previousPath = prevIsLight.current ? sunPath : moonPath;

    animate(iconPathRef.current, {
      d: [previousPath, currentPath],
      duration: 450,
      easing: "easeInOutQuad",
    });

    animate(raysRef.current, {
      opacity: isLight ? [0, 1] : [1, 0],
      scale: isLight ? [0.9, 1] : [1, 0.8],
      duration: 360,
      easing: "easeInOutQuad",
      transformOrigin: "50% 50%",
    });

    prevIsLight.current = isLight;
  }, [isLight, mounted]);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
      aria-label="切換主題"
      title={theme === "light" ? "切換為深色" : theme === "dark" ? "切換為系統預設" : "切換為淺色"}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500 dark:text-neutral-100" aria-hidden="true">
        <path ref={iconPathRef} d={isLight ? sunPath : moonPath} fill="currentColor" />
        <g ref={raysRef} className="origin-center" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22.5" />
          <line x1="4.5" y1="12" x2="7.5" y2="12" />
          <line x1="16.5" y1="12" x2="19.5" y2="12" />
          <line x1="5.64" y1="5.64" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="18.36" y2="18.36" />
          <line x1="5.64" y1="18.36" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="18.36" y2="5.64" />
        </g>
      </svg>
    </button>
  );
}