import AuthCard from "./AuthCard";

export default function AuthModal({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg hover:bg-[#1a1a1a] transition duration-300 shadow-lg"
                    aria-label="Close"
                >
                    ×
                </button>
                <AuthCard onSuccess={onClose} />
            </div>
        </div>
    );
}