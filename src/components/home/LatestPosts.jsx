import { FiArrowRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import PostCard from "@/components/blog/PostCard";
import { usePosts } from "@/hooks/usePosts";

export default function LatestPosts() {
  const q = usePosts({ ordering: "-published_at" });
  return (
    <Section
      id="writing"
      eyebrow="// 05 writing"
      title="Latest blog posts"
      action={<Button to="/blog" variant="ghost">Read the blog <FiArrowRight aria-hidden="true" /></Button>}
    >
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No posts published yet" skeleton={<CardGridSkeleton />}>
        {(d) => (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {d.results.slice(0, 3).map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </QueryBoundary>
    </Section>
  );
}