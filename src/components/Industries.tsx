import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import { industries } from "@/data/site";

export default function Industries() {
  return (
    <section id="assets" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow="Direct-Booking Optimization" title="Assets We Optimize" />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {industries.map((audience) => (
            <StaggerItem key={audience.title} className="h-full">
              <Tilt className="glass-card flex h-full flex-col gap-2 p-6">
                <h3 className="font-display text-base font-medium text-ink">
                  {audience.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-ink-dim">
                  {audience.description}
                </p>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
