import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { RecentPosts } from "./components/RecentPosts";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ComedyPage } from "./pages/ComedyPage";
import { WorkPage } from "./pages/WorkPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";

interface NavItem {
  id: string;
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "blog", label: "Blog", to: "/blog" },
  { id: "comedy", label: "Comedy", to: "/comedy" },
  { id: "work", label: "Work", to: "/work" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "contact", label: "Contact", to: "/contact" },
];

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function AppInner() {
  const [navOrder, setNavOrder] = useState(() => NAV_ITEMS.map((i) => i.id));

  const handleReorder = useCallback(() => {
    setNavOrder((prev) => shuffle(prev));
  }, []);

  const orderedNav = navOrder
    .map((id) => NAV_ITEMS.find((i) => i.id === id))
    .filter((i): i is NavItem => i != null);

  return (
    <div className="app">
      <Header navItems={orderedNav} onReorder={handleReorder} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <RecentPosts />
              </>
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/comedy" element={<ComedyPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
