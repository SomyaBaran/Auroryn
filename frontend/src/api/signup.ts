import { BACKEND_URL } from "../lib/env";

export default async function SignUpUser(email: string, password: string, username: string) {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username })
    });

    const data = await response.json();
    return data;
}