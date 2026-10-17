import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiGlobe, FiMail } from "react-icons/fi";

export function socialLinks(p) {
  return [
    p.github_url && { label: "GitHub", href: p.github_url, Icon: FaGithub },
    p.linkedin_url && { label: "LinkedIn", href: p.linkedin_url, Icon: FaLinkedinIn },
    p.x_url && { label: "X", href: p.x_url, Icon: FaXTwitter },
    p.website_url && { label: "Website", href: p.website_url, Icon: FiGlobe },
    p.email && { label: "Email", href: `mailto:${p.email}`, Icon: FiMail },
  ].filter(Boolean);
}