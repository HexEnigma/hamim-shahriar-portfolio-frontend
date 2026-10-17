export default function Avatar({ src, name = "", className = "" }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  if (src) return <img src={src} alt={name ? `Photo of ${name}` : "Profile photo"} className={`object-cover ${className}`} />;
  return (
    <div role="img" aria-label={name || "No photo"} className={`grid place-items-center bg-surface2 font-heading text-accent ${className}`}>
      <span className="text-xl">{initials || "·"}</span>
    </div>
  );
}