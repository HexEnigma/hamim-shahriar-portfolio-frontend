import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { projectsApi } from "@/api/projects";
import FormField from "@/components/dashboard/FormField";
import ImageUploader from "@/components/dashboard/ImageUploader";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useInvalidateAll } from "@/hooks/useAdmin";
import { useProject, useSkills } from "@/hooks/usePortfolio";
import { PROJECT_CATEGORIES } from "@/utils/constants";
import { saveWithFiles } from "@/utils/forms";
import { applyServerErrors, getErrorMessage } from "@/utils/validators";

const FIELDS = [
  { name: "title", label: "Title *", rules: { required: "Title is required." } },
  { name: "summary", label: "Summary * (max 200 characters)", rules: { required: "Summary is required.", maxLength: { value: 200, message: "Summary must be 200 characters or fewer." } } },
  { name: "cover_image_url", label: "Cover Image URL (optional)", type: "url" },
  { name: "category", label: "Category", type: "select", options: PROJECT_CATEGORIES },
  { name: "status", label: "Status", type: "select", options: [["COMPLETED", "Completed"], ["IN_PROGRESS", "In progress"]] },
  { name: "live_url", label: "Live URL", type: "url", hint: "Provide a live URL or a GitHub URL (at least one)." },
  { name: "github_url", label: "GitHub URL", type: "url" },
  { name: "completed_date", label: "Completed date", type: "date" },
  { name: "display_order", label: "Display order", type: "number" },
  { name: "description", label: "Description * (Markdown). Separate what is implemented from what is planned.", type: "textarea", rules: { required: "Description is required." } },
  { name: "is_featured", label: "Featured on the home page", type: "checkbox" },
];

function ProjectForm({ project }) {
  const navigate = useNavigate();
  const invalidate = useInvalidateAll();
  const skills = useSkills();
  const [file, setFile] = useState(null);
  const { register, control, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      title: project?.title ?? "", summary: project?.summary ?? "", description: project?.description ?? "",
      category: project?.category ?? "WEB", status: project?.status ?? "COMPLETED",
      live_url: project?.live_url ?? "", github_url: project?.github_url ?? "", completed_date: project?.completed_date ?? "",
      display_order: project?.display_order ?? 0, is_featured: project?.is_featured ?? false,
      tech_stack_ids: project?.tech_stack.map((s) => s.id) ?? [],
    },
  });

  const save = useMutation({
    mutationFn: (v) => saveWithFiles(projectsApi, project?.slug ?? null, v, { cover_image: file }, ["tech_stack_ids"]),
    onSuccess: () => { invalidate(); toast.success(project ? "Project updated." : "Project created."); navigate("/dashboard/projects"); },
    onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
  });
  const onSubmit = (v) => save.mutate({ ...v, completed_date: v.completed_date || null, display_order: Number(v.display_order) || 0 });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[800px] space-y-3">
      {FIELDS.map((f) => <FormField key={f.name} f={f} register={register} errors={errors} />)}
      <Controller name="tech_stack_ids" control={control} render={({ field }) => (
        <fieldset>
          <legend className="mb-1 text-sm font-medium">Tech stack (from your skills)</legend>
          <div className="flex flex-wrap gap-1">
            {(skills.data ?? []).map((s) => {
              const on = field.value.includes(s.id);
              return <button key={s.id} type="button" aria-pressed={on}
                onClick={() => field.onChange(on ? field.value.filter((x) => x !== s.id) : [...field.value, s.id])}
                className={`min-h-touch rounded-full border px-2 text-sm ${on ? "border-accent bg-accent text-onAccent" : "border-line text-muted hover:border-accent"}`}>{s.name}</button>;
            })}
          </div>
        </fieldset>
      )} />
      <ImageUploader label="Cover screenshot" currentUrl={project?.cover_image} file={file} onChange={setFile} error={errors.cover_image?.message} />
      <div className="flex gap-2">
        <Button type="submit" loading={save.isPending}>{project ? "Save changes" : "Create project"}</Button>
        <Button variant="ghost" to="/dashboard/projects">Cancel</Button>
      </div>
    </form>
  );
}

export default function ProjectEditor() {
  const { slug } = useParams();
  const q = useProject(slug ?? "");
  return (
    <>
      <p className="mb-1 text-sm"><Link to="/dashboard/projects" className="text-muted hover:text-accent">← Projects</Link></p>
      <h1 className="mb-3">{slug ? "Edit project" : "New project"}</h1>
      {slug ? <QueryBoundary query={q} skeleton={<Skeleton className="h-12" />}>{(p) => <ProjectForm key={p.updated_at} project={p} />}</QueryBoundary> : <ProjectForm />}
    </>
  );
}