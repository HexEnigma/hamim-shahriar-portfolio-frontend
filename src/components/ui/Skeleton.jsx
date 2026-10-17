import { FiLoader } from "react-icons/fi";

export const Skeleton = ({ className = "" }) => (
  <div aria-hidden="true" className={`animate-pulse rounded-md bg-surface2 ${className}`} />
);

export const CardGridSkeleton = ({ count = 3 }) => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="overflow-hidden rounded-lg border border-line bg-glass">
        <Skeleton className="aspect-video rounded-none" />
        <div className="space-y-1 p-2"><Skeleton className="h-2 w-1/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-2 w-2/3" /></div>
      </div>
    ))}
  </div>
);

export const Spinner = ({ fullPage = false }) => (
  <div className={`grid place-items-center ${fullPage ? "min-h-screen" : "p-6"}`} role="status" aria-label="Loading">
    <FiLoader size={32} className="animate-spin text-accent" aria-hidden="true" />
  </div>
);