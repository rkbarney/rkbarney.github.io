import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="section">
      <h2>Writing</h2>
      <p className="substack-note">
        Also on{" "}
        <a
          href="https://richardbarney.substack.com"
          target="_blank"
          rel="noreferrer"
        >
          Substack
        </a>
        . Subscribe there for email delivery, or use the{" "}
        <a href="/feed.xml">RSS feed</a>.
      </p>
      {posts.length === 0 ? (
        <p>Posts coming soon.</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-list-item">
              <Link to={`/blog/${post.slug}`} className="post-title-link">
                {post.title}
              </Link>
              {post.date && (
                <span className="post-date">{formatDate(post.date)}</span>
              )}
              {post.description && (
                <p className="post-excerpt">{post.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
