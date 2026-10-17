import { forwardRef, useId } from "react";

const FIELD = "w-full min-h-touch rounded-md border bg-surface px-2 text-fg placeholder:text-muted transition duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent disabled:opacity-50";

const Input = forwardRef(function Input({ label, error, hint, as: Tag = "input", className = "", id, ...props }, ref) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div className={className}>
      {label && <label htmlFor={fid} className="mb-1 block text-sm font-medium">{label}</label>}
      <Tag
        ref={ref}
        id={fid}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fid}-error` : hint ? `${fid}-hint` : undefined}
        className={`${FIELD} ${Tag === "textarea" ? "min-h-[160px] py-1" : ""} ${error ? "border-danger" : "border-line"}`}
        {...props}
      />
      {hint && !error && <p id={`${fid}-hint`} className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p id={`${fid}-error`} role="alert" className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
});

export default Input;