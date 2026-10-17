import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import Posts from "@/pages/dashboard/Posts";
import PostEditor from "@/pages/dashboard/PostEditor";
import Projects from "@/pages/dashboard/Projects";
import ProjectEditor from "@/pages/dashboard/ProjectEditor";
import Skills from "@/pages/dashboard/Skills";
import Experience from "@/pages/dashboard/Experience";
import Taxonomy from "@/pages/dashboard/Taxonomy";
import Comments from "@/pages/dashboard/Comments";
import Messages from "@/pages/dashboard/Messages";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import NotFound from "@/pages/NotFound";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/new" element={<PostEditor />} />
        <Route path="posts/:slug/edit" element={<PostEditor />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<ProjectEditor />} />
        <Route path="projects/:slug/edit" element={<ProjectEditor />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="taxonomy" element={<Taxonomy />} />
        <Route path="comments" element={<Comments />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}