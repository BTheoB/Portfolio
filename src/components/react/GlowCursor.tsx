import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        /*rgba(194, 122, 255, 0.35) correspond au purple-400 de tailwinds*/
        background:
          "var(--cursor-glow)",
        filter: "blur(80px)",
      }}
    />
  );
}