import { EmptyState, ErrorState } from "./EmptyState";
import { getErrorMessage } from "@/utils/validators";

export default function QueryBoundary({ query, skeleton, isEmpty, emptyTitle = "Nothing here yet", emptyMessage, children }) {
  if (query.isPending) return skeleton;
  if (query.isError) return <ErrorState message={getErrorMessage(query.error)} onRetry={query.refetch} />;
  if (isEmpty?.(query.data)) return <EmptyState title={emptyTitle} message={emptyMessage} />;
  return children(query.data);
}