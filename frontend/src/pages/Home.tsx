import { useEffect, useState } from "react";
import { getAllPosts } from "../api/post";
import { Sidebar } from "../components/Sidebar";

type Post = {
    id: string,
    title: string,
    content: unknown,
    published: boolean,
    authorId: string,
    createdAt: string
}

export function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getAllPosts().then(data => setPosts(data || []));
    }, []);

    return (
        <div className="flex bg-black min-h-screen text-white">
            <Sidebar activeNav="Home" />
            <main className="ml-[230px] flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Home</h1>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex gap-3 px-4 py-3 border-b border-[#2f3336] hover:bg-[#080808] transition-colors cursor-pointer"
                    >
                        <div>
                            <p className="text-[15px] text-white mt-0.5">
                                {post.title}
                            </p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}