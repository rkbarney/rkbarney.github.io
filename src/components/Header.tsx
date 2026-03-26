import { NavLink } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

interface NavItem {
  id: string;
  label: string;
  to: string;
}

interface HeaderProps {
  navItems: NavItem[];
  onReorder: () => void;
}

export function Header({ navItems, onReorder }: HeaderProps) {
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        Richard Barney
      </NavLink>
      <nav className="nav" aria-label="Main navigation">
        {navItems.map(({ id, label, to }) => (
          <NavLink
            key={id}
            to={to}
            className={({ isActive }) => (isActive ? "nav-link-active" : "")}
          >
            {label}
          </NavLink>
        ))}
        <div className="nav-social">
          <a
            href="https://richardbarney.substack.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Substack"
          >
            <SiSubstack />
          </a>
          <a
            href="https://github.com/rkbarney"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/rkbarney/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/richardbarneycomedy/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
        <button type="button" className="nav-reorder" onClick={onReorder}>
          Reorder
        </button>
      </nav>
    </header>
  );
}
