import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import SocialIcons from "@/components/ui/SocialIcons";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProfile } from "@/hooks/usePortfolio";
import { firstSentences } from "@/utils/text";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

function HeroSkeleton() {
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]" role="status" aria-label="Loading">
      <div className="space-y-2"><Skeleton className="h-2 w-1/3" /><Skeleton className="h-6 w-full" /><Skeleton className="h-3 w-2/3" /><Skeleton className="h-8 w-full" /></div>
      <Skeleton className="mx-auto aspect-square w-full max-w-[360px]" />
    </div>
  );
}

function HeroContent({ p }) {
  const handle = p.full_name.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
      <motion.div variants={list} initial="hidden" animate="show" className="min-w-0">
        <motion.p variants={item} className="eyebrow caret">~/{handle} $ whoami</motion.p>
        <motion.h1 variants={item} className="mt-2 break-words xl:text-3xl">{p.full_name}</motion.h1>
        <motion.p variants={item} className="mt-1 font-heading text-lg text-accent">{p.headline}</motion.p>
        {p.bio && <motion.p variants={item} className="mt-2 max-w-prose72 text-muted">{firstSentences(p.bio, 2)}</motion.p>}
        {p.is_available_for_hire && <motion.div variants={item} className="mt-2"><Badge tone="accent">Available for hire</Badge></motion.div>}
        <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
          <Button to="/projects">View Projects <FiArrowRight aria-hidden="true" /></Button>
          {p.resume ? (
            <Button variant="secondary" href={p.resume} target="_blank" rel="noopener noreferrer" download><FiDownload aria-hidden="true" /> Download Resume</Button>
          ) : (
            <Button variant="secondary" to="/contact">Get in touch</Button>
          )}
        </motion.div>
        <motion.div variants={item} className="mt-3"><SocialIcons profile={p} /></motion.div>
      </motion.div>

      <div className="relative mx-auto aspect-square w-full max-w-[360px]">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg border border-accent" aria-hidden="true" />
        <Avatar src={p.avatar} name={p.full_name} className="relative h-full w-full rounded-lg border border-line" />
      </div>
    </div>
  );
}

export default function Hero() {
  const q = useProfile();
  return (
    <section className="relative isolate overflow-hidden py-section" aria-label="Introduction">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-glow" />
        <div className="hero-grid" />
      </div>
      <PageContainer>
        <QueryBoundary query={q} skeleton={<HeroSkeleton />}>{(p) => <HeroContent p={p} />}</QueryBoundary>
      </PageContainer>
    </section>
  );
}
