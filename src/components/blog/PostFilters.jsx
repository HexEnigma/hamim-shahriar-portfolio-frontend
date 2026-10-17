import SearchBox from "@/components/ui/SearchBox";
import Input from "@/components/ui/Input";
import { useCategories, useTags } from "@/hooks/usePosts";
import { POST_SORTS } from "@/utils/constants";

export default function PostFilters({ params, setParams }) {
  const categories = useCategories();
  const tags = useTags();
  const chip = (active) =>
    `inline-flex min-h-touch items-center rounded-full border px-2 font-heading text-sm transition duration-base ${active ? "border-accent bg-accent text-onAccent" : "border-line text-muted hover:border-accent hover:text-accent"}`;

  return (
    <div className="space-y-2">
      <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr]">
        <SearchBox value={params.search ?? ""} onCommit={(v) => setParams({ search: v })} placeholder="Search posts…" label="Search posts" />
        <Input as="select" aria-label="Filter by tag" value={params.tag ?? ""} onChange={(e) => setParams({ tag: e.target.value })}>
          <option value="">All tags</option>
          {(tags.data ?? []).filter((t) => t.posts_count > 0).map((t) => <option key={t.id} value={t.slug}>{t.name} ({t.posts_count})</option>)}
        </Input>
        <Input as="select" aria-label="Sort posts" value={params.ordering} onChange={(e) => setParams({ ordering: e.target.value })}>
          {POST_SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </Input>
      </div>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Categories">
        <button className={chip(!params.category)} aria-pressed={!params.category} onClick={() => setParams({ category: "" })}>All</button>
        {(categories.data ?? []).map((c) => (
          <button key={c.id} className={chip(params.category === c.slug)} aria-pressed={params.category === c.slug} onClick={() => setParams({ category: c.slug })}>
            {c.name} <span className="ml-1 opacity-70">{c.posts_count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}