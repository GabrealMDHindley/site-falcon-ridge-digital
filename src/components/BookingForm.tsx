"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { STRATEGY_PROPOSAL_URL } from "@/data/site";
import { TIMEZONE_LABEL, BUSINESS_TIMEZONE, type Availability } from "@/lib/booking";
import { track } from "@/lib/track";
import QualifierFields from "./QualifierFields";

type Status = "idle" | "sending" | "error";
type LoadState = "loading" | "ready" | "error";

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: BUSINESS_TIMEZONE,
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: BUSINESS_TIMEZONE,
});

export default function BookingForm() {
  const router = useRouter();
  const [load, setLoad] = useState<LoadState>("loading");
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/book/availability")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: Availability) => {
        if (cancelled) return;
        setAvailability({ days: data.days, slotMinutes: data.slotMinutes });
        setLoad("ready");
      })
      .catch(() => {
        if (!cancelled) setLoad("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedDay = availability?.days.find((d) => d.iso === dayIso) ?? null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!startTime) {
      setStatus("error");
      setErrorMsg("Pick a day and a time before booking.");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startTime }),
      });
      if (res.ok) {
        track("lead", { location: "booking-calendar" });
        router.push("/confirmation");
        return;
      }
      const resBody = await res.json().catch(() => ({}));
      if (resBody?.reason === "slot_taken") {
        setErrorMsg("That time was just booked by someone else — pick another.");
      } else {
        setErrorMsg("Something went wrong booking that slot.");
      }
      setStatus("error");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong booking that slot.");
    }
  }

  const fallback = (
    <a
      href={STRATEGY_PROPOSAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("cta_click", { location: "booking-fallback", href: STRATEGY_PROPOSAL_URL })}
      className="text-accent underline"
    >
      request your strategy proposal here
    </a>
  );

  if (load === "loading") {
    return <p className="text-sm text-ink-dim">Loading available times…</p>;
  }

  if (load === "error" || !availability || availability.days.length === 0) {
    return (
      <p className="text-sm text-ink-dim">
        We couldn&rsquo;t load the calendar right now — {fallback} and we&rsquo;ll get
        you booked.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-ink-dim">Pick a day</p>
        <div className="flex flex-wrap gap-2">
          {availability.days.map((d) => (
            <button
              key={d.iso}
              type="button"
              onClick={() => {
                setDayIso(d.iso);
                setStartTime(null);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                dayIso === d.iso
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
              aria-pressed={dayIso === d.iso}
            >
              {dayFormatter.format(new Date(d.slots[0]))}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-ink-dim">
          Pick a time ({TIMEZONE_LABEL})
        </p>
        <div className="flex flex-wrap gap-2">
          {!selectedDay && <p className="text-xs text-ink-dim/70">Pick a day first.</p>}
          {selectedDay?.slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setStartTime(slot)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                startTime === slot
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
              aria-pressed={startTime === slot}
            >
              {timeFormatter.format(new Date(slot))}
            </button>
          ))}
        </div>
      </div>

      <QualifierFields />

      <button
        type="submit"
        disabled={status === "sending" || !startTime}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ground transition hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Booking…" : "Confirm My Strategy Call"}
        <span aria-hidden="true">&rarr;</span>
      </button>

      {status === "error" && (
        <p className="pt-2 text-sm text-ink-dim">
          {errorMsg} You can also {fallback} and we&rsquo;ll get it scheduled.
        </p>
      )}
    </form>
  );
}
