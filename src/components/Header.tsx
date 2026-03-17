import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const SECTION_LABELS: Record<string, string> = {
  comedy: "Comedy",
  work: "Work",
  writing: "Writing",
  projects: "Projects",
  contact: "Contact",
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
          <a href="https://www.linkedin.com/in/rkbarney/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.instagram.com/richardbarneycomedy/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://github.com/rkbarney" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://richardbarney.substack.com" target="_blank" rel="noreferrer" aria-label="Substack"><SiSubstack /></a>
        </div>
        <button type="button" className="nav-reorder" onClick={onReorder}>
          Reorder
        </button>
      </nav>
    </header>
  );
}
