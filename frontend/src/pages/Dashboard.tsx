import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserPost } from "../api/post";
import { Sidebar } from "../components/Sidebar";
import { PostCard, type Blog } from "../components/PostCard";
import pink from "../assets/pink.jpg";

const TABS = ["Posts", "Drafts"] as const;
type Tab = typeof TABS[number];
export function Dashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNav] = useState("home");
    const [activeTab, setActiveTab] = useState<Tab>("Posts");
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await getUserPost(navigate);
                setBlogs(data.blogs ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const allPosts = blogs;
    const drafts = blogs.filter(b => !b.published);
    const displayed = activeTab === "Posts" ? allPosts : activeTab === "Drafts" ? drafts : [];

    return (
        <div style={{ minHeight: "100vh", background: "#000", color: "#e7e9ea", display: "flex", justifyContent: "center" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap');
                *, *::before, *::after { font-family: 'Funnel Sans', sans-serif !important; box-sizing: border-box; }
                ::-webkit-scrollbar { width: 0; }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
                @media (min-width: 1000px) {
                    .a-sidebar {
                        transform: translateX(0) !important;
                        position: sticky !important; top: 0 !important;
                        height: 100vh !important; align-self: flex-start !important;
                        border-right: 1px solid #2f3336 !important;
                    }
                    .a-overlay { display: none !important; }
                }
                
            `}</style>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="a-overlay" onClick={() => setSidebarOpen(false)}
                    style={{ position: "fixed", inset: 0, background: "rgba(91,112,131,0.4)", zIndex: 40 }} />
            )}

            {/* Sidebar */}
            <Sidebar activeNav={activeNav} />

            {/* ── MAIN COLUMN ── */}
            <main style={{ flex: 1, maxWidth: "1100px", borderLeft: "1px solid #2f3336", borderRight: "1px solid #2f3336", minHeight: "100vh", margin: "0 auto" }}>


                <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2f3336" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "53px", padding: "0 16px" }}>
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        height: "200px",
                        background: `
                                    radial-gradient(circle at 20% 50%, rgba(102,126,234,0.25) 0%, transparent 55%),
                                    radial-gradient(circle at 80% 20%, rgba(118,75,162,0.25) 0%, transparent 55%),
                                    url(${pink})
                                    `,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff90",
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: "40px",
                        letterSpacing: "2px",
                    }}
                >
                    - Auroryn -
                </div>

                <div style={{ padding: "10px 16px" }}></div>

                <div style={{ display: "flex", borderBottom: "1px solid #2f3336", position: "sticky", top: "53px", zIndex: 20, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", overflowX: "auto" }}>
                    {TABS.map(tab => (
                        <button key={tab} aria-label={tab} onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1, padding: "14px 16px",
                                background: "none", border: "none",
                                borderBottom: activeTab === tab ? "2px solid #d3148da3" : "2px solid transparent",
                                color: activeTab === tab ? "#eae7e9a7" : "#71767b",
                                fontWeight: activeTab === tab ? 700 : 400,
                                fontSize: "15px", cursor: "pointer",
                                transition: "color 0.15s", whiteSpace: "nowrap",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                        >
                            {tab}
                            {tab === "Posts" && <span style={{ marginLeft: "9px", fontSize: "14px", color: "#b091a19c" }}>{allPosts.length}</span>}
                            {tab === "Drafts" && <span style={{ marginLeft: "9px", fontSize: "14px", color: "#b091a19c" }}>{drafts.length}</span>}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "16px" }}>
                        <div style={{ width: "30px", height: "30px", border: "3px solid #2f3336", borderTop: "3px solid #1d9bf0", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    </div>
                ) : displayed.length === 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 32px", textAlign: "center" }}>
                        <p style={{ color: "#71767b", fontSize: "15px" }}>
                            {activeTab === "Posts" ? "No stories yet." : "No drafts."}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "16px" }}>
                        {displayed.map(blog => <PostCard key={blog.id} blog={blog} />)}
                    </div>
                )}
            </main>
        </div>
    );
}