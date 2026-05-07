import type { Block } from "@blocknote/core";
import { BACKEND_URL } from "../lib/env";

export async function CreatePost(title: string, content: Block[], navigate: (path: string) => void) {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/auth");
        return;
    }
    const res = await fetch(`${BACKEND_URL}/blog/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ title, content })
    });

    // if the server is down or no response came from backend 
    if (!res.ok) {
        alert("Error!");
        return;
    }

    const data = await res.json();
    if (data.error) {
        alert("Something wrong with data")
        return;
    }
    return data;
}

export async function getUserPost(navigate: (path: string) => void) {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/auth");
        return;
    }
    const res = await fetch(`${BACKEND_URL}/blog/user-blogs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    if (!res.ok) {
        alert("Error!");
        return;
    }

    const data = await res.json();
    if (data.error) {
        alert("Something wrong with data")
        return;
    }
    return data;
}

export async function getPostById(id: string) {
    const res = await fetch(`${BACKEND_URL}/blog/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }

    })

    if (!res.ok) {
        alert("Can't find post");
    }

    const data = await res.json();
    if (!data) {
        alert("something went wrong with data");
    }

    return data.blog;
}

export async function updatePost(id: string, content: Block[]) {
    const res = await fetch(`${BACKEND_URL}/blog/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ content })
    });

    return res.json();
}

