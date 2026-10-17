import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ children }) {
  return (
    <div className="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: c }) => <a href={href} target="_blank" rel="noopener noreferrer">{c}</a>,
          img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" />,
        }}
      >
        {children || ""}
      </ReactMarkdown>
    </div>
  );
}