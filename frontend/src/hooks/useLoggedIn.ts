import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/env";


type User = {
    id: string,
    username: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
}
export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/check`, {
                    method: "GET",
                    headers: {
                        "Authorization": token!,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (data.error) {
                    setLoggedIn(false);
                } else {
                    setLoggedIn(true);
                    setUser(data.user);
                }

            }
            catch {
                setLoggedIn(false);
            }
            setLoading(false);
        }
        checkAuth();
    }, []);
    return { loggedIn, loading, user }
}