import { marked } from "marked";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMeta {
  html: string;
}

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      data[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
    }
  }
  return { data, content: match[2] };
}

const rawFiles = import.meta.glob<string>("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugFromPath(path: string): string {
  return path.replace(/^.*\//, "").replace(/\.md$/, "");
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(rawFiles)
    .map(([path, raw]) => {
      const { data } = parseFrontmatter(raw);
      return {
        slug: slugFromPath(path),
        title: data["title"] ?? "Untitled",
        date: data["date"] ?? "",
        description: data["description"] ?? "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const entry = Object.entries(rawFiles).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return null;
  const { data, content } = parseFrontmatter(entry[1]);
  return {
    slug,
    title: data["title"] ?? "Untitled",
    date: data["date"] ?? "",
    description: data["description"] ?? "",
    html: marked.parse(content) as string,
  };
}
