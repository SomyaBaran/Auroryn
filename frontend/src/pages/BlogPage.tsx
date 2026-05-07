import type { Block } from "@blocknote/core";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router"
import { getPostById, updatePost } from "../api/post";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

type Post = {
    id: string;
    title: string;
    content: Block[];
}

export function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Post>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                return;
            }
            const res = await getPostById(id);
            setBlog(res);
        }
        fetchBlog();
    }, [id]);

    useEffect(() => {
        function close() {
            setDropdownOpen(false);
        }
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const editor = useCreateBlockNote();

    useEffect(() => {
        if (blog?.content) {
            editor.replaceBlocks(editor.document, blog.content);
        }
    }, [blog, editor]);

    const handleEdit = () => {
        setDropdownOpen(false);
        setIsEditing(true);
    };

    // const handleDelete = async () => {
    //     setDropdownOpen(false);
    //     if (!id) {
    //         return;
    //     }
    //     await deletePost(id);
    //     navigate("/dashboard");
    // };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center px-4 py-10">
            <div className="w-full max-w-4xl">

                {/* Title Section */}
                <div className="text-center mb-10 relative">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        {blog?.title}
                    </h1>

                    <div ref={dropdownRef} className="absolute top-0 right-0" onMouseDown={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setDropdownOpen(true)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-1 w-36 bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl shadow-xl z-50 overflow-hidden">
                                <button
                                    onClick={handleEdit}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    Edit
                                </button>
                                <button
                                    // onClick={handleDelete}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <hr className="mt-6 border-t border-gray-600 w-2/3 mx-auto opacity-40" />
                </div>

                {/* Content Section */}
                <div className="bg-gradient-to-br from-[#1c1c1c] via-[#232323] to-[#1a1a1a]
                    rounded-2xl p-6 md:p-8 
                    border border-[#3a3a3a]
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.6)]">
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                        <BlockNoteView
                            editor={editor}
                            theme="dark"
                            editable={isEditing}
                        />
                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end mb-4">
                        <style>{`
                                @keyframes shine {
                                0% { transform: translateX(-100%) skewX(-12deg); }
                                100% { transform: translateX(200%) skewX(-12deg); }
                                }
                                .shine { animation: shine 2s infinite; }
                        `}</style>
                        <button
                            onClick={async () => {
                                await updatePost(id!, editor.document);
                                setIsEditing(false);
                            }}
                            className="relative px-9 py-3 mt-9 bg-[#bd1262] text-white text-sm font-semibold rounded-lg shadow-md overflow-hidden">
                            <span className="relative z-10">Save</span>
                            <span className="absolute inset-0 shine bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}