import { Link } from "react-router-dom";

export function ActionButton({ icon: Icon, label, onClick, to, tone = "default", disabled }) {
  const cls = `inline-flex min-h-touch min-w-touch items-center justify-center rounded-md transition duration-base disabled:opacity-50 ${tone === "danger" ? "text-danger hover:bg-surface2" : "text-muted hover:bg-surface2 hover:text-accent"}`;
  return to ? (
    <Link to={to} aria-label={label} title={label} className={cls}><Icon size={18} /></Link>
  ) : (
    <button type="button" onClick={onClick} aria-label={label} title={label} disabled={disabled} className={cls}><Icon size={18} /></button>
  );
}

export default function DataTable({ columns, rows, rowKey = (r) => r.id, caption }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-glass">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-line bg-surface2 font-heading text-xs text-muted">
          <tr>{columns.map((c) => <th key={c.key} scope="col" className={`px-2 py-1 font-medium ${c.className ?? ""}`}>{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b border-line last:border-0">
              {columns.map((c) => <td key={c.key} className={`px-2 py-1 align-middle ${c.className ?? ""}`}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}