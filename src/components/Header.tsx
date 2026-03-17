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
        <button type="button" className="nav-reorder" onClick={onReorder}>
          Reorder
        </button>
      </nav>
    </header>
  );
}
