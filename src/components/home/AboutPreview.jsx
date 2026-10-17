import { FiArrowRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import QueryBoundary from "@/components/ui/QueryBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProfile } from "@/hooks/usePortfolio";

export default function AboutPreview() {
  const q = useProfile();
  return (
    <Section id="about" eyebrow="// 01 about" title="About me">
      <QueryBoundary
        query={q}
        isEmpty={(p) => !p.bio}
        emptyTitle="Biography coming soon"
        skeleton={<div className="space-y-1"><Skeleton className="h-2 w-full" /><Skeleton className="h-2 w-full" /><Skeleton className="h-2 w-2/3" /></div>}
      >
        {(p) => (
          <>
            <p className="line-clamp-5 max-w-prose72 whitespace-pre-line text-muted">{p.bio}</p>
            <Button to="/about" variant="ghost" className="mt-2">More about me <FiArrowRight aria-hidden="true" /></Button>
          </>
        )}
      </QueryBoundary>
    </Section>
  );
}