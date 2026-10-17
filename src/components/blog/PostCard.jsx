import { Link } from "react-router-dom";
import { FiClock, FiEye, FiHeart } from "react-icons/fi";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/utils/formatDate";

export default function PostCard({ post: p }) {
  const { isOwner } = useAuth();
  return (
    <Card as="article" hover className="flex h-full flex-col overflow-hidden">
      <div className="aspect-video bg-surface2">
        {p.cover_image && <img src={p.cover_image} alt={`Cover image for ${p.title}`} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-wrap gap-1">
          {p.category && <Badge tone="accent">{p.category.name}</Badge>}
          {isOwner && p.status === "DRAFT" && <Badge tone="warning">Draft</Badge>}
        </div>
        <h3 className="mt-1 line-clamp-2">
          <Link to={`/blog/${p.slug}`} className="after:absolute after:inset-0 hover:text-accent">{p.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-muted">{p.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 pt-2 text-xs text-muted">
          <span>{formatDate(p.published_at ?? p.created_at)}</span>
          <span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" />{p.reading_time} min</span>
          <span className="inline-flex items-center gap-1"><FiEye aria-hidden="true" />{p.views_count}</span>
          <span className="inline-flex items-center gap-1"><FiHeart aria-hidden="true" />{p.likes_count}</span>
        </div>
      </div>
    </Card>
  );
}