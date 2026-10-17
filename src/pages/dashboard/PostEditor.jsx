import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { postsApi } from "@/api/posts";
import FormField from "@/components/dashboard/FormField";
import ImageUploader from "@/components/dashboard/ImageUploader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Markdown from "@/components/ui/Markdown";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useInvalidateAll } from "@/hooks/useAdmin";
import { useCategories, usePost, useTags } from "@/hooks/usePosts";
import { saveWithFiles } from "@/utils/forms";
import { applyServerErrors, getErrorMessage } from "@/utils/validators";

function PostForm({ post }) {
  const navigate = useNavigate();
  const invalidate = useInvalidateAll();
  const categories = useCategories();
  const tags = useTags();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  
  const { register, control, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title ?? "", excerpt: post?.excerpt ?? "", content: post?.content ?? "",
      cover_image_url: post?.cover_image_url ?? "",
      category: post?.category ? String(post.category.id) : "", tags: post?.tags.map((t) => t.id) ?? [],
      status: post?.status ?? "DRAFT", is_featured: post?.is_featured ?? false,
    },
  });

  // Use useWatch instead of watch to satisfy the React Compiler
  const excerptValue = useWatch({ control, name: "excerpt" });
  const contentValue = useWatch({ control, name: "content" });
  const excerptLen = excerptValue?.length ?? 0;

  const save = useMutation({
    mutationFn: (values) => saveWithFiles(postsApi, post?.slug ?? null, values, { cover_image: file }, ["tags"]),
    onSuccess: () => { invalidate(); toast.success(post ? "Post updated." : "Post created."); navigate("/dashboard/posts"); },
    onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
  });
  
  const onSubmit = (v) => save.mutate({ ...v, category: v.category ? Number(v.category) : null });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[800px] space-y-3">
      <FormField f={{ name: "title", label: "Title *", rules: { required: "Title is required.", minLength: { value: 5, message: "Title must be at least 5 characters." } } }} register={register} errors={errors} />
      <p className="text-sm text-muted">Slug (read-only): {post ? post.slug : "generated from the title"}</p>
      <FormField f={{ name: "excerpt", label: `Excerpt * (${excerptLen}/300)`, type: "textarea", rules: { required: "Excerpt is required.", maxLength: { value: 300, message: "Excerpt must be 300 characters or fewer." } } }} register={register} errors={errors} />
      <div className="grid gap-2 md:grid-cols-2">
        <Input as="select" label="Category (required to publish)" error={errors.category?.message} {...register("category")}>
          <option value="">— choose —</option>
          {(categories.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Input>
        <Input as="select" label="Status" error={errors.status?.message} {...register("status")}>
          <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
        </Input>
      </div>
      <Controller name="tags" control={control} render={({ field }) => (
        <fieldset>
          <legend className="mb-1 text-sm font-medium">Tags</legend>
          <div className="flex flex-wrap gap-1">
            {(tags.data ?? []).map((t) => {
              const on = field.value.includes(t.id);
              return (
                <button key={t.id} type="button" aria-pressed={on}
                  onClick={() => field.onChange(on ? field.value.filter((x) => x !== t.id) : [...field.value, t.id])}
                  className={`min-h-touch rounded-full border px-2 text-sm ${on ? "border-accent bg-accent text-onAccent" : "border-line text-muted hover:border-accent"}`}>#{t.name}</button>
              );
            })}
          </div>
          {errors.tags && <p role="alert" className="mt-1 text-sm text-danger">{errors.tags.message}</p>}
        </fieldset>
      )} />
            {/* ADD THIS INPUT RIGHT ABOVE IMAGE UPLOADER */}
      <Input label="Cover Image URL (optional)" type="url" {...register("cover_image_url")} />
      <ImageUploader label="Cover image" currentUrl={post?.cover_image} file={file} onChange={setFile} error={errors.cover_image?.message} />
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="content" className="text-sm font-medium">Content * (Markdown, 100+ characters to publish)</label>
          <Button variant="ghost" onClick={() => setPreview((p) => !p)}>{preview ? "Edit" : "Preview"}</Button>
        </div>
        {preview ? <div className="rounded-md border border-line p-2"><Markdown>{contentValue}</Markdown></div>
                 : <Input as="textarea" id="content" className="[&_textarea]:min-h-[320px]" error={errors.content?.message} {...register("content")} />}
      </div>
      <FormField f={{ name: "is_featured", label: "Featured post", type: "checkbox" }} register={register} errors={errors} />
      <div className="flex gap-2">
        <Button type="submit" loading={save.isPending}>{post ? "Save changes" : "Create post"}</Button>
        <Button variant="ghost" to="/dashboard/posts">Cancel</Button>
      </div>
    </form>
  );
}

export default function PostEditor() {
  const { slug } = useParams();
  const q = usePost(slug ?? "");
  return (
    <>
      <p className="mb-1 text-sm"><Link to="/dashboard/posts" className="text-muted hover:text-accent">← Posts</Link></p>
      <h1 className="mb-3">{slug ? "Edit post" : "New post"}</h1>
      {slug ? <QueryBoundary query={q} skeleton={<Skeleton className="h-12" />}>{(post) => <PostForm key={post.updated_at} post={post} />}</QueryBoundary> : <PostForm />}
    </>
  );
}