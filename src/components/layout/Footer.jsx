import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";
import SocialIcons from "@/components/ui/SocialIcons";
import { useProfile } from "@/hooks/usePortfolio";

const QUICK = [["/about", "About"], ["/projects", "Projects"], ["/blog", "Blog"], ["/contact", "Contact"]];

export default function Footer() {
  const { data: profile } = useProfile();
  return (
    <footer className="mt-section border-t border-line bg-glass py-6">
      <PageContainer className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading font-bold">{profile?.full_name}</p>
          <p className="mt-1 text-sm text-muted">© {new Date().getFullYear()} {profile?.full_name}. All rights reserved.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-3">
          {QUICK.map(([to, label]) => (
            <Link key={to} to={to} className="flex min-h-touch items-center text-sm text-muted hover:text-accent">{label}</Link>
          ))}
        </nav>
        {profile && <SocialIcons profile={profile} />}
      </PageContainer>
    </footer>
  );
}