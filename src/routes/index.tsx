import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import heroFlorals from "@/assets/hero-florals.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import songUrl from "@/assets/song.mp3";

import { Countdown } from "@/components/inv/countdown";
import { Particles, SparkleBurst } from "@/components/inv/particles";
import { RsvpForm } from "@/components/inv/rsvp-form";
import {
  CornerFloral,
  LetterReveal,
  OrnateFrame,
  Paisley,
  SuzaniDivider,
} from "@/components/inv/ornaments";
import { useReveal } from "@/components/inv/use-reveal";
import { LangContext, useLang, translations, type Lang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Music, VolumeX } from "lucide-react";

const INVITATION_KEY = "qizlar_bazmi_durdona";
const ADMIN_PASSWORD = "1317";
const MAIN_SITE_URL = "https://webinvite-six.vercel.app/";

const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/CgkjvrXqwyWhgLmMwwOhV0pCido2/social-images/social-1784697237501-webinvitesaytyuzi.webp";

const TITLE = "Durdonaxon & Toxirbek — Qizlar bazmi | 27-iyul 2027";
const DESC =
  "Durdonaxon va Toxirbekning qizlar bazmiga taklifnoma. 27-iyul 2027, \"Registon\" to'yxonasi, Guliston shahar, 3-mavze.";
const MAP_LINK = "https://maps.app.goo.gl/K9UPWoamN57arWhb7";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Invitation,
});

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
  wipe = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  wipe?: boolean;
}) {
  // The observer must watch an unclipped wrapper: `clip-path` on the observed
  // element itself collapses its intersection rect and the reveal never fires.
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  return (
    <div ref={ref} className={className}>
      <div
        className={`rv h-full ${wipe ? "rv-x" : ""} ${inView ? "in" : ""}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

function TiltCard({
  children,
  className = "",
  strength = 8,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-6px) scale(1.02)`;
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tiltable ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[10px] uppercase tracking-[0.45em] text-rosegold/80 sm:text-[11px]">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* intro: 3D doors                                                     */
/* ------------------------------------------------------------------ */

function IntroDoors({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const { t } = useLang();
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[1400ms] ${
        open ? "pointer-events-none opacity-0 delay-[900ms]" : "opacity-100"
      }`}
      style={{ perspective: "1600px" }}
      aria-hidden={open}
    >
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className="absolute top-0 h-full w-1/2 ikat-bg bg-cream shadow-[0_0_60px_-10px_oklch(0.5_0.06_15/0.5)]"
          style={{
            [side]: 0,
            transformOrigin: side === "left" ? "left center" : "right center",
            transform: open ? `rotateY(${side === "left" ? "" : "-"}102deg)` : "rotateY(0deg)",
            transition: "transform 1500ms cubic-bezier(0.66, 0, 0.2, 1)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className={`absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-rosegold/50 to-transparent ${
              side === "left" ? "right-0" : "left-0"
            }`}
          />
          <CornerFloral
            className={`absolute h-24 w-24 text-rosegold/50 ${
              side === "left" ? "left-3 top-3" : "right-3 top-3 -scale-x-100"
            }`}
          />
          <CornerFloral
            className={`absolute h-24 w-24 text-rosegold/50 ${
              side === "left" ? "bottom-3 left-3 -scale-y-100" : "bottom-3 right-3 -scale-100"
            }`}
          />
        </div>
      ))}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-all duration-700 ${
          open ? "scale-90 opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-display text-xs uppercase tracking-[0.5em] text-rosegold/80">{t.introBadge}</p>
        <h1 className="mt-4 font-script text-[2.1rem] leading-tight text-ink sm:text-5xl">
          Durdonaxon
          <span className="mx-2 font-display font-light text-rosegold">&</span>
          Toxirbek
        </h1>
        <SuzaniDivider className="mt-5 w-56 sm:w-72" />

        <button
          type="button"
          onClick={onOpen}
          className="group relative mt-9 flex h-28 w-28 items-center justify-center rounded-full"
          aria-label="Taklifnomani ochish"
        >
          <span
            className="absolute inset-0 rounded-full border border-rosegold/40"
            style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-champagne/50"
            style={{ animation: "pulse-ring 2.6s ease-out 1.3s infinite" }}
          />
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush via-cream to-champagne/70 shadow-[0_14px_40px_-16px_oklch(0.5_0.08_15/0.8)] transition-transform duration-500 group-hover:scale-105">
            <Paisley className="text-rosegold" size={34} />
          </span>
        </button>

        <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-inksoft">{t.introOpen}</p>
      </div>

      <SparkleBurst active={open} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  const { t } = useLang();
  const floralRef = useRef<HTMLDivElement>(null);
  const ikatRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > window.innerHeight * 1.4) return;
        if (ikatRef.current) ikatRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        if (floralRef.current)
          floralRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(${1 + y * 0.00012})`;
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 620));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-20 pt-24">
      <div ref={ikatRef} className="ikat-bg absolute inset-0 -z-20 opacity-[0.16]" />
      <div
        ref={floralRef}
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${heroFlorals})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/25 via-ivory/45 to-ivory" />

      <div ref={contentRef} className="relative mx-auto w-full max-w-xl text-center">
        <p className="font-display text-[11px] uppercase tracking-[0.5em] text-rosegold">{t.badge}</p>

        <h1 className="mt-6 font-script text-[2.6rem] leading-[1.05] text-ink sm:text-[4rem]">
          <LetterReveal text="Durdonaxon" step={55} />
          <span className="my-1 block font-display text-2xl font-light italic text-rosegold sm:text-3xl">&</span>
          <LetterReveal text="Toxirbek" delay={500} step={55} />
        </h1>

        <SuzaniDivider className="mt-7" />

        <Reveal delay={200} className="mt-7">
          <p className="font-display text-xl tracking-[0.3em] text-ink sm:text-2xl">{t.dateLine}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.32em] text-inksoft">
            {t.venueLine}
          </p>
        </Reveal>

        <Reveal delay={420} className="mt-10">
          <Countdown />
        </Reveal>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <div className="float-slow flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.35em] text-rosegold/70">{t.scrollDown}</span>
          <span className="h-10 w-px bg-gradient-to-b from-rosegold/60 to-transparent" />
        </div>
      </div>
    </header>
  );
}

function InvitationText() {
  const { t } = useLang();
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionLabel>{t.invLabel}</SectionLabel>
        </Reveal>
        <Reveal delay={150} className="mt-8">
          <OrnateFrame className="bg-ivory/70 px-6 py-12 backdrop-blur-sm sm:px-12">
            <p className="text-center font-display text-2xl italic text-rosegold sm:text-3xl">
              {t.invGreeting}
            </p>
            <div className="mt-7 space-y-5 text-center text-[15px] leading-[1.95] text-inksoft sm:text-base">
              <p>{t.invP1}</p>
              <p>{t.invP2}</p>
              <p className="font-display text-lg text-ink">{t.invP3}</p>
            </div>
            <div className="mt-8 flex justify-center">
              <Paisley className="text-rosegold/70 float-slow" size={30} />
            </div>
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}

function Program() {
  const { t } = useLang();
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionLabel>{t.programLabel}</SectionLabel>
          <h2 className="mt-4 text-center font-script text-3xl text-ink sm:text-4xl">{t.programTitle}</h2>
        </Reveal>
        <SuzaniDivider className="mt-6" />

        <ol className="relative mt-12 space-y-9 pl-12">
          <span className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-transparent via-rosegold/35 to-transparent" />
          {t.program.map((item, i) => (
            <li key={item.time}>
              <Reveal delay={i * 110} wipe>
                <div className="relative">
                  <span className="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full border border-rosegold/30 bg-ivory text-rosegold shadow-[0_8px_22px_-14px_oklch(0.5_0.08_15/0.9)]">
                    {item.icon}
                  </span>
                  <p className="font-display text-sm tracking-[0.3em] text-rosegold">{item.time}</p>
                  <h3 className="mt-1 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-inksoft">{item.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CalendarJuly() {
  const { t } = useLang();
  const first = new Date(2027, 6, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = 31;
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const week = t.calendarWeek;

  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-md">
        <Reveal>
          <SectionLabel>{t.dateLabel}</SectionLabel>
          <h2 className="mt-4 text-center font-script text-3xl text-ink sm:text-4xl">{t.calendarMonth}</h2>
        </Reveal>

        <Reveal delay={180} className="mt-9">
          <OrnateFrame className="bg-ivory/70 px-4 py-8 backdrop-blur-sm sm:px-7">
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {week.map((d) => (
                <span key={d} className="pb-2 text-[10px] uppercase tracking-[0.15em] text-rosegold/70">
                  {d}
                </span>
              ))}
              {cells.map((d, i) => (
                <span key={i} className="flex h-9 items-center justify-center">
                  {d === null ? (
                    ""
                  ) : d === 27 ? (
                    <span className="relative flex h-9 w-9 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full border border-rosegold/50"
                        style={{ animation: "pulse-ring 2.8s ease-out infinite" }}
                      />
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blush via-champagne/60 to-blush font-display text-base text-rosegold shadow-[0_0_22px_-4px_oklch(0.7_0.09_25/0.8)]">
                        27
                      </span>
                    </span>
                  ) : (
                    <span className="font-display text-[15px] text-inksoft">{d}</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-inksoft">
              {t.calendarNote}
            </p>
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}

function Location() {
  const { t } = useLang();
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionLabel>{t.locationLabel}</SectionLabel>
          <h2 className="mt-4 text-center font-script text-3xl text-ink sm:text-4xl">{t.locationTitle}</h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-inksoft">
            {t.locationAddr}
          </p>
        </Reveal>

        <SuzaniDivider className="mt-6" />

        <Reveal delay={160} className="mt-9">
          <TiltCard strength={5} className="overflow-hidden rounded-sm border border-rosegold/25 shadow-[0_24px_60px_-30px_oklch(0.5_0.07_15/0.8)]">
            <iframe
              title="Registon to'yxonasi joylashuvi"
              src="https://www.google.com/maps?q=Guliston%203-mavze%20Registon%20to'yxonasi&output=embed"
              className="h-[300px] w-full border-0 grayscale-[25%] sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </TiltCard>
        </Reveal>

        <Reveal delay={280} className="mt-7 flex justify-center">
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="tiltable inline-flex items-center gap-3 rounded-sm border border-rosegold/45 bg-ivory/70 px-8 py-4 font-display text-sm uppercase tracking-[0.25em] text-rosegold transition hover:-translate-y-0.5 hover:bg-blush/40 hover:shadow-[0_18px_44px_-22px_oklch(0.5_0.08_15/0.9)]"
          >
            <Paisley size={18} />
            {t.mapBtn}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: gallery1, alt: "Blush rangdagi gullar bilan bezatilgan bayram dasturxoni", span: "row-span-2" },
  { src: gallery2, alt: "Pushti pion gulining nozik barglari yaqindan", span: "" },
  { src: gallery3, alt: "Suzani naqshli nafis ipak mato", span: "" },
];

function Gallery() {
  const { t } = useLang();
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionLabel>{t.galleryLabel}</SectionLabel>
          <h2 className="mt-4 text-center font-script text-3xl text-ink sm:text-4xl">{t.galleryTitle}</h2>
        </Reveal>

        <div className="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={i * 120} wipe={i % 2 === 0} className={g.span}>
              <TiltCard className="h-full overflow-hidden rounded-sm border border-rosegold/20 shadow-[0_16px_44px_-26px_oklch(0.5_0.07_15/0.9)]">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-[1.06]"
                />
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={360} className="">
            <div className="flex h-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-rosegold/35 bg-cream/50 text-center">
              <Paisley className="text-rosegold/70 float-slow" size={26} />
              <p className="px-3 text-[10px] uppercase tracking-[0.25em] text-inksoft">
                {t.galleryComingSoon}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Rsvp() {
  const { t } = useLang();
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-md">
        <Reveal>
          <SectionLabel>{t.rsvpLabel}</SectionLabel>
          <h2 className="mt-4 text-center font-script text-3xl text-ink sm:text-4xl">{t.rsvpTitle}</h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-inksoft">
            {t.rsvpDeadline}
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-9">
          <OrnateFrame className="rounded-sm bg-ivory/55 shadow-[0_26px_70px_-38px_oklch(0.5_0.07_15/0.9)] backdrop-blur-md">
            <RsvpForm />
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}

function Closing() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden px-6 pb-24 pt-16 text-center">
      <div className="ikat-bg absolute inset-0 -z-10 opacity-[0.12]" />
      <SuzaniDivider />
      <Reveal delay={150} className="mx-auto mt-10 max-w-md">
        <p className="font-display text-lg italic leading-relaxed text-inksoft whitespace-pre-line">
          {t.closingP}
        </p>
      </Reveal>
      <Reveal delay={320} className="mt-10">
        <p className="font-script text-shimmer text-4xl leading-tight sm:text-5xl">
          Durdonaxon &amp; Toxirbek
        </p>
      </Reveal>
      <div className="mt-9 flex items-center justify-center gap-4 text-rosegold/70">
        <span className="h-px w-12 bg-rosegold/30" />
        <Paisley size={22} className="float-slow" />
        <span className="h-px w-12 bg-rosegold/30" />
      </div>
      <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-inksoft/70">{t.closingDate}</p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="fixed right-4 top-4 z-40 flex gap-1 rounded-full border border-rosegold/30 bg-ivory/80 p-1 backdrop-blur-sm sm:right-6 sm:top-6">
      {(["uz", "ru", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1.5 text-[11px] font-display uppercase tracking-widest transition ${
            lang === l ? "bg-rosegold text-ivory" : "text-rosegold/70 hover:text-rosegold"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

type RsvpRow = {
  id: string;
  name: string;
  attendance: "ha" | "yoq";
  guests: number;
  comment: string | null;
  created_at: string;
};

function Invitation() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("uz");
  const t = translations[lang];

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // Admin gate
  const [adminOverlay, setAdminOverlay] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [adminDash, setAdminDash] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const loadRsvps = () => {
    supabase
      .from("invitation_rsvp")
      .select("*")
      .eq("invitation", INVITATION_KEY)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) { console.error("[rsvp] load error", error); return; }
        setRsvps(
          (data || []).map((row: any) => ({
            id: row.id,
            name: row.name,
            attendance: row.attendance === "yes" ? "ha" : "yoq",
            guests: row.guests ?? 1,
            comment: row.comment,
            created_at: row.created_at,
          })),
        );
      });
  };
  const tryAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setAdminOverlay(false);
      setAdminErr(false);
      loadRsvps();
      setAdminDash(true);
    } else {
      setAdminErr(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <main className="relative min-h-screen bg-ivory">
        <IntroDoors open={open} onOpen={() => setOpen(true)} />
        {open && <Particles />}

        <audio ref={audioRef} src={songUrl} loop preload="auto" />

        {open && <LangSwitcher lang={lang} setLang={setLang} />}

        {open && (
          <button
            type="button"
            onClick={togglePlay}
            className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rosegold/30 bg-ivory/80 text-rosegold backdrop-blur-sm transition hover:bg-blush/40 sm:left-6 sm:top-6"
            aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
          >
            {playing ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        )}

        <div
          className="transition-all duration-[1600ms]"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "none" : "scale(1.04)",
            filter: open ? "none" : "blur(6px)",
          }}
        >
          <Hero />
          <InvitationText />
          <Program />
          <CalendarJuly />
          <Location />
          <Gallery />
          <Rsvp />
          <Closing />

          <footer className="relative py-10 px-6 text-center">
            <div className="flex flex-col items-center gap-3.5">
              <button
                type="button"
                className="admin-key"
                title="Admin"
                onClick={() => {
                  setAdminOverlay(true);
                  setAdminPass("");
                  setAdminErr(false);
                }}
              >
                <Lock className="h-4 w-4" />
              </button>
              <a href={MAIN_SITE_URL} target="_blank" rel="noopener noreferrer" className="wi-link-btn">
                WI
              </a>
            </div>
          </footer>
        </div>

        {adminOverlay && (
          <div
            className="admin-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) setAdminOverlay(false); }}
          >
            <div className="admin-box">
              <h3>Admin panel</h3>
              <label className="admin-box-label">Parol</label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryAdminLogin()}
                autoFocus
              />
              {adminErr && <p className="admin-err">Parol noto'g'ri.</p>}
              <div className="admin-box-actions">
                <button type="button" className="btn-back" onClick={() => setAdminOverlay(false)}>
                  Yopish
                </button>
                <button type="button" className="wi-link-btn admin-box-submit" onClick={tryAdminLogin}>
                  Kirish
                </button>
              </div>
            </div>
          </div>
        )}

        {adminDash && (
          <div className="admin-dash">
            <div className="admin-dash-inner">
              <div className="admin-dash-head">
                <h2>Admin panel</h2>
                <button type="button" className="btn-back" onClick={() => setAdminDash(false)}>
                  Yopish
                </button>
              </div>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <b>{rsvps.length}</b>
                  <span>Javoblar</span>
                </div>
                <div className="admin-stat-card">
                  <b>{rsvps.reduce((s, r) => (r.attendance === "ha" ? s + r.guests : s), 0)}</b>
                  <span>Jami mehmonlar</span>
                </div>
              </div>
              {rsvps.length === 0 ? (
                <p className="admin-note">Hozircha javob yo'q.</p>
              ) : (
                <div className="admin-rsvp-list">
                  {rsvps.map((r) => (
                    <div className="admin-rsvp-card" key={r.id}>
                      <div className="admin-rsvp-row">
                        <span className="admin-rsvp-name">{r.name}</span>
                        <span className={"admin-rsvp-badge " + (r.attendance === "ha" ? "admin-rsvp-badge-yes" : "admin-rsvp-badge-no")}>
                          {r.attendance === "ha" ? "Ha, albatta" : "Afsuski, yo'q"}
                        </span>
                      </div>
                      <div className="admin-rsvp-row">
                        <span className="admin-rsvp-date">
                          {new Date(r.created_at).toLocaleString("uz-UZ")}
                        </span>
                        {r.attendance === "ha" && r.guests > 1 && (
                          <span className="admin-rsvp-guests">× {r.guests}</span>
                        )}
                      </div>
                      {r.comment && <p className="admin-rsvp-comment">{r.comment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </LangContext.Provider>
  );
}
