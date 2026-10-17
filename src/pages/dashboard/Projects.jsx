import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { projectsApi } from "@/api/projects";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import DataTable, { ActionButton } from "@/components/dashboard/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import SearchBox from "@/components/ui/SearchBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminList, useRemove } from "@/hooks/useAdmin";
import useQueryParams from "@/hooks/useQueryParams";
import { PAGE_SIZES, PROJECT_STATUS_LABELS } from "@/utils/constants";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/validators";

export default function Projects() {
  const [params, setParams] = useQueryParams();
  const page = Number(params.page) || 1;
  const q = useAdminList("projects", projectsApi, { search: params.search, page });
  const remove = useRemove(projectsApi);
  const [toDelete, setToDelete] = useState(null);

  const columns = [
    { key: "title", header: "Title", render: (p) => <Link to={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link> },
    { key: "category", header: "Category" },
    { key: "status", header: "Status", render: (p) => <Badge tone={p.status === "IN_PROGRESS" ? "warning" : "accent"}>{PROJECT_STATUS_LABELS[p.status]}</Badge> },
    { key: "is_featured", header: "Featured", render: (p) => (p.is_featured ? "Yes" : "—") },
    { key: "completed_date", header: "Completed", render: (p) => formatDate(p.completed_date) || "—" },
    { key: "actions", header: <span className="sr-only">Actions</span>, className: "whitespace-nowrap", render: (p) => (
      <div className="flex">
        <ActionButton icon={FiEdit2} label={`Edit ${p.title}`} to={`/dashboard/projects/${p.slug}/edit`} />
        <ActionButton icon={FiTrash2} label={`Delete ${p.title}`} tone="danger" onClick={() => setToDelete(p)} />
      </div>) },
  ];

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1>Projects</h1><Button to="/dashboard/projects/new"><FiPlus aria-hidden="true" /> New project</Button>
      </div>
      <div className="mb-2 max-w-[400px]"><SearchBox value={params.search ?? ""} onCommit={(v) => setParams({ search: v })} placeholder="Search projects…" label="Search projects" /></div>
      <QueryBoundary query={q} isEmpty={(d) => d.results.length === 0} emptyTitle="No projects found" skeleton={<Skeleton className="h-12" />}>
        {(d) => (<><DataTable caption="Projects" columns={columns} rows={d.results} />
          <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.projects} onChange={(n) => setParams({ page: n })} /></>)}
      </QueryBoundary>
      <ConfirmModal open={Boolean(toDelete)} message={toDelete ? `Delete “${toDelete.title}”?` : ""} loading={remove.isPending} onClose={() => setToDelete(null)}
        onConfirm={() => remove.mutate(toDelete.slug, {
          onSuccess: () => { toast.success("Project deleted."); setToDelete(null); },
          onError: (e) => { toast.error(getErrorMessage(e)); setToDelete(null); } })} />
    </>
  );
}