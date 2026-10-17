import { useState } from "react";
import CommentForm from "./CommentForm";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useComments } from "@/hooks/usePosts";
import { formatDate } from "@/utils/formatDate";
import { PAGE_SIZES } from "@/utils/constants";

function Item({ comment: c, onReply }) {
  return (
    <div className="flex gap-2">
      <Avatar name={c.name} className="h-6 w-6 shrink-0 rounded-full border border-line text-sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-medium">
            {c.website ? <a href={c.website} target="_blank" rel="nofollow ugc noopener noreferrer" className="hover:text-accent">{c.name}</a> : c.name}
          </span>
          <span className="ml-1 text-muted">· {formatDate(c.created_at)}</span>
        </p>
        <p className="mt-1 whitespace-pre-wrap break-words">{c.content}</p>
        {onReply && <Button variant="ghost" className="-ml-2" onClick={onReply}>Reply</Button>}
      </div>
    </div>
  );
}

export default function CommentList({ slug }) {
  const [page, setPage] = useState(1);
  const [replyTo, setReplyTo] = useState(null);
  const q = useComments(slug, page);

  return (
    <QueryBoundary
      query={q}
      isEmpty={(d) => d.results.length === 0}
      emptyTitle="No comments yet"
      emptyMessage="Be the first to share your thoughts."
      skeleton={<div className="space-y-2"><Skeleton className="h-8" /><Skeleton className="h-8" /></div>}
    >
      {(d) => (
        <>
          <ul className="space-y-3">
            {d.results.map((c) => (
              <li key={c.id}>
                <Item comment={c} slug={slug} onReply={() => setReplyTo(replyTo === c.id ? null : c.id)} />
                {c.replies.length > 0 && (
                  <ul className="ml-3 mt-2 space-y-2 border-l border-line pl-3">
                    {c.replies.map((r) => <li key={r.id}><Item comment={r} slug={slug} /></li>)}
                  </ul>
                )}
                {replyTo === c.id && <div className="ml-3 mt-2"><CommentForm slug={slug} parentId={c.id} onCancel={() => setReplyTo(null)} /></div>}
              </li>
            ))}
          </ul>
          <Pagination page={page} count={d.count} pageSize={PAGE_SIZES.comments} onChange={setPage} />
        </>
      )}
    </QueryBoundary>
  );
}