import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Paisley } from "./ornaments";
import { useLang } from "@/lib/i18n";

const INVITATION_KEY = "qizlar_bazmi_durdona";

type Attendance = "ha" | "yoq";

export function RsvpForm() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("ha");
  const [guests, setGuests] = useState(1);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setStatus("error");
      setMessage(t.fErrName);
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("invitation_rsvp").insert({
      invitation: INVITATION_KEY,
      name: trimmed.slice(0, 100),
      attendance: attendance === "ha" ? "yes" : "no",
      guests: attendance === "ha" ? Math.min(Math.max(guests, 1), 20) : 1,
      comment: comment.trim() ? comment.trim().slice(0, 500) : null,
    });
    if (error) {
      setStatus("error");
      setMessage(t.fErrSend);
      return;
    }
    setStatus("done");
    setMessage(attendance === "ha" ? t.fDoneYes : t.fDoneNo);
  }

  const field =
    "w-full rounded-sm border border-rosegold/25 bg-ivory/70 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-rosegold/60 focus:bg-ivory";

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
        <Paisley className="text-rosegold float-slow" size={38} />
        <p className="font-display text-2xl text-rosegold">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 px-5 py-8 sm:px-9">
      <div>
        <label htmlFor="rsvp-name" className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-inksoft">
          {t.fName}
        </label>
        <input
          id="rsvp-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder={t.fNamePh}
          className={field}
        />
      </div>

      <div>
        <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-inksoft">{t.fAttend}</span>
        <div className="grid grid-cols-2 gap-2.5">
          {([
            ["ha", t.fYes],
            ["yoq", t.fNo],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setAttendance(value)}
              className={`tiltable rounded-sm border px-3 py-3 font-display text-base tracking-wide transition ${
                attendance === value
                  ? "border-rosegold/60 bg-blush/50 text-rosegold shadow-[0_10px_30px_-16px_oklch(0.5_0.08_15/0.7)]"
                  : "border-rosegold/20 bg-ivory/60 text-inksoft hover:border-rosegold/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {attendance === "ha" && (
        <div>
          <label htmlFor="rsvp-guests" className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-inksoft">
            {t.fGuests}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="-"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="h-11 w-11 rounded-full border border-rosegold/30 font-display text-xl text-rosegold transition hover:bg-blush/40"
            >
              −
            </button>
            <input
              id="rsvp-guests"
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
              className={`${field} text-center`}
            />
            <button
              type="button"
              aria-label="+"
              onClick={() => setGuests((g) => Math.min(20, g + 1))}
              className="h-11 w-11 rounded-full border border-rosegold/30 font-display text-xl text-rosegold transition hover:bg-blush/40"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="rsvp-comment" className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-inksoft">
          {t.fComment} <span className="normal-case tracking-normal">{t.fCommentOptional}</span>
        </label>
        <textarea
          id="rsvp-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder={t.fCommentPh}
          className={`${field} resize-none`}
        />
      </div>

      {status === "error" && <p className="text-sm text-rosegold">{message}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="tiltable w-full rounded-sm border border-rosegold/50 bg-gradient-to-r from-blush/70 via-cream to-blush/70 py-4 font-display text-lg tracking-[0.18em] text-rosegold uppercase shadow-[0_14px_40px_-20px_oklch(0.5_0.08_15/0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_oklch(0.5_0.08_15/0.9)] disabled:opacity-60"
      >
        {status === "sending" ? t.fSending : t.fSubmit}
      </button>
    </form>
  );
}
