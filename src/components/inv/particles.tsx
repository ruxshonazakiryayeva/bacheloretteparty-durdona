import { useMemo } from "react";
import { useHydrated } from "./use-reveal";

type Bit = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  hue: number;
  opacity: number;
};

function makeBits(count: number, seed: number): Bit[] {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    left: rnd() * 100,
    size: 6 + rnd() * 16,
    duration: 14 + rnd() * 18,
    delay: -rnd() * 28,
    hue: rnd(),
    opacity: 0.35 + rnd() * 0.5,
  }));
}

/** Floating petals + golden sparkle particles drifting over the page. */
export function Particles({ petals = 14, sparkles = 18 }: { petals?: number; sparkles?: number }) {
  const hydrated = useHydrated();
  const petalBits = useMemo(() => makeBits(petals, 7), [petals]);
  const sparkBits = useMemo(() => makeBits(sparkles, 91), [sparkles]);

  if (!hydrated) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petalBits.map((p, i) => (
        <span
          key={`p${i}`}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.72,
            opacity: p.opacity,
            borderRadius: "60% 10% 60% 10%",
            background:
              p.hue > 0.5
                ? "linear-gradient(140deg, oklch(0.93 0.04 12), oklch(0.85 0.07 8))"
                : "linear-gradient(140deg, oklch(0.97 0.02 60), oklch(0.89 0.05 24))",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      {sparkBits.map((p, i) => (
        <span
          key={`s${i}`}
          className="absolute block rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `-${5 + p.hue * 20}%`,
            width: Math.max(2, p.size * 0.3),
            height: Math.max(2, p.size * 0.3),
            background: "oklch(0.9 0.08 85)",
            boxShadow: "0 0 8px oklch(0.88 0.09 85 / 0.9)",
            animation: `sparkle-drift ${p.duration + 6}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Burst of sparkles used when the intro doors open. */
export function SparkleBurst({ active }: { active: boolean }) {
  const bits = useMemo(() => makeBits(26, 313), []);
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden="true">
      {bits.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${20 + p.hue * 60}%`,
            width: Math.max(3, p.size * 0.35),
            height: Math.max(3, p.size * 0.35),
            background: "oklch(0.93 0.08 85)",
            boxShadow: "0 0 12px oklch(0.9 0.1 85 / 0.95)",
            animation: `sparkle-drift ${2.2 + p.hue * 2}s ease-out ${p.hue * 0.6}s 1 forwards`,
          }}
        />
      ))}
    </div>
  );
}
