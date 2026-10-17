import Button from "@/components/ui/Button";
import PageContainer from "@/components/layout/PageContainer";
import usePageMeta from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <PageContainer className="py-section text-center">
      <p className="eyebrow">// error 404</p>
      <h1 className="mt-1 md:text-3xl">Page not found</h1>
      <p className="mx-auto mt-2 max-w-prose72 text-muted">The page you’re looking for doesn’t exist or may have been moved.</p>
      <Button to="/" className="mt-3">Back to home</Button>
    </PageContainer>
  );
}