import { useState } from "react";

export default function Avatar({ src, name = "", className = "" }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  // If no URL, or if the current URL failed to load, show initials
  if (!src || src === failedUrl) {
    return (
      <div role="img" aria-label={name || "No photo"} className={`grid place-items-center bg-surface2 font-heading text-accent ${className}`}>
        <span className="text-xl">{initials || "·"}</span>
      </div>
    );
  }

  // Otherwise, render the image. If it breaks, trigger onError.
  return (
    <img 
      src={src} 
      alt={name ? `Photo of ${name}` : "Profile photo"} 
      onError={() => setFailedUrl(src)} 
      className={`object-cover ${className}`} 
    />
  );
}