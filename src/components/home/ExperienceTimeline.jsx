import Section from "@/components/layout/Section";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEducation, useExperiences } from "@/hooks/usePortfolio";
import { EMPLOYMENT_LABELS } from "@/utils/constants";
import { formatRange } from "@/utils/formatDate";
import { bullets } from "@/utils/text";

const fromExperience = (e) => ({
  key: `x${e.id}`, title: e.role, org: e.company, url: e.company_url,
  meta: [EMPLOYMENT_LABELS[e.employment_type], e.location].filter(Boolean).join(" · "),
  dates: formatRange(e.start_date, e.end_date, e.is_current), bullets: bullets(e.description),
});
const fromEducation = (e) => ({
  key: `e${e.id}`, title: e.degree, org: e.institution,
  meta: [e.field_of_study, e.grade && `Grade: ${e.grade}`].filter(Boolean).join(" · "),
  dates: `${e.start_year} – ${e.end_year ?? "Present"}`, bullets: bullets(e.description),
});

function TimelineList({ items }) {
  return (
    <ol className="relative ml-1 border-l border-line pl-4">
      {items.map((it) => (
        <li key={it.key} className="relative pb-4 last:pb-0">
          <span className="absolute -left-[41px] top-1 h-2 w-2 rounded-full border-2 border-accent bg-bg" aria-hidden="true" />
          <div className="rounded-lg border border-line bg-glass p-3">
            <p className="font-heading text-sm text-accent">{it.dates}</p>
            <h3 className="mt-1">{it.title}</h3>
            <p className="text-muted">
              {it.url ? <a href={it.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{it.org}</a> : it.org}
              {it.meta && ` · ${it.meta}`}
            </p>
            {it.bullets.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-3 text-muted">{it.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ExperienceTimeline({ mode = "auto", id = "experience", eyebrow = "// 03 experience", hideIfEmpty = false }) {
  const exp = useExperiences();
  const edu = useEducation();
  const showEdu = mode === "education" || (mode === "auto" && exp.data?.length === 0);
  const q = showEdu ? edu : exp;
  const items = (q.data ?? []).map(showEdu ? fromEducation : fromExperience);
  if (hideIfEmpty && q.isSuccess && items.length === 0) return null;

  return (
    <Section id={id} eyebrow={eyebrow} title={showEdu ? "Education" : "Experience"}>
      <QueryBoundary
        query={q}
        isEmpty={() => items.length === 0}
        emptyTitle="Nothing listed yet"
        skeleton={<div className="space-y-2"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>}
      >
        {() => <TimelineList items={items} />}
      </QueryBoundary>
    </Section>
  );
}