import { FiArrowRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import ProjectCard from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/usePortfolio";

export default function FeaturedProjects() {
  const q = useProjects({ is_featured: true, ordering: "display_order" });
  return (
    <Section
      id="projects"
      eyebrow="// 04 projects"
      title="Featured projects"
      action={<Button to="/projects" variant="ghost">See all projects <FiArrowRight aria-hidden="true" /></Button>}
    >
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No featured projects yet" skeleton={<CardGridSkeleton />}>
        {(d) => (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {d.results.slice(0, 3).map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </QueryBoundary>
    </Section>
  );
}