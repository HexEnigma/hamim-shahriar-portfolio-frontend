import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSkills } from "@/hooks/usePortfolio";
import { SKILL_CATEGORIES } from "@/utils/constants";

function Bar({ skill }) {
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span>{skill.name}</span>
        <span className="font-heading text-muted">{skill.proficiency}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin={1}
        aria-valuemax={100}
        aria-valuenow={skill.proficiency}
        className="mt-1 h-1 overflow-hidden rounded-full bg-surface2"
      >
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </li>
  );
}

export default function SkillGrid({ id = "skills", eyebrow = "// 02 skills" }) {
  const q = useSkills({ ordering: "display_order" });
  return (
    <Section id={id} eyebrow={eyebrow} title="Skills">
      <p className="mb-3 text-sm text-muted">Self-assessed levels.</p>
      <QueryBoundary
        query={q}
        isEmpty={(d) => d.length === 0}
        emptyTitle="No skills listed yet"
        skeleton={<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-12" />)}</div>}
      >
        {(skills) => {
          const groups = SKILL_CATEGORIES.map(([key, label]) => [label, skills.filter((s) => s.category === key)]).filter(([, l]) => l.length);
          return (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groups.map(([label, list]) => (
                <Card key={label} className="p-3">
                  <h3 className="mb-2 font-heading text-base text-accent">{label}</h3>
                  <ul className="space-y-2">{list.map((s) => <Bar key={s.id} skill={s} />)}</ul>
                </Card>
              ))}
            </div>
          );
        }}
      </QueryBoundary>
    </Section>
  );
}