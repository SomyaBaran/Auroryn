import { useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../api/logout";

const statuses = [
    { key: "online", label: "online", icon: <span className="w-2 h-2 rounded-full bg-[#28c840] inline-block" /> },
    { key: "idle", label: "idle", icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> },
    { key: "dnd", label: "do not disturb", icon: <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57] flex items-center justify-center"><span className="w-[7px] h-[1.5px] bg-white rounded-full" /></span> },
];

const OPTIONS = [
    { e: "Home" },
    { e: "Dashboard" },
    { e: "Drafts" },
    { e: "Posts" },
];

export function StatusDropdown() {
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const cur = statuses[selected];

    function handleClick() {
        setOpen(!open);
    }

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="flex items-center gap-1.5 text-white/40 text-[11.5px] hover:text-white/60 transition-colors"
            >
                {cur.icon}
                <span>{cur.label}</span>
            </button>

            {open && (
                <>
                    <div onClick={handleClick} />
                    <div className="absolute right-0 top-full mt-2 w-[160px] rounded-xl z-50 overflow-hidden">
                        {statuses.map((s, i) => (
                            <button
                                key={s.key} onClick={() => { setSelected(i); handleClick(); }}
                                className={
                                    `w-full flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors text-left
                                    ${selected === i ? "text-white/80" : "text-white/45"}`
                                }
                            >
                                <span className="w-4 flex items-center justify-center">{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


export function SlashDropdown() {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function handleClick() {
        setOpen(!open);
    }

    return (
        <div className="relative">
            <div className="px-4 py-5 min-h-[76px] flex items-center gap-2.5">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setOpen(e.target.value === "/"); }}
                    placeholder="Press '/' to see options . . ."
                    className="flex-1 outline-none text-white/80 text-[13.5px] font-light placeholder:text-white/22"
                />
            </div>

            {open && (
                <div className="absolute top-full left-4 z-50 w-fit min-w-[130px] rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#080808] overflow-hidden"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
                    <div className="py-1">
                        {
                            OPTIONS.map(({ e }) => (
                                <button
                                    key={e}
                                    onMouseDown={() => { setValue(e); handleClick(); navigate(`/${e.toLowerCase()}`); }}
                                    className="w-[90%] flex px-5 py-1.5 ml-1.5 text-[11.5px] text-white/40 hover:bg-white/10 hover:text-white/60 rounded-sm"
                                >
                                    {e}
                                </button>
                            )
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function LogoutDropdown() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    }

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate("/auth")
    }
    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleClick}
                aria-label="More options"
                className="flex items-center text-[#fff] hover:text-white/60"
            >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#e7e9ea", flexShrink: 0 }}>
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                </svg>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={handleClick} />
                    <div
                        className="absolute bottom-full right-0 mb-2 w-[140px] rounded-xl z-50 overflow-hidden bg-[#080808] border border-[rgba(255,255,255,0.06)]"
                        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.7)" }}
                    >
                        <div className="py-1">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full px-4 py-2.5 text-[12.5px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}