import { FiAlertTriangle, FiInbox } from "react-icons/fi";
import Button from "./Button";

export function EmptyState({ title, message, action }) {
  return (
    <div className="rounded-lg border border-dashed border-line p-6 text-center">
      <FiInbox size={32} className="mx-auto text-muted" aria-hidden="true" />
      <h3 className="mt-2">{title}</h3>
      {message && <p className="mt-1 text-muted">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-danger p-6 text-center">
      <FiAlertTriangle size={32} className="mx-auto text-danger" aria-hidden="true" />
      <h3 className="mt-2">Couldn’t load this content</h3>
      <p className="mt-1 text-muted">{message}</p>
      <Button className="mt-3" variant="secondary" onClick={() => onRetry?.()}>Retry</Button>
    </div>
  );
}