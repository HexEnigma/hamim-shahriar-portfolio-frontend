import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { commentsApi } from "@/api/posts";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminList, useRemove, useSave } from "@/hooks/useAdmin";
import useQueryParams from "@/hooks/useQueryParams";
import { PAGE_SIZES } from "@/utils/constants";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/validators";

const TABS = [["", "All"], ["false", "Pending"], ["true", "Approved"]];

export default function Comments() {
  const [params, setParams] = useQueryParams();
  const page = Number(params.page) || 1;
  const q = useAdminList("admin-comments", commentsApi, { is_approved: params.approved, page });
  const save = useSave(commentsApi);
  const remove = useRemove(commentsApi);
  const [toDelete, setToDelete] = useState(null);

  const setApproved = (c, value) =>
    save.mutate({ id: c.id, body: { is_approved: value } }, {
      onSuccess: () => toast.success(value ? "Comment approved. It is now public." : "Comment unapproved."),
      onError: (e) => toast.error(getErrorMessage(e)),
    });

  return (
    <>
      <h1 className="mb-3">Comments</h1>
      <div className="mb-3 flex flex-wrap gap-1" role="group" aria-label="Filter comments">
        {TABS.map(([v, l]) => (
          <button key={l} aria-pressed={(params.approved ?? "") === v} onClick={() => setParams({ approved: v })}
            className={`min-h-touch rounded-full border px-3 font-heading text-sm ${(params.approved ?? "") === v ? "border-accent bg-accent text-onAccent" : "border-line text-muted hover:border-accent"}`}>{l}</button>
        ))}
      </div>
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No comments here" skeleton={<Skeleton className="h-12" />}>
        {(d) => (
          <>
            <ul className="space-y-2">
              {d.results.map((c) => (
                <li key={c.id}>
                  <Card className="p-3">
                    <div className="flex flex-wrap items-center gap-1 text-sm">
                      <span className="font-medium">{c.name}</span>
                      <a href={`mailto:${c.email}`} className="text-muted hover:text-accent">{c.email}</a>
                      <span className="text-muted">· {formatDate(c.created_at)}</span>
                      <Badge tone={c.is_approved ? "accent" : "warning"}>{c.is_approved ? "Approved" : "Pending"}</Badge>
                      {c.parent && <Badge>Reply</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted">On <Link to={`/blog/${c.post_slug}`} className="hover:text-accent">{c.post_title}</Link></p>
                    <p className="mt-1 whitespace-pre-wrap break-words">{c.content}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.is_approved
                        ? <Button variant="secondary" onClick={() => setApproved(c, false)} disabled={save.isPending}><FiRotateCcw aria-hidden="true" /> Unapprove</Button>
                        : <Button onClick={() => setApproved(c, true)} disabled={save.isPending}><FiCheck aria-hidden="true" /> Approve</Button>}
                      <Button variant="ghost" onClick={() => setToDelete(c)}><FiTrash2 aria-hidden="true" /> Delete</Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
            <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.comments} onChange={(n) => setParams({ page: n })} />
          </>
        )}
      </QueryBoundary>
      <ConfirmModal open={Boolean(toDelete)} message="Delete this comment permanently?" loading={remove.isPending} onClose={() => setToDelete(null)}
        onConfirm={() => remove.mutate(toDelete.id, {
          onSuccess: () => { toast.success("Comment deleted."); setToDelete(null); },
          onError: (e) => { toast.error(getErrorMessage(e)); setToDelete(null); } })} />
    </>
  );
}