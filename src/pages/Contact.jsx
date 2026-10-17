import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSendContact } from "@/hooks/useContact";
import usePageMeta from "@/hooks/usePageMeta";
import { applyServerErrors, contactSchema, getErrorMessage } from "@/utils/validators";

export default function Contact() {
  usePageMeta("Contact", "Get in touch.");
  const [sent, setSent] = useState(false);
  const mutation = useSendContact();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (values) =>
    mutation.mutate(values, {
      onSuccess: () => { reset(); setSent(true); },
      onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
    });

  return (
    <>
      <PageHeader eyebrow="// contact" title="Get in touch" intro="Send me a message and I’ll reply as soon as I can." />
      <PageContainer className="py-4 pb-section">
        <div className="max-w-[640px]">
          {sent ? (
            <div role="status" className="rounded-lg border border-accent bg-glass p-6 text-center">
              <FiCheckCircle size={32} className="mx-auto text-accent" aria-hidden="true" />
              <h2 className="mt-2">Message sent</h2>
              <p className="mt-1 text-muted">Thanks for reaching out. I’ll get back to you soon.</p>
              <Button variant="secondary" className="mt-3" onClick={() => setSent(false)}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Input label="Name *" autoComplete="name" error={errors.name?.message} {...register("name")} />
                <Input label="Email *" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
              </div>
              <Input label="Subject *" error={errors.subject?.message} {...register("subject")} />
              <Input as="textarea" label="Message * (10–2000 characters)" error={errors.message?.message} {...register("message")} />
              <Button type="submit" loading={mutation.isPending}>Send message</Button>
            </form>
          )}
        </div>
      </PageContainer>
    </>
  );
}