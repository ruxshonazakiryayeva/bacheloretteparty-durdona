import { useEffect, useState } from "react";

const TARGET = new Date("2027-07-27T19:00:00+05:00").getTime();

type Parts = { kun: number; soat: number; daqiqa: number; soniya: number };

function diff(): Parts {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    kun: Math.floor(ms / 86400000),
    soat: Math.floor(ms / 3600000) % 24,
    daqiqa: Math.floor(ms / 60000) % 60,
    soniya: Math.floor(ms / 1000) % 60,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[68px] w-[62px] items-center justify-center overflow-hidden rounded-sm border border-rosegold/25 bg-ivory/70 shadow-[0_6px_24px_-12px_oklch(0.5_0.06_15/0.5)] backdrop-blur-sm sm:h-[86px] sm:w-[78px]"
        style={{ perspective: "400px" }}
      >
        <span
          key={value}
          className="tick font-display text-3xl font-light tabular-nums text-rosegold sm:text-4xl"
        >
          {String(value).padStart(2, "0")}
        </span>
        <span className="pointer-events-none absolute inset-x-2 top-1/2 h-px bg-champagne/40" />
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-inksoft sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff());
    const id = setInterval(() => setParts(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts ?? { kun: 0, soat: 0, daqiqa: 0, soniya: 0 };

  return (
    <div
      className="flex items-start justify-center gap-2.5 sm:gap-4"
      style={{ visibility: parts ? "visible" : "hidden" }}
    >
      <Cell value={p.kun} label="kun" />
      <Cell value={p.soat} label="soat" />
      <Cell value={p.daqiqa} label="daqiqa" />
      <Cell value={p.soniya} label="soniya" />
    </div>
  );
}
