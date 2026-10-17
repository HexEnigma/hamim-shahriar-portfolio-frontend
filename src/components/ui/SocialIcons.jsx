import { socialLinks } from "@/utils/socials";
import { FiFileText, FiMail } from "react-icons/fi";

export default function SocialIcons({ profile }) {
  // 1. Get your existing links (GitHub, LinkedIn, etc.)
  // 2. Add the hardcoded CV and Email links to the end
  const links = [
    ...socialLinks(profile),
    { 
      label: "Download CV", 
      href: "https://drive.google.com/file/d/1pCnhJ-_OqKH_aL9GyONvQm8gHbzP8HhB/view?usp=sharing", 
      Icon: FiFileText 
    },
    { 
      label: "Email Me", 
      href: "mailto:hamimshahriar17@gmail.com", 
      Icon: FiMail 
    }
  ];

  return (
    <ul className="flex flex-wrap gap-1">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            // This automatically handles opening Gmail properly without a blank tab
            {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-md border border-line text-muted transition duration-base hover:border-accent hover:text-accent"
          >
            <Icon size={20} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}