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

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 5);

  if (posts.length === 0) {
    return (
      <section className="section">
        <h2>Latest Writing</h2>
        <p>Posts coming soon.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Latest Writing</h2>
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
      <Link to="/blog" className="see-all-link">
        All posts →
      </Link>
    </section>
  );
}
