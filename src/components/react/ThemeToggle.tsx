import { useState, useEffect } from "react";
import BorderStyle from "./BorderStyle";

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
    <div className="flex items-center gap-2">
      <BorderStyle>
        <button
          onClick={toggleTheme}
          aria-label="Changer de thème"
          className=" text-text-primary text-corps-size"
        >
          {isDark ? "Mode Clair" : "Mode Sombre "}
        </button>
      </BorderStyle>
    </div>
  );
}
