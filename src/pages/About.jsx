import { FiDownload } from "react-icons/fi";
import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import SkillGrid from "@/components/home/SkillGrid";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import SocialIcons from "@/components/ui/SocialIcons";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProfile } from "@/hooks/usePortfolio";
import usePageMeta from "@/hooks/usePageMeta";

export default function About() {
  const q = useProfile();
  usePageMeta("About", q.data?.headline);
  return (
    <>
      <PageHeader eyebrow="// about" title="About me" />
      <PageContainer className="pt-4">
        <QueryBoundary query={q} skeleton={<Skeleton className="h-12" />}>
          {(p) => (
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              <div className="space-y-3">
                <Avatar src={p.avatar_url || p.avatar} name={p.full_name} className="aspect-square w-full max-w-[320px] rounded-lg border border-line" />
                {p.location && <p className="text-muted">{p.location}</p>}
                <SocialIcons profile={p} />
                {p.resume && <Button href={p.resume} target="_blank" rel="noopener noreferrer" download><FiDownload aria-hidden="true" /> Download Resume</Button>}
              </div>
              <div className="min-w-0">
                <h2 className="break-words">{p.full_name}</h2>
                <p className="mt-1 font-heading text-accent">{p.headline}</p>
                <div className="mt-3 max-w-prose72 space-y-2 text-muted">
                  {p.bio.split(/\n+/).filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            </div>
          )}
        </QueryBoundary>
      </PageContainer>
      <ExperienceTimeline mode="experience" id="exp" eyebrow="// experience" hideIfEmpty />
      <ExperienceTimeline mode="education" id="edu" eyebrow="// education" hideIfEmpty />
      <SkillGrid id="skills" eyebrow="// skills" />
    </>
  );
}