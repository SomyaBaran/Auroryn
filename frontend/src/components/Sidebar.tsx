import { useNavigate } from "react-router";
import logo from "../assets/image.png";
import { UserAvatar } from "./UserAvatar";

const NAV = [
    {
        label: "Home",
        path: "/home",
        icon: (
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
        ),
    },
    {
        label: "Search",
        path: "/search",
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
            </svg>
        ),
    },
    {
        label: "Saved",
        path: "/saved",
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 3h14v18l-7-4-7 4V3z" />
            </svg>
        ),
    },
    {
        label: "Profile",
        path: "/profile",
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
        ),
    },
];
interface SidebarProps {
    activeNav: string;
    isOpen: boolean;
    onNavClick: (label: string) => void;
    onClose: () => void;
}

export function Sidebar({ activeNav }: SidebarProps) {
    const navigate = useNavigate();

    return (
        <aside
            className="a-sidebar"
            style={{
                position: "fixed", top: 0, left: 0,
                height: "100vh", width: "230px", zIndex: 50,
                display: "flex", flexDirection: "column",
                padding: "0 12px", background: "#000",
                borderRight: "1px solid #2f3336",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                overflowY: "auto",
            }}
        >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 8px 10px", cursor: "pointer" }}>
                <img
                    src={logo}
                    alt="Auroryn"
                    style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "contain",
                        filter: "invert(1)"
                    }}
                />
                <span style={{ fontSize: "21px", fontWeight: 800, color: "#e7e9ea", letterSpacing: "0.07em" }}>
                    AURORYN
                </span>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, paddingTop: "3px" }}>
                {NAV.map(item => (
                    <button
                        key={item.label}
                        onClick={() => { navigate(item.path); }}
                        style={{
                            display: "flex", alignItems: "center", gap: "20px",
                            width: "100%", padding: "12px 16px",
                            borderRadius: "5px", border: "none", background: "none",
                            color: "#bbbbbb",
                            fontWeight: activeNav === item.label ? 700 : 400,
                            fontSize: "17px", cursor: "pointer", textAlign: "left",
                            transition: "background 0.15s", letterSpacing: "-0.01em",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#181818")}
                        onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>


            {/* down Profile */}
            <div
                style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 7px", borderRadius: "10px", marginBottom: "12px",
                    cursor: "pointer", transition: "background 0.15s", marginLeft: "-18px",

                }}
            >
                <UserAvatar />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "#e7e9ea" }}>You</div>
                    <div style={{ fontSize: "13px", color: "#71767b" }}>@auroryn</div>
                </div>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#e7e9ea", flexShrink: 0 }}>
                    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                </svg>
            </div>

        </aside>
    );
}

