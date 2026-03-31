import { useState } from "react";

const statuses = [
    { key: "online", label: "online", icon: <span className="w-2 h-2 rounded-full bg-[#28c840] inline-block" /> },
    { key: "idle", label: "idle", icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> },
    { key: "dnd", label: "do not disturb", icon: <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57] flex items-center justify-center"><span className="w-[7px] h-[1.5px] bg-white rounded-full" /></span> },
];

export function StatusDropdown() {
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const cur = statuses[selected];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 text-white/40 text-[11.5px] hover:text-white/60 transition-colors"
            >
                {cur.icon}
                <span>{cur.label}</span>
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-[160px] rounded-xl z-50 overflow-hidden"
                        style={{ background: "#150a0f", border: "1px solid rgba(220,60,120,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
                        {statuses.map((s, i) => (
                            <button key={s.key} onClick={() => { setSelected(i); setOpen(false); }}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors text-left
                  ${selected === i ? "bg-[rgba(220,60,120,0.12)] text-white/80" : "text-white/45 hover:bg-[rgba(255,255,255,0.04)] hover:text-white/65"}`}>
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