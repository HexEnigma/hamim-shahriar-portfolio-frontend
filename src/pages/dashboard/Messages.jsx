import { useState } from "react";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { contactApi } from "@/api/contact";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
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

export default function Messages() {
  const [params, setParams] = useQueryParams();
  const page = Number(params.page) || 1;
  const unreadOnly = params.unread === "1";
  const q = useAdminList("contact", contactApi, { is_read: unreadOnly ? "false" : "", page });
  const save = useSave(contactApi);
  const remove = useRemove(contactApi);
  const [open, setOpen] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const markRead = (m) => save.mutate({ id: m.id, body: { is_read: true } }, { onError: (e) => toast.error(getErrorMessage(e)) });
  const toggleOpen = (m) => { const next = open === m.id ? null : m.id; setOpen(next); if (next && !m.is_read) markRead(m); };

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1>Messages</h1>
        <label className="flex min-h-touch items-center gap-1 text-sm">
          <input type="checkbox" className="h-2 w-2 accent-[var(--accent)]" checked={unreadOnly} onChange={(e) => setParams({ unread: e.target.checked ? "1" : "" })} /> Unread only
        </label>
      </div>
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No messages" skeleton={<Skeleton className="h-12" />}>
        {(d) => (
          <>
            <ul className="space-y-2">
              {d.results.map((m) => (
                <li key={m.id}>
                  <Card className="p-3">
                    <button onClick={() => toggleOpen(m)} aria-expanded={open === m.id} className="flex min-h-touch w-full items-center gap-2 text-left">
                      {!m.is_read && <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
                      <span className={`min-w-0 flex-1 truncate ${m.is_read ? "" : "font-bold"}`}>{m.subject}</span>
                      <span className="hidden shrink-0 text-sm text-muted sm:inline">{m.name} · {formatDate(m.created_at)}</span>
                    </button>
                    {open === m.id && (
                      <div className="mt-2 border-t border-line pt-2">
                        <p className="text-sm text-muted">{m.name} · <a href={`mailto:${m.email}`} className="hover:text-accent">{m.email}</a> · {formatDate(m.created_at)}</p>
                        <p className="mt-2 whitespace-pre-wrap break-words">{m.message}</p>
                        <div className="mt-2 flex gap-1">
                          {!m.is_read && <Button variant="secondary" onClick={() => markRead(m)}><FiCheck aria-hidden="true" /> Mark read</Button>}
                          <Button variant="ghost" onClick={() => setToDelete(m)}><FiTrash2 aria-hidden="true" /> Delete</Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
            <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.messages} onChange={(n) => setParams({ page: n })} />
          </>
        )}
      </QueryBoundary>
      <ConfirmModal open={Boolean(toDelete)} message="Delete this message permanently?" loading={remove.isPending} onClose={() => setToDelete(null)}
        onConfirm={() => remove.mutate(toDelete.id, {
          onSuccess: () => { toast.success("Message deleted."); setToDelete(null); },
          onError: (e) => { toast.error(getErrorMessage(e)); setToDelete(null); } })} />
    </>
  );
}