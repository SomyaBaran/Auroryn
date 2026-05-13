import { useCallback, useEffect, useState } from "react";
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

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoggedIn(false);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/check`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data.error) {
                setLoggedIn(false);
                setUser(null);
            } else {
                setLoggedIn(true);
                setUser(data.user);
            }
        }
        catch {
            setLoggedIn(false);
            setUser(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkAuth]);

    return { loggedIn, loading, user, refetch: checkAuth };
}