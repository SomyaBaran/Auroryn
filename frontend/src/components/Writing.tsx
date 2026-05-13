import { useState } from "react";
import writeIcon from "../assets/write.png";
import { useNavigate } from "react-router";
import AuthModal from "./AuthModal";
import { useLoggedIn } from "../hooks/useLoggedIn";

export function Writing() {
    const navigate = useNavigate();

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { loggedIn, loading, refetch } = useLoggedIn();

    const handleAuthSuccess = () => {
        setIsAuthOpen(false);
        refetch();
    }

    if (loading) {
        return null;
    }
    return (
        <>
            <div className="fixed top-5 gap-4 z-50 right-6 flex items-center">
                <img
                    src={writeIcon}
                    alt="write"
                    className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition duration-300"
                    onClick={() => navigate("/new-story")}
                />

                {!loggedIn && (
                    <button
                        onClick={() => setIsAuthOpen(true)}
                        className="px-4 py-1.5 rounded-md bg-[#8e0f42] hover:bg-[#61062a] text-white text-xs transition duration-300 shadow-[0_2px_8px_rgba(142,15,66,0.4)]"
                    >
                        Sign In
                    </button>
                )}
            </div>

            {isAuthOpen && <AuthModal onClose={handleAuthSuccess} />}
        </>
    );
}