"use client";

import { useState, type FormEvent } from "react";
import { STRATEGY_PROPOSAL_URL } from "@/data/site";
import { track } from "@/lib/track";
import QualifierFields from "./QualifierFields";

type Status = "idle" | "sending" | "sent" | "error";

// Used only when the GHL calendar isn't configured but a lead webhook is:
// the request goes to every configured webhook via /api/lead.
export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("lead", { location: "lead-form" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-center text-ink">
        Thanks — your request is in. We&rsquo;ll reach out to schedule your strategy call.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <QualifierFields />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-ground transition hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request My Strategy Call"}
        <span aria-hidden="true">&rarr;</span>
      </button>
      {status === "error" && (
        <p className="text-sm text-ink-dim">
          Something went wrong sending that.{" "}
          <a href={STRATEGY_PROPOSAL_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">
            Request your strategy proposal here
          </a>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
