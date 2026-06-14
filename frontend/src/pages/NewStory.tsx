import { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BlockNoteEditor from "../components/BlockNoteEditor";
import logo from "../assets/image.png";
import "../App.css";
import { useCreateBlockNote } from "@blocknote/react";
import { CreatePost } from "../api/post";
import { useLoggedIn } from "../hooks/useLoggedIn";

export default function NewStory() {
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const { loading, loggedIn } = useLoggedIn();
    const editor = useCreateBlockNote();

    const navigate = useNavigate();

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [title]);

    if (loading) {
        return null;
    }
    if (!loggedIn) {
        return <Navigate to="/auth" />
    }

    const handlePublish = async () => {
        const document = editor.document;
        if (!title || !document) {
            alert("Title and content required");
        }

        const data = await CreatePost(title, document, navigate);
        if (data.blog.id) {
            alert("Blog Published");
            navigate("/home");
        }
    }


    return (
        <div className="editor-page">
            <nav className="editor-nav">
                <Link to="/" className="editor-nav-left">
                    <img src={logo} alt="Auroryn logo" className="editor-nav-logo-img" />
                    <span className="editor-nav-logo-text">AURORYN</span>
                </Link>


                <div className="editor-nav-right">
                    <button className="more-btn" title="More options">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="5" cy="12" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="19" cy="12" r="1.5" />
                        </svg>
                    </button>
                    <button className="publish-btn" onClick={handlePublish}>
                        Publish
                    </button>
                </div>

            </nav>

            <div className="editor-wrapper">
                <textarea
                    ref={titleRef}
                    className="story-title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={1}
                    spellCheck
                />
                <div className="editor-divider" />
                <BlockNoteEditor editor={editor} />
            </div>

        </div>
    );
}