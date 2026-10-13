import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Stagger";
import { faqs } from "@/data/site";

// Falcon Ridge Digital's own FAQs (home page), as native <details> so they
// work without JS.
export default function Faqs() {
  return (
    <section id="faqs" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeading eyebrow="FAQs" title="Questions operators ask us" />
        <Stagger className="mt-12 space-y-3" stagger={0.06}>
          {faqs.map((f) => (
            <StaggerItem key={f.q}>
              <details className="faq glass-card group px-6 py-5">
                <summary className="flex items-center justify-between gap-4 font-display text-base font-semibold text-ink sm:text-lg">
                  {f.q}
                  <span
                    className="faq-icon shrink-0 text-2xl leading-none text-accent transition-transform duration-300"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-ink-dim">
                  {f.a.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
