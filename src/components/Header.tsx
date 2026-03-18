import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const SECTION_LABELS: Record<string, string> = {
  comedy: "Comedy",
  work: "Work",
  writing: "Writing",
  projects: "Projects",
  contact: "Contact",
};

const SECTION_ICONS: Record<string, { href: string; label: string; icon: React.ReactNode }> = {
  comedy: { href: "https://www.instagram.com/richardbarneycomedy/", label: "Instagram", icon: <FaInstagram /> },
  work: { href: "https://www.linkedin.com/in/rkbarney/", label: "LinkedIn", icon: <FaLinkedin /> },
  writing: { href: "https://richardbarney.substack.com", label: "Substack", icon: <SiSubstack /> },
  projects: { href: "https://github.com/rkbarney", label: "GitHub", icon: <FaGithub /> },
};

interface HeaderProps {
  sectionOrder: string[];
  onReorder: () => void;
}

export function Header({ sectionOrder, onReorder }: HeaderProps) {
  return (
    <header className="header">
      <a href="#" className="logo">
        Richard Barney
      </a>
      <nav className="nav" aria-label="Main navigation">
        {sectionOrder.map((id) => (
          <a key={id} href={`#${id}`}>
            {SECTION_LABELS[id] ?? id}
          </a>
        ))}
        <div className="nav-social">
          {sectionOrder.filter((id) => id in SECTION_ICONS).map((id) => {
            const { href, label, icon } = SECTION_ICONS[id];
            return (
              <a key={id} href={href} target="_blank" rel="noreferrer" aria-label={label}>{icon}</a>
            );
          })}
        </div>
        <button type="button" className="nav-reorder" onClick={onReorder}>
          Reorder
        </button>
      </nav>
    </header>
  );
}
