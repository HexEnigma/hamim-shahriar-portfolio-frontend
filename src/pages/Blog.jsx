import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PostCard from "@/components/blog/PostCard";
import PostFilters from "@/components/blog/PostFilters";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import { usePosts } from "@/hooks/usePosts";
import useQueryParams from "@/hooks/useQueryParams";
import usePageMeta from "@/hooks/usePageMeta";
import { PAGE_SIZES } from "@/utils/constants";

export default function Blog() {
  usePageMeta("Blog", "Articles about web development, written while learning.");
  const [params, setParams] = useQueryParams({ ordering: "-published_at" });
  const page = Number(params.page) || 1;
  const q = usePosts({ search: params.search, category: params.category, tag: params.tag, ordering: params.ordering, page });

  return (
    <>
      <PageHeader eyebrow="// blog" title="Blog" intro="Notes on what I’m learning and building." />
      <PageContainer className="py-4"><PostFilters params={params} setParams={setParams} /></PageContainer>
      <PageContainer className="pb-section">
        <QueryBoundary
          query={q}
          isEmpty={(d) => d.results.length === 0}
          emptyTitle={params.search ? `No posts found for ‘${params.search}’` : "No posts found"}
          emptyMessage="Try a different search or filter."
          skeleton={<CardGridSkeleton count={6} />}
        >
          {(d) => (
            <>
              <div className={`grid gap-3 md:grid-cols-2 xl:grid-cols-3 ${q.isPlaceholderData ? "opacity-60" : ""}`}>
                {d.results.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
              <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.posts} onChange={(n) => setParams({ page: n })} />
            </>
          )}
        </QueryBoundary>
      </PageContainer>
    </>
  );
}