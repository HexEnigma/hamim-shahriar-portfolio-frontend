import Input from "@/components/ui/Input";

export default function FormField({ f, register, errors }) {
  const error = errors[f.name]?.message;
  const reg = register(f.name, f.rules);
  if (f.type === "checkbox") {
    return (
      <div>
        <label className="flex min-h-touch items-center gap-1">
          <input type="checkbox" className="h-2 w-2 accent-[var(--accent)]" {...reg} />
          <span className="text-sm">{f.label}</span>
        </label>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      </div>
    );
  }
  if (f.type === "select") {
    return <Input as="select" label={f.label} error={error} {...reg}>{f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</Input>;
  }
  if (f.type === "textarea") return <Input as="textarea" label={f.label} hint={f.hint} error={error} {...reg} />;
  return <Input type={f.type ?? "text"} label={f.label} hint={f.hint} error={error} {...reg} />;
}