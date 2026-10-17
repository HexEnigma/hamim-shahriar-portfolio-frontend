import { FiHeart } from "react-icons/fi";
import { toast } from "sonner";
import { useToggleLike } from "@/hooks/usePosts";
import { getErrorMessage } from "@/utils/validators";

export default function LikeButton({ post }) {
  const like = useToggleLike(post.slug);
  return (
    <button
      onClick={() => like.mutate(undefined, { onError: (e) => toast.error(getErrorMessage(e, "Couldn’t update your like.")) })}
      aria-pressed={post.is_liked}
      aria-label={post.is_liked ? "Unlike this post" : "Like this post"}
      className={`inline-flex min-h-touch items-center gap-1 rounded-md border px-3 font-heading text-sm transition duration-base ${post.is_liked ? "border-accent text-accent" : "border-line text-muted hover:border-accent hover:text-accent"}`}
    >
      <FiHeart key={String(post.is_liked)} size={20} fill={post.is_liked ? "currentColor" : "none"} className={post.is_liked ? "animate-pop" : ""} aria-hidden="true" />
      <span>{post.likes_count}</span>
    </button>
  );
}