import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const VARIANTS = {
  primary: "bg-accent text-onAccent hover:bg-accentHover",
  secondary: "border border-line bg-surface text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:bg-surface2 hover:text-accent",
  danger: "bg-danger text-onAccent hover:opacity-90",
};

export default function Button({ to, href, variant = "primary", loading = false, disabled = false, type = "button", className = "", children, ...rest }) {
  const cls = `inline-flex min-h-touch items-center justify-center gap-1 rounded-md px-3 font-heading text-sm font-medium transition duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <FiLoader className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}