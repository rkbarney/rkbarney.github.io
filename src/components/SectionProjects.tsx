const projects = [
  {
    name: "justrss.app",
    description: "RSS reader.",
    link: "https://justrss.app",
    tags: ["Web app"],
  },
  {
    name: "Todoist Task Analyzer",
    description: "Export and visualize Todoist tasks.",
    link: "https://github.com/rkbarney/todoist-analyzer",
    tags: ["Python"],
  },
  {
    name: "Wedding website",
    description: "Event site.",
    link: "https://rkbarney.github.io/wedding-website/",
    tags: ["Frontend"],
  },
];

export function SectionProjects() {
  return (
    <div className="section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => {
          const content = (
            <>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </>
          );
          return (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="project-card"
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
