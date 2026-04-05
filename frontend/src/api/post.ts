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

export async function getUserPost(title: string, content: Block[], navigate: (path: string) => void) {
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