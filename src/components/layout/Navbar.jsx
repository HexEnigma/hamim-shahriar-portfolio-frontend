import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import PageContainer from "./PageContainer";
import MobileMenu from "./MobileMenu";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProfile } from "@/hooks/usePortfolio";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const BASE_LINKS = [
  { to: "/", label: "Home" }, { to: "/about", label: "About" }, { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" }, { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: profile } = useProfile();
  const { theme, toggle } = useTheme();
  const { isOwner } = useAuth();
  const links = isOwner ? [...BASE_LINKS, { to: "/dashboard", label: "Dashboard" }] : BASE_LINKS;
  const iconBtn = "inline-flex min-h-touch min-w-touch items-center justify-center rounded-md text-muted transition duration-base hover:bg-surface2 hover:text-accent";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-glass backdrop-blur-sm">
      <PageContainer className="flex h-8 items-center justify-between">
        <Link to="/" className="flex min-h-touch items-center gap-1 font-heading font-bold">
          <span className="text-accent" aria-hidden="true">&gt;_</span>
          {profile ? <span className="truncate">{profile.full_name}</span> : <Skeleton className="h-2 w-12" />}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-3 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex min-h-touch items-center border-b-2 font-heading text-sm transition duration-base ${isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-accent"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button onClick={toggle} className={iconBtn} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`${iconBtn} md:hidden`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </PageContainer>
      <MobileMenu links={links} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}