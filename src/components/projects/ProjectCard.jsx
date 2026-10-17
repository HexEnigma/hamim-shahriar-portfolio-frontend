import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { PROJECT_STATUS_LABELS } from "@/utils/constants";

export default function ProjectCard({ project: p }) {
  const tech = p.tech_stack ?? [];
  return (
    <Card as="article" hover className="flex h-full flex-col overflow-hidden">
      <div className="aspect-video bg-surface2">
        {(p.cover_image_url || p.cover_image) && (
          <img src={p.cover_image_url || p.cover_image} alt={`Screenshot of ${p.title}`} loading="lazy" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-wrap gap-1">
          {p.status === "IN_PROGRESS" && <Badge tone="warning">{PROJECT_STATUS_LABELS.IN_PROGRESS}</Badge>}
        </div>
        <h3 className="mt-1 line-clamp-2">
          <Link to={`/projects/${p.slug}`} className="after:absolute after:inset-0 hover:text-accent">{p.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-muted">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {tech.slice(0, 4).map((t) => <Badge key={t.id}>{t.name}</Badge>)}
          {tech.length > 4 && <Badge>+{tech.length - 4}</Badge>}
        </div>
      </div>
    </Card>
  );
}