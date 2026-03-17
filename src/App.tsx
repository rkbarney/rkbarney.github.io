import { useState, useCallback } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SectionComedy } from "./components/SectionComedy";
import { SectionWork } from "./components/SectionWork";
import { SectionProjects } from "./components/SectionProjects";
import { SectionWriting } from "./components/SectionWriting";
import { SectionContact } from "./components/SectionContact";

const SECTIONS = [
  { id: "comedy", label: "Comedy", Component: SectionComedy },
  { id: "work", label: "Work", Component: SectionWork },
  { id: "writing", label: "Writing", Component: SectionWriting },
  { id: "projects", label: "Projects", Component: SectionProjects },
  { id: "contact", label: "Contact", Component: SectionContact },
] as const;

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function App() {
  const [order, setOrder] = useState(() => SECTIONS.map((s) => s.id));

  const handleReorder = useCallback(() => {
    setOrder((prev) => {
      const withoutContact = prev.filter((id) => id !== "contact");
      return [...shuffle(withoutContact), "contact"];
    });
  }, []);

  const orderedSections = order
    .map((id) => SECTIONS.find((s) => s.id === id))
    .filter((s): s is (typeof SECTIONS)[number] => s != null);

  return (
    <div className="app">
      <Header sectionOrder={order} onReorder={handleReorder} />
      <main>
        <Hero />
        {orderedSections.map(({ id, Component }) => (
          <section key={id} id={id}>
            <Component />
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
