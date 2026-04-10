import { useNavigate } from "react-router";
import { formatDate, getExcerpt } from "../lib/blogUtils";

export interface Blog {
    id: string;
    title: string;
    content: JSON;
    published: boolean;
    authorId: string;
    createdAt: string;
}

/* ── PostCard ── */
export function PostCard({ blog }: { blog: Blog }) {
    const navigate = useNavigate();
    const excerpt = getExcerpt(blog.content);

    return (
        <article
            onClick={() => navigate(`/${blog.id}`)}
            style={{
                padding: "16px",
                border: "1px solid #2f3336",
                borderRadius: "16px",
                cursor: "pointer",
                transition: "background 0.15s",
                background: "#0d0d0d",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#111")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0d0d0d")}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#71767b", fontSize: "13px" }}>{formatDate(blog.createdAt)}</span>
                {blog.published
                    ? <span style={{ background: "#f01dcd1a", color: "#ed5f9c", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "99px", border: "1px solid #f01d7533" }}>Published</span>
                    : <span style={{ background: "#71767b1a", color: "#7b717a", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "99px", border: "1px solid #71767b33" }}>Draft</span>
                }
            </div>
            <p style={{ margin: 0, color: "#eae7e9b4", fontSize: "16px", fontWeight: 700, wordBreak: "break-word" }}>
                {blog.title || "Untitled"}
            </p>
            {excerpt && (
                <p style={{
                    margin: 0, color: "#7b717a", fontSize: "14px", lineHeight: 1.5,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                    {excerpt}
                </p>
            )}
        </article>
    );
}