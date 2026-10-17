import PageContainer from "./PageContainer";

export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <PageContainer className="pt-section">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-1 break-words md:text-3xl">{title}</h1>
      {intro && <p className="mt-2 max-w-prose72 text-muted">{intro}</p>}
    </PageContainer>
  );
}