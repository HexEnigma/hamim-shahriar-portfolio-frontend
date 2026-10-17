import { NavLink } from "react-router-dom";
import { FiBriefcase, FiFileText, FiFolder, FiGrid, FiMail, FiMessageSquare, FiTag, FiTool, FiUser } from "react-icons/fi";

const NAV = [
  ["/dashboard", "Overview", FiGrid, true], ["/dashboard/posts", "Posts", FiFileText], ["/dashboard/projects", "Projects", FiFolder],
  ["/dashboard/skills", "Skills", FiTool], ["/dashboard/experience", "Experience", FiBriefcase], ["/dashboard/taxonomy", "Taxonomy", FiTag],
  ["/dashboard/comments", "Comments", FiMessageSquare, false, "pending_comments"], ["/dashboard/messages", "Messages", FiMail, false, "unread_messages"],
  ["/dashboard/profile", "Profile", FiUser],
];

export default function Sidebar({ stats }) {
  return (
    <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto border-b border-line pb-1 md:flex-col md:overflow-visible md:border-0 md:pb-0">
      {NAV.map(([to, label, Icon, end, badgeKey]) => {
        const badge = badgeKey ? stats?.[badgeKey] : 0;
        return (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `flex min-h-touch shrink-0 items-center gap-1 rounded-md px-2 text-sm transition duration-base ${isActive ? "bg-surface2 text-accent" : "text-muted hover:text-accent"}`}>
            <Icon size={18} aria-hidden="true" /> {label}
            {badge > 0 && <span className="ml-auto rounded-full bg-accent px-1 text-xs text-onAccent" aria-label={`${badge} new`}>{badge}</span>}
          </NavLink>
        );
      })}
    </nav>
  );
}