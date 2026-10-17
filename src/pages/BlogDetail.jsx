import { Link, useParams } from "react-router-dom";
import { FiCalendar, FiClock, FiEdit2, FiEye } from "react-icons/fi";
import PageContainer from "@/components/layout/PageContainer";
import PostCard from "@/components/blog/PostCard";
import LikeButton from "@/components/blog/LikeButton";
import ShareBar from "@/components/blog/ShareBar";
import CommentForm from "@/components/blog/CommentForm";
import CommentList from "@/components/blog/CommentList";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Markdown from "@/components/ui/Markdown";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/hooks/usePosts";
import usePageMeta from "@/hooks/usePageMeta";
import { formatDate } from "@/utils/formatDate";
import NotFound from "./NotFound";

function Article({ post: p }) {
  const { isOwner } = useAuth();
  return (
    <article className="mx-auto max-w-[800px]">
      <div className="aspect-video overflow-hidden rounded-lg border border-line bg-surface2">
        {(p.cover_image_url || p.cover_image) && (
          <img src={p.cover_image_url || p.cover_image} alt={`Cover image for ${p.title}`} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {p.category && <Link to={`/blog?category=${p.category.slug}`}><Badge tone="accent">{p.category.name}</Badge></Link>}
        {isOwner && p.status === "DRAFT" && <Badge tone="warning">Draft</Badge>}
        {isOwner && <Button to={`/dashboard/posts/${p.slug}/edit`} variant="ghost"><FiEdit2 aria-hidden="true" /> Edit</Button>}
      </div>
      <h1 className="mt-1 break-words md:text-3xl">{p.title}</h1>
      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1"><FiCalendar aria-hidden="true" />{formatDate(p.published_at ?? p.created_at)}</span>
        <span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" />{p.reading_time} min read</span>
        <span className="inline-flex items-center gap-1"><FiEye aria-hidden="true" />{p.views_count} views</span>
        <span>By {p.author_name}</span>
      </p>

      <div className="mt-4"><Markdown>{p.content}</Markdown></div>

      {p.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1" aria-label="Tags">
          {p.tags.map((t) => <li key={t.id}><Link to={`/blog?tag=${t.slug}`}><Badge>#{t.name}</Badge></Link></li>)}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-y border-line py-2">
        <LikeButton post={p} />
        <ShareBar title={p.title} />
      </div>

      <section className="mt-6" aria-labelledby="comments-title">
        <h2 id="comments-title">Comments ({p.comments_count})</h2>
        <div className="mt-3 rounded-lg border border-line bg-glass p-3"><CommentForm slug={p.slug} /></div>
        <div className="mt-4"><CommentList slug={p.slug} /></div>
      </section>

      {p.related_posts.length > 0 && (
        <section className="mt-6" aria-labelledby="related-title">
          <h2 id="related-title">Related posts</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {p.related_posts.map((r) => <PostCard key={r.id} post={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const q = usePost(slug);
  usePageMeta(q.data?.title, q.data?.excerpt);
  if (q.isError && q.error.response?.status === 404) return <NotFound />;
  return (
    <PageContainer className="py-section">
      <QueryBoundary query={q} skeleton={<div className="mx-auto max-w-[800px] space-y-2"><Skeleton className="aspect-video" /><Skeleton className="h-4" /><Skeleton className="h-8" /></div>}>
        {(post) => <Article post={post} />}
      </QueryBoundary>
    </PageContainer>
  );
}