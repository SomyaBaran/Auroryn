import writeIcon from "../assets/write.png";
// import MyEditor from "./BlockNoteEditor";
import { useNavigate } from "react-router";

export function Writing() {
    const navigate = useNavigate();

    return (
        <div className="fixed top-5 gap-4 z-50 right-6 flex items-center">
            <img
                src={writeIcon}
                alt="write"
                className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition duration-300"
                onClick={() => navigate("/new-story")}
            />

            <button className="px-4 py-1.5 rounded-md bg-[#8e0f42] hover:bg-[#61062a] text-white text-xs transition duration-300 shadow-[0_2px_8px_rgba(142,15,66,0.4)]">
                Sign In
            </button>
        </div>
    )
}