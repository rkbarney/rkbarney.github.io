import type { Plugin } from "vite";
import { readFileSync, readdirSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, basename } from "node:path";

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      data[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
    }
  }
  return data;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRssFeed(postsDir: string): string {
  const baseUrl = "https://richardbarney.com";

  const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const raw = readFileSync(resolve(postsDir, file), "utf-8");
      const data = parseFrontmatter(raw);
      return {
        slug: basename(file, ".md"),
        title: data["title"] ?? "Untitled",
        date: data["date"] ?? "",
        description: data["description"] ?? "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Richard Barney</title>
    <link>${baseUrl}</link>
    <description>Writing by Richard Barney — data scientist &amp; comedian in San Francisco.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function rssPlugin(): Plugin {
  return {
    name: "rss-and-404",
    apply: "build",
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const postsDir = resolve(process.cwd(), "src/posts");

      const xml = buildRssFeed(postsDir);
      writeFileSync(resolve(outDir, "feed.xml"), xml, "utf-8");
      console.log("  ✓ Generated dist/feed.xml");

      copyFileSync(
        resolve(outDir, "index.html"),
        resolve(outDir, "404.html")
      );
      console.log("  ✓ Generated dist/404.html");
    },
  };
}
