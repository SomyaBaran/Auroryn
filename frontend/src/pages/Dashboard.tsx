import { useEffect, useState } from "react"
import { getUserPost } from "../api/post";
import { useNavigate } from "react-router";

interface Blog {
    id: string;
    title: string;
    content: JSON;
    published: boolean;
    authorId: string;
    createdAt: string;
}

export function Dashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const data = await getUserPost(navigate);
            console.log(data.blogs);
            setBlogs(data.blogs);
        }
        fetchUserBlogs();
    });

    return (
        <div>
            {blogs.map((blog) => (
                <div className="text-white/60" id={blog.id}>
                    {blog.id}
                    {blog.title}
                    {/* {JSON.stringify(blog.content)} */}
                </div>
            ))}
        </div>
    )
}