import { useReveal } from "./use-reveal";

/** Uzbek paisley (bodom) motif — used as a small accent. */
export function Paisley({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 4c11 3 18 11 18 21 0 11-8 19-18 19S6 36 6 25C6 16 13 9 22 9c6 0 10 4 10 9s-4 9-9 9c-3 0-6-2-6-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="27" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** Self-drawing suzani-style floral divider. */
export function SuzaniDivider({ className = "" }: { className?: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <svg
        viewBox="0 0 360 44"
        className={`draw w-full max-w-[360px] text-rosegold ${inView ? "in" : ""}`}
        fill="none"
        aria-hidden="true"
        style={{ ["--len" as string]: "420" }}
      >
        <line x1="4" y1="22" x2="128" y2="22" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
        <line x1="232" y1="22" x2="356" y2="22" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
        <path
          d="M128 22c14-16 26-16 30 0 4 16 16 16 22 0 6-16 18-16 22 0 4 16 16 16 30 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{ ["--len" as string]: "220", transitionDelay: "200ms" }}
        />
        <path
          d="M158 22c0 10 8 14 22 14s22-4 22-14"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.65"
          style={{ ["--len" as string]: "90", transitionDelay: "500ms" }}
        />
        <circle
          cx="180"
          cy="14"
          r="4.5"
          stroke="currentColor"
          strokeWidth="1.1"
          style={{ ["--len" as string]: "30", transitionDelay: "800ms" }}
        />
      </svg>
    </div>
  );
}

/** Thin suzani-embroidery corner accent. */
export function CornerFloral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 46c0-24 20-44 44-44M10 46c0-20 16-36 36-36"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M18 40c6-8 14-10 18-4 4 6 0 12-6 12s-8-6-4-10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="46" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="52" r="1.6" fill="currentColor" opacity="0.5" />
      <path d="M30 20c3 4 8 5 12 3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/** Thin ornamental frame drawn around a block of content. */
export function OrnateFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-[2px] border border-rosegold/25" />
      <div className="pointer-events-none absolute inset-[6px] rounded-[2px] border border-champagne/40" />
      <CornerFloral className="pointer-events-none absolute -left-1 -top-1 h-10 w-10 text-rosegold/70" />
      <CornerFloral className="pointer-events-none absolute -right-1 -top-1 h-10 w-10 -scale-x-100 text-rosegold/70" />
      <CornerFloral className="pointer-events-none absolute -bottom-1 -left-1 h-10 w-10 -scale-y-100 text-rosegold/70" />
      <CornerFloral className="pointer-events-none absolute -bottom-1 -right-1 h-10 w-10 -scale-100 text-rosegold/70" />
      {children}
    </div>
  );
}

/** Word/letter-by-letter reveal for key headings. */
export function LetterReveal({
  text,
  className = "",
  delay = 0,
  step = 45,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, inView } = useReveal<HTMLSpanElement>(0.3);
  return (
    <span ref={ref} className={`${inView ? "in" : ""} ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="ltr"
          aria-hidden="true"
          style={{ transitionDelay: `${delay + i * step}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
