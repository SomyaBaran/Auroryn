import { BACKEND_URL } from "../lib/env";

export default async function LoginUser(email: string, password: string) {
    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    return data;
}