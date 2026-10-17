import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import SearchBox from "@/components/ui/SearchBox";
import { Skeleton } from "@/components/ui/Skeleton";
import ConfirmModal from "./ConfirmModal";
import DataTable, { ActionButton } from "./DataTable";
import ResourceDialog from "./ResourceDialog";
import { useAdminList, useRemove, useSave } from "@/hooks/useAdmin";
import { getErrorMessage } from "@/utils/validators";

export default function ResourcePage({ title, resourceKey, api, columns, fields, searchable = false, rowLabel = (r) => r.name ?? r.title, idOf = (r) => r.id }) {
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState({ open: false, row: null });
  const [toDelete, setToDelete] = useState(null);
  const q = useAdminList(resourceKey, api, searchable ? { search } : {});
  const save = useSave(api);
  const remove = useRemove(api);

  const allColumns = [...columns, {
    key: "actions", header: <span className="sr-only">Actions</span>, className: "w-[1%] whitespace-nowrap",
    render: (r) => (
      <div className="flex">
        <ActionButton icon={FiEdit2} label={`Edit ${rowLabel(r)}`} onClick={() => setDialog({ open: true, row: r })} />
        <ActionButton icon={FiTrash2} label={`Delete ${rowLabel(r)}`} tone="danger" onClick={() => setToDelete(r)} />
      </div>
    ),
  }];

  const confirmDelete = () =>
    remove.mutate(idOf(toDelete), {
      onSuccess: () => { toast.success("Deleted."); setToDelete(null); },
      onError: (err) => { toast.error(getErrorMessage(err)); setToDelete(null); },
    });

  return (
    <section className="mb-6" aria-label={title}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2>{title}</h2>
        <Button onClick={() => setDialog({ open: true, row: null })}><FiPlus aria-hidden="true" /> New</Button>
      </div>
      {searchable && <div className="mb-2 max-w-[400px]"><SearchBox value={search} onCommit={setSearch} placeholder={`Search ${title.toLowerCase()}…`} label={`Search ${title}`} /></div>}
      <QueryBoundary query={q} isEmpty={(d) => (d.results ?? d).length === 0} emptyTitle={`No ${title.toLowerCase()} yet`} skeleton={<Skeleton className="h-12" />}>
        {(d) => <DataTable caption={title} columns={allColumns} rows={d.results ?? d} />}
      </QueryBoundary>
      <ResourceDialog open={dialog.open} onClose={() => setDialog({ open: false, row: null })} title={dialog.row ? `Edit ${title}` : `New ${title}`}
                      fields={fields} row={dialog.row} mutation={save} idOf={idOf} />
      <ConfirmModal open={Boolean(toDelete)} message={toDelete ? `Delete “${rowLabel(toDelete)}”? This cannot be undone.` : ""}
                    loading={remove.isPending} onConfirm={confirmDelete} onClose={() => setToDelete(null)} />
    </section>
  );
}