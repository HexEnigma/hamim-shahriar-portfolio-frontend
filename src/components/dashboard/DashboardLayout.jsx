import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiExternalLink, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useStats } from "@/hooks/useAdmin";
import usePageMeta from "@/hooks/usePageMeta";

export default function DashboardLayout() {
  usePageMeta("Dashboard");
  const { logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const { data: stats } = useStats();
  const btn = "inline-flex min-h-touch items-center gap-1 rounded-md px-2 text-sm text-muted hover:bg-surface2 hover:text-accent";

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-glass">
        <PageContainer className="flex h-8 items-center justify-between">
          <p className="font-heading font-bold"><span className="text-accent">&gt;_</span> dashboard</p>
          <div className="flex items-center">
            <Link to="/" className={btn}><FiExternalLink aria-hidden="true" /> <span className="hidden sm:inline">View site</span></Link>
            <button onClick={toggle} className={btn} aria-label="Toggle theme">{theme === "dark" ? <FiSun /> : <FiMoon />}</button>
            <button onClick={async () => { await logout(); navigate("/login", { replace: true }); }} className={btn}><FiLogOut aria-hidden="true" /> Log out</button>
          </div>
        </PageContainer>
      </header>
      <PageContainer className="py-4 md:grid md:grid-cols-[220px_1fr] md:gap-4">
        <Sidebar stats={stats} />
        <main className="mt-3 min-w-0 md:mt-0"><Outlet /></main>
      </PageContainer>
    </div>
  );
}