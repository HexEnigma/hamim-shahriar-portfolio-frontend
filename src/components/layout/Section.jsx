import PageContainer from "./PageContainer";
import Reveal from "@/components/ui/Reveal";

export default function Section({ id, eyebrow, title, action, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-section ${className}`}>
      <PageContainer>
        <Reveal>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2 id={`${id}-title`} className="mt-1">{title}</h2>
            </div>
            {action}
          </div>
        </Reveal>
        <Reveal>{children}</Reveal>
      </PageContainer>
    </section>
  );
}