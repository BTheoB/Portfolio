import type { ReactNode } from "react";

interface BorderStyleProps {
  children: ReactNode;
}

export default function BorderStyle({ children }: BorderStyleProps) {
  return (
    <div className="relative w-fit mx-auto px-6 py-1 mb-2">
      <span
        className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent"
        aria-hidden="true"
      />
      <h2 className="text-text-primary text-center text-title-size font-bold italic">
        {children}
      </h2>
    </div>
  );
}