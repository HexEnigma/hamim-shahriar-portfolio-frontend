import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  const titleId = useId();

  // Move this into a useEffect to satisfy the linter
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const el = ref.current;
    (el.querySelector(FOCUSABLE) ?? el).focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key !== "Tab") return;
      const items = [...el.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-2" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}
           className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-lg border border-line bg-surface p-4 shadow-lg">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h2 id={titleId} className="text-lg">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog" className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-md text-muted hover:text-accent"><FiX size={20} /></button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}