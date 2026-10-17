import { Link } from "react-router-dom";
import StatCard from "@/components/dashboard/StatCard";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useStats } from "@/hooks/useAdmin";

const monthName = (m) => new Date(`${m}-01`).toLocaleString("en", { month: "short" });

export default function Overview() {
  const q = useStats();
  return (
    <>
      <h1 className="mb-3">Overview</h1>
      <QueryBoundary query={q} skeleton={<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-12" />)}</div>}>
        {(d) => {
          const max = Math.max(1, ...d.posts_per_month.map((m) => m.count));
          return (
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Posts" value={d.total_posts} hint={`${d.published_posts} published · ${d.draft_posts} drafts`} />
                <StatCard label="Views · Likes" value={`${d.total_views} · ${d.total_likes}`} />
                <StatCard label="Pending comments" value={d.pending_comments} hint={`${d.total_comments} total`} />
                <StatCard label="Unread messages" value={d.unread_messages} hint={`${d.total_projects} projects · ${d.total_skills} skills`} />
              </div>
              <div className="grid gap-3 xl:grid-cols-2">
                <Card className="p-3">
                  <h2 className="text-lg">Top posts by views</h2>
                  {d.top_posts.length === 0 ? <p className="mt-2 text-muted">No published posts yet.</p> : (
                    <ol className="mt-2 space-y-1">
                      {d.top_posts.map((p) => (
                        <li key={p.slug} className="flex items-center justify-between gap-2">
                          <Link to={`/blog/${p.slug}`} className="min-w-0 truncate hover:text-accent">{p.title}</Link>
                          <span className="shrink-0 text-sm text-muted">{p.views} views · {p.likes} likes</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </Card>
                <Card className="p-3">
                  <h2 className="text-lg">Posts per month</h2>
                  <ul className="mt-2 flex h-[160px] items-stretch gap-2" aria-label="Posts published in the last six months">
                    {d.posts_per_month.map((m) => (
                      <li key={m.month} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-xs">{m.count}</span>
                        <div className="flex w-full flex-1 items-end"><div className="w-full rounded-sm bg-accent" style={{ height: `${(m.count / max) * 100}%`, minHeight: m.count ? 4 : 1 }} /></div>
                        <span className="text-xs text-muted">{monthName(m.month)}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <Card className="p-3">
                <div className="flex items-center justify-between"><h2 className="text-lg">Recent comments</h2><Link to="/dashboard/comments" className="text-sm text-accent">Moderate</Link></div>
                {d.recent_comments.length === 0 ? <p className="mt-2 text-muted">No comments yet.</p> : (
                  <ul className="mt-2 space-y-2">
                    {d.recent_comments.map((c) => (
                      <li key={c.id} className="flex flex-wrap items-center justify-between gap-1">
                        <p className="min-w-0 truncate"><span className="font-medium">{c.name}</span> on {c.post_title}: <span className="text-muted">{c.content}</span></p>
                        <Badge tone={c.is_approved ? "accent" : "warning"}>{c.is_approved ? "Approved" : "Pending"}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          );
        }}
      </QueryBoundary>
    </>
  );
}