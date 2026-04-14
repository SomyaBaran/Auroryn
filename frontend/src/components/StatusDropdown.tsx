import { useState } from "react";
import { useNavigate } from "react-router";

const statuses = [
    { key: "online", label: "online", icon: <span className="w-2 h-2 rounded-full bg-[#28c840] inline-block" /> },
    { key: "idle", label: "idle", icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> },
    { key: "dnd", label: "do not disturb", icon: <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57] flex items-center justify-center"><span className="w-[7px] h-[1.5px] bg-white rounded-full" /></span> },
];

const OPTIONS = [
    { label: "Home" },
    { label: "Dashboard" },
    { label: "Drafts" },
    { label: "Posts" },
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

    return (
        <div className="relative">
            <div className="px-4 py-5 min-h-[76px] flex items-center gap-2.5">
                <span className="text-[rgba(220,80,130,0.40)] text-[13px] mt-2">›</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setOpen(e.target.value === "/"); }}
                    onBlur={() => setTimeout(() => setOpen(false), 100)}
                    onKeyDown={(e) => { if (e.key === "Escape") { setOpen(false); setValue(""); } }}
                    placeholder="Press '/' to see options . . ."
                    className="flex-1 bg-transparent border-none outline-none text-white/80 text-[13.5px] font-light tracking-wide leading-relaxed placeholder:text-white/22 pt-1"
                />
            </div>

            {open && (
                <div className="absolute top-full left-4 z-50 w-fit min-w-[130px] rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#080808] overflow-hidden"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
                    <div className="py-1">
                        {OPTIONS.map(({ label }) => (
                            <button
                                key={label}
                                onMouseDown={() => { setValue(label); setOpen(false); navigate(`/${label.toLowerCase()}`); }}
                                className="w-[90%] flex items-center px-5 py-1.5 ml-1.5 text-[11.5px] text-white/40 hover:bg-white/10 hover:text-white/70 transition-colors text-left whitespace-nowrap rounded-sm"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}