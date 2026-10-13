import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VimeoEmbed from "@/components/VimeoEmbed";
import BookedTracker from "@/components/BookedTracker";
import { BOOKED_COOKIE } from "@/lib/booking";
import { confirmationVideo, site } from "@/data/site";

export const metadata: Metadata = {
  title: "You're Booked",
  robots: { index: false, follow: false },
};

// Reachable only right after /api/book sets the booking cookie — never
// linked to, never in the sitemap, and bounced back to the booking section
// without it.
export default async function ConfirmationPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get(BOOKED_COOKIE)?.value) {
    redirect("/#book");
  }

  return (
    <section className="border-b border-white/5 px-6 pb-24 pt-40 sm:px-8 md:pb-32">
      <BookedTracker />
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="You're Confirmed"
          title="Your strategy call is booked."
          description={
            confirmationVideo.vimeoId
              ? "Watch this before we talk — it'll make the most of your call."
              : "Check your inbox for the calendar confirmation. We'll review your property's public-facing digital footprint before we talk."
          }
        />
        {confirmationVideo.vimeoId && (
          <Reveal className="mt-12" delay={0.1}>
            <VimeoEmbed vimeoId={confirmationVideo.vimeoId} title={confirmationVideo.title} />
          </Reveal>
        )}
        <p className="mt-10 text-sm text-ink-dim">
          Need to reschedule or have questions before then? Email{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={site.phoneHref} className="text-accent underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
