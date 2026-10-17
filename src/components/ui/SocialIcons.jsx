import { socialLinks } from "@/utils/socials";

export default function SocialIcons({ profile }) {
  return (
    <ul className="flex flex-wrap gap-1">
      {socialLinks(profile).map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
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