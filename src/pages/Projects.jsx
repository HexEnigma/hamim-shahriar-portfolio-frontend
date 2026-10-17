import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import ProjectCard from "@/components/projects/ProjectCard";
import Input from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import SearchBox from "@/components/ui/SearchBox";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import { useProjects } from "@/hooks/usePortfolio";
import useQueryParams from "@/hooks/useQueryParams";
import usePageMeta from "@/hooks/usePageMeta";
import { PAGE_SIZES, PROJECT_CATEGORIES, PROJECT_SORTS } from "@/utils/constants";

export default function Projects() {
  usePageMeta("Projects", "Projects built with Django, React and more.");
  const [params, setParams] = useQueryParams({ ordering: "-completed_date" });
  const page = Number(params.page) || 1;
  const q = useProjects({ search: params.search, category: params.category, ordering: params.ordering, page });

  return (
    <>
      <PageHeader eyebrow="// projects" title="Projects" intro="Things I’ve built while learning and practising full-stack development." />
      <PageContainer className="py-4">
        <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr]">
          <SearchBox value={params.search ?? ""} onCommit={(v) => setParams({ search: v })} placeholder="Search projects…" label="Search projects" />
          <Input as="select" aria-label="Filter by category" value={params.category ?? ""} onChange={(e) => setParams({ category: e.target.value })}>
            <option value="">All categories</option>
            {PROJECT_CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Input>
          <Input as="select" aria-label="Sort projects" value={params.ordering} onChange={(e) => setParams({ ordering: e.target.value })}>
            {PROJECT_SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Input>
        </div>
      </PageContainer>
      <PageContainer className="pb-section">
        <QueryBoundary
          query={q}
          isEmpty={(d) => d.results.length === 0}
          emptyTitle={params.search ? `No projects found for ‘${params.search}’` : "No projects found"}
          emptyMessage="Try a different search or filter."
          skeleton={<CardGridSkeleton count={6} />}
        >
          {(d) => (
            <>
              <div className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 ${q.isPlaceholderData ? "opacity-60" : ""}`}>
                {d.results.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
              <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.projects} onChange={(n) => setParams({ page: n })} />
            </>
          )}
        </QueryBoundary>
      </PageContainer>
    </>
  );
}