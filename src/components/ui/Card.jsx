export default function Card({ as: Tag = "div", hover = false, className = "", ...props }) {
  const lift = hover ? "transition duration-base hover:-translate-y-[2px] hover:border-accent hover:shadow-md" : "";
  return <Tag className={`relative rounded-lg border border-line bg-glass shadow-sm ${lift} ${className}`} {...props} />;
}