export default function Pagination({ page, count, pageSize, onChange }) {
  const total = Math.max(1, Math.ceil(count / pageSize));
  if (total <= 1) return null;

  const nums = [...new Set([1, total, page - 1, page, page + 1])].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const items = nums.flatMap((n, i) => (i > 0 && n - nums[i - 1] > 1 ? ["…", n] : [n]));
  const btn = "inline-flex min-h-touch min-w-touch items-center justify-center rounded-md border px-2 font-heading text-sm transition duration-base disabled:opacity-50";

  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-1">
      <button className={`${btn} border-line hover:border-accent`} disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      {items.map((n, i) =>
        n === "…" ? (
          <span key={`gap${i}`} className="px-1 text-muted" aria-hidden="true">…</span>
        ) : (
          <button
            key={n}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${n === page ? "border-accent bg-accent text-onAccent" : "border-line hover:border-accent"}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        )
      )}
      <button className={`${btn} border-line hover:border-accent`} disabled={page >= total} onClick={() => onChange(page + 1)}>Next</button>
    </nav>
  );
}