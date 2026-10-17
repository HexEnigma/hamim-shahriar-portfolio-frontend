import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { profileApi } from "@/api/profile";
import FormField from "@/components/dashboard/FormField";
import ImageUploader from "@/components/dashboard/ImageUploader";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useInvalidateAll } from "@/hooks/useAdmin";
import { useProfile } from "@/hooks/usePortfolio";
import { toFormData } from "@/utils/forms";
import { applyServerErrors, getErrorMessage } from "@/utils/validators";

const FIELDS = [
  { name: "full_name", label: "Full name *", rules: { required: "Full name is required." } },
  { name: "headline", label: "Headline *", rules: { required: "Headline is required." } },
  { name: "bio", label: "Bio (4–8 lines, your own words)", type: "textarea" },
  { name: "email", label: "Public email", type: "email" }, { name: "phone", label: "Phone" }, { name: "location", label: "Location" },
  { name: "github_url", label: "GitHub URL", type: "url" }, { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
  { name: "x_url", label: "X URL", type: "url" }, { name: "website_url", label: "Website URL", type: "url" },
  { name: "years_of_experience", label: "Years of experience", type: "number", rules: { min: { value: 0, message: "Cannot be negative." } } },
  { name: "is_available_for_hire", label: "Available for hire", type: "checkbox" },
];

function ProfileForm({ profile }) {
  const invalidate = useInvalidateAll();
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: Object.fromEntries(FIELDS.map((f) => [f.name, profile[f.name] ?? (f.type === "checkbox" ? false : "")])),
  });

  const save = useMutation({
    mutationFn: (values) => profileApi.update(avatar || resume ? toFormData({ ...values, avatar, resume }) : values),
    onSuccess: () => { invalidate(); setAvatar(null); setResume(null); toast.success("Profile saved."); },
    onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
  });
  const onSubmit = (v) => save.mutate({ ...v, years_of_experience: Number(v.years_of_experience) || 0 });

  const pickResume = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".pdf")) return setResumeError("Resume must be a PDF file.");
    if (f.size > 5 * 1024 * 1024) return setResumeError("Resume must be 5 MB or smaller.");
    setResumeError(""); setResume(f);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[800px] space-y-3">
      {FIELDS.map((f) => <FormField key={f.name} f={f} register={register} errors={errors} />)}
      <ImageUploader label="Profile photo" aspect="aspect-square" currentUrl={profile.avatar} file={avatar} onChange={setAvatar} error={errors.avatar?.message} />
      <div>
        <label htmlFor="resume" className="mb-1 block text-sm font-medium">Resume (PDF, up to 5 MB)</label>
        <input id="resume" type="file" accept="application/pdf,.pdf" onChange={pickResume} className="block w-full min-h-touch text-sm" />
        {resume && <p className="mt-1 text-sm text-muted">Selected: {resume.name}</p>}
        {profile.resume && !resume && <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-accent">View current resume</a>}
        {(resumeError || errors.resume?.message) && <p role="alert" className="mt-1 text-sm text-danger">{resumeError || errors.resume.message}</p>}
      </div>
      <Button type="submit" loading={save.isPending}>Save profile</Button>
    </form>
  );
}

function PasswordForm() {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({ defaultValues: { old_password: "", new_password: "", confirm: "" } });
  const change = useMutation({ mutationFn: (b) => authApi.changePassword(b) });
  const onSubmit = ({ old_password, new_password, confirm }) => {
    if (new_password !== confirm) return setError("confirm", { message: "Passwords do not match." });
    change.mutate({ old_password, new_password }, {
      onSuccess: () => { reset(); toast.success("Password changed."); },
      onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[400px] space-y-2">
      <FormField f={{ name: "old_password", label: "Current password", type: "password", rules: { required: "Enter your current password." } }} register={register} errors={errors} />
      <FormField f={{ name: "new_password", label: "New password", type: "password", rules: { required: "Enter a new password." } }} register={register} errors={errors} />
      <FormField f={{ name: "confirm", label: "Confirm new password", type: "password", rules: { required: "Confirm the new password." } }} register={register} errors={errors} />
      <Button type="submit" loading={change.isPending}>Change password</Button>
    </form>
  );
}

export default function ProfilePage() {
  const q = useProfile();
  return (
    <>
      <h1 className="mb-3">Profile</h1>
      <QueryBoundary query={q} skeleton={<Skeleton className="h-12" />}>{(p) => <ProfileForm key={p.updated_at} profile={p} />}</QueryBoundary>
      <h2 className="mb-2 mt-6">Change password</h2>
      <PasswordForm />
    </>
  );
}