export default function PageContainer({ className = "", ...props }) {
  return <div className={`mx-auto w-full max-w-container px-2 md:px-3 ${className}`} {...props} />;
}