const TONES = {
  default: "border-line bg-surface2 text-muted",
  accent: "border-accent bg-surface text-accent",
  warning: "border-warning bg-surface text-warning",
};

export default function Badge({ tone = "default", className = "", ...props }) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-px text-xs font-medium ${TONES[tone]} ${className}`} {...props} />;
}