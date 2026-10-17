import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiEyeOff, FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { postsApi } from "@/api/posts";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import DataTable, { ActionButton } from "@/components/dashboard/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import SearchBox from "@/components/ui/SearchBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminList, useRemove, useSave } from "@/hooks/useAdmin";
import useQueryParams from "@/hooks/useQueryParams";
import { PAGE_SIZES } from "@/utils/constants";
import { firstFieldError } from "@/utils/forms";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/validators";

export default function Posts() {
  const [params, setParams] = useQueryParams({ status: "ALL" });
  const page = Number(params.page) || 1;
  const q = useAdminList("posts", postsApi, { search: params.search, status: params.status, page });
  const save = useSave(postsApi);
  const remove = useRemove(postsApi);
  const [toDelete, setToDelete] = useState(null);

  const toggle = (p) => {
    const next = p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    save.mutate({ id: p.slug, body: { status: next } }, {
      onSuccess: () => toast.success(next === "PUBLISHED" ? "Post published." : "Post moved to drafts."),
      onError: (e) => toast.error(firstFieldError(e) ?? getErrorMessage(e)),
    });
  };

  const columns = [
    { key: "title", header: "Title", render: (p) => <Link to={`/blog/${p.slug}`} className="hover:text-accent">{p.title}</Link> },
    { key: "status", header: "Status", render: (p) => <Badge tone={p.status === "DRAFT" ? "warning" : "accent"}>{p.status === "DRAFT" ? "Draft" : "Published"}</Badge> },
    { key: "published_at", header: "Published", render: (p) => formatDate(p.published_at) || "—" },
    { key: "comments_count", header: "Comments" }, { key: "views_count", header: "Views" }, { key: "likes_count", header: "Likes" },
    { key: "actions", header: <span className="sr-only">Actions</span>, className: "whitespace-nowrap", render: (p) => (
      <div className="flex">
        <ActionButton icon={p.status === "PUBLISHED" ? FiEyeOff : FiUploadCloud} label={p.status === "PUBLISHED" ? `Unpublish ${p.title}` : `Publish ${p.title}`} onClick={() => toggle(p)} disabled={save.isPending} />
        <ActionButton icon={FiEdit2} label={`Edit ${p.title}`} to={`/dashboard/posts/${p.slug}/edit`} />
        <ActionButton icon={FiTrash2} label={`Delete ${p.title}`} tone="danger" onClick={() => setToDelete(p)} />
      </div>) },
  ];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1>Posts</h1>
        <Button to="/dashboard/posts/new"><FiPlus aria-hidden="true" /> New post</Button>
      </div>
      <div className="mb-2 grid gap-2 md:grid-cols-[2fr_1fr]">
        <SearchBox value={params.search ?? ""} onCommit={(v) => setParams({ search: v })} placeholder="Search posts…" label="Search posts" />
        <Input as="select" aria-label="Filter by status" value={params.status} onChange={(e) => setParams({ status: e.target.value })}>
          <option value="ALL">All statuses</option><option value="PUBLISHED">Published</option><option value="DRAFT">Drafts</option>
        </Input>
      </div>
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No posts found" skeleton={<Skeleton className="h-12" />}>
        {(d) => (<><DataTable caption="Posts" columns={columns} rows={d.results} />
          <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.posts} onChange={(n) => setParams({ page: n })} /></>)}
      </QueryBoundary>
      <ConfirmModal open={Boolean(toDelete)} message={toDelete ? `Delete “${toDelete.title}”? This also deletes its comments and likes.` : ""} loading={remove.isPending}
        onClose={() => setToDelete(null)}
        onConfirm={() => remove.mutate(toDelete.slug, {
          onSuccess: () => { toast.success("Post deleted."); setToDelete(null); },
          onError: (e) => { toast.error(getErrorMessage(e)); setToDelete(null); } })} />
    </>
  );
}