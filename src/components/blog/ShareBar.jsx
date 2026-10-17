import { FiCopy, FiShare2 } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const btn = "inline-flex min-h-touch min-w-touch items-center justify-center rounded-md border border-line text-muted transition duration-base hover:border-accent hover:text-accent";

export default function ShareBar({ title }) {
  const url = window.location.href;
  const copy = () =>
    navigator.clipboard.writeText(url).then(() => toast.success("Link copied")).catch(() => toast.error("Couldn’t copy the link"));
  const nativeShare = () => navigator.share?.({ title, url }).catch(() => {});

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Share this post">
      <button onClick={copy} className={btn} aria-label="Copy link"><FiCopy size={20} /></button>
      <a className={btn} aria-label="Share on X" target="_blank" rel="noopener noreferrer"
         href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}><FaXTwitter size={20} /></a>
      <a className={btn} aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer"
         href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}><FaLinkedinIn size={20} /></a>
      {typeof navigator !== "undefined" && navigator.share && (
        <button onClick={nativeShare} className={btn} aria-label="Share"><FiShare2 size={20} /></button>
      )}
    </div>
  );
}