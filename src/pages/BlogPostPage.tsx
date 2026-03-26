import { useParams, Link } from "react-router-dom";
import { getPost } from "../lib/posts";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : null;

  if (!post) {
    return (
      <div className="section">
        <p>
          Post not found. <Link to="/blog">Back to all posts</Link>
        </p>
      </div>
    );
  }

  return (
    <article className="section blog-post">
      <Link to="/blog" className="back-link">
        ← All posts
      </Link>
      <h2>{post.title}</h2>
      {post.date && (
        <time className="post-date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      )}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
