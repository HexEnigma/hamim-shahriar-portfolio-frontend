import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateComment } from "@/hooks/usePosts";
import { applyServerErrors, commentSchema, getErrorMessage } from "@/utils/validators";

export default function CommentForm({ slug, parentId = null, onCancel }) {
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateComment(slug);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { name: "", email: "", website: "", content: "" },
  });

  const onSubmit = (values) =>
    mutation.mutate({ ...values, parent: parentId }, {
      onSuccess: () => { reset(); setSubmitted(true); toast.success("Your comment is awaiting approval."); },
      onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2" aria-label={parentId ? "Reply form" : "Comment form"}>
      {submitted && (
        <p role="status" className="rounded-md border border-accent bg-surface p-2 text-accent">
          Your comment is awaiting approval. It will appear here once the site owner approves it.
        </p>
      )}
      <div className="grid gap-2 md:grid-cols-2">
        <Input label="Name *" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <Input label="Email *" type="email" autoComplete="email" hint="Never shown publicly." error={errors.email?.message} {...register("email")} />
      </div>
      <Input label="Website (optional)" type="url" error={errors.website?.message} {...register("website")} />
      <Input as="textarea" label="Comment * (5–1000 characters)" error={errors.content?.message} {...register("content")} />
      <div className="flex gap-2">
        <Button type="submit" loading={mutation.isPending}>{parentId ? "Post reply" : "Post comment"}</Button>
        {onCancel && <Button variant="ghost" onClick={onCancel}>Close</Button>}
      </div>
    </form>
  );
}