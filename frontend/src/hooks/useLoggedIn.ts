import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/env";

export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

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
                }

            } 
            catch {
                setLoggedIn(false);
            }
            setLoading(false);
        }
        checkAuth();
    }, []);
    return { loggedIn, loading }
}