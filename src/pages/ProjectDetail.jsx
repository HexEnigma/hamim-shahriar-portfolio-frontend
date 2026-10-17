import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import PageContainer from "@/components/layout/PageContainer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Markdown from "@/components/ui/Markdown";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProject } from "@/hooks/usePortfolio";
import usePageMeta from "@/hooks/usePageMeta";
import NotFound from "./NotFound";
import { PROJECT_STATUS_LABELS } from "@/utils/constants";
import { formatDate } from "@/utils/formatDate";

export default function ProjectDetail() {
  const { slug } = useParams();
  const q = useProject(slug);
  usePageMeta(q.data?.title, q.data?.summary);
  if (q.isError && q.error.response?.status === 404) return <NotFound />;

  return (
    <PageContainer className="py-section">
      <Link to="/projects" className="inline-flex min-h-touch items-center gap-1 text-sm text-muted hover:text-accent"><FiArrowLeft aria-hidden="true" /> All projects</Link>
      <QueryBoundary query={q} skeleton={<Skeleton className="mt-2 h-12" />}>
        {(p) => (
          <article className="mt-2 max-w-[800px]">
            <div className="aspect-video overflow-hidden rounded-lg border border-line bg-surface2">
              {(p.cover_image_url || p.cover_image) && (
                <img src={p.cover_image_url || p.cover_image} alt={`Screenshot of ${p.title}`} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <Badge tone={p.status === "IN_PROGRESS" ? "warning" : "accent"}>{PROJECT_STATUS_LABELS[p.status]}</Badge>
              {p.completed_date && <span className="text-sm text-muted">{formatDate(p.completed_date)}</span>}
            </div>
            <h1 className="mt-1 break-words md:text-3xl">{p.title}</h1>
            <p className="mt-1 text-muted">{p.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1">{p.tech_stack.map((t) => <Badge key={t.id}>{t.name}</Badge>)}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.live_url && <Button href={p.live_url} target="_blank" rel="noopener noreferrer"><FiExternalLink aria-hidden="true" /> Live site</Button>}
              {p.github_url && <Button variant="secondary" href={p.github_url} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> Source code</Button>}
            </div>
            <div className="mt-4"><Markdown>{p.description}</Markdown></div>
          </article>
        )}
      </QueryBoundary>
    </PageContainer>
  );
}