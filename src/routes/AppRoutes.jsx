import { Route, Routes } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

function DashboardPlaceholder() {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <h1>Dashboard (placeholder)</h1>
      <p className="mt-1 text-muted">Signed in as {user?.username}. Replaced in Phase 14.</p>
      <Button className="mt-3" variant="secondary" onClick={logout}>Log out</Button>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
      </Route>
    </Routes>
  );
}