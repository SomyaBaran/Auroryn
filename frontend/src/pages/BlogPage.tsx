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
        <div className="text-[#9a9a9a] text-4xl font-semibold flex flex-col items-center mt-18">

            <div className="inline-block text-center">
                <h3>{blog?.title}</h3>
                <hr className="border-t-2 border-[#9a9a9a] mt-5" />
            </div>

            <div className="w-full max-w-3xl text-base font-normal text-justify mt-6">
                <BlockNoteView
                    editor={editor}
                    theme="dark"
                    editable={false}
                />
            </div>

        </div>
    )
}