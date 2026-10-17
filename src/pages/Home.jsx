import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import SkillGrid from "@/components/home/SkillGrid";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestPosts from "@/components/home/LatestPosts";
import PageContainer from "@/components/layout/PageContainer";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import usePageMeta from "@/hooks/usePageMeta";
import { useProfile } from "@/hooks/usePortfolio";

export default function Home() {
  const { data: profile } = useProfile();
  usePageMeta(null, profile?.headline);
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillGrid />
      <ExperienceTimeline />
      <FeaturedProjects />
      <LatestPosts />
      <section className="py-section" aria-labelledby="cta-title">
        <PageContainer>
          <Reveal className="rounded-lg border border-line bg-glass p-6 text-center">
            <p className="eyebrow">// 06 contact</p>
            <h2 id="cta-title" className="mt-1">Let’s talk about your next project or opportunity.</h2>
            <Button to="/contact" className="mt-3">Get in touch</Button>
          </Reveal>
        </PageContainer>
      </section>
    </>
  );
}