import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
      <button onClick={toggleTheme} aria-label="Changer de thème">
        {isDark ? "☀️" : "🌙"}
      </button>
  );
}
