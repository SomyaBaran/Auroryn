import type { Block } from "@blocknote/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getPostById } from "../api/post";
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

    const editor = useCreateBlockNote();

    useEffect(() => {
        if (blog?.content) {
            editor.replaceBlocks(editor.document, blog.content);
        }
    }, [blog, editor]);


    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center px-4 py-10">
            <div className="w-full max-w-4xl">

                {/* Title Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        {blog?.title}
                    </h1>
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
                            editable={false}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}