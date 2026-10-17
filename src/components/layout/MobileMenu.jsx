import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function MobileMenu({ links, open, onClose }) {
  const { pathname } = useLocation();
  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-surface px-2 pb-2 md:hidden">
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex min-h-touch items-center font-heading text-sm ${isActive ? "text-accent" : "text-fg"}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}