import { useRef, useState } from "react";

export function Navbar() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [style, setStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = e.currentTarget;
        const parent = containerRef.current;
        if (!parent) return;

        const rect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        setStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
            opacity: 1,
        });
    };

    return (
        <div className="flex justify-center pt-5 top-0 fixed w-full">
            <div
                ref={containerRef}
                onMouseLeave={() =>
                    setStyle((prev) => ({
                        ...prev,
                        opacity: 0,
                    }))
                }
                className="relative lg:flex items-center gap-1 text-xs font-thin transition duration-200 bg-[#151617] rounded-[8px] p-[2px] border border-none"
            >

                {/* Sliding background */}
                <div
                    className="absolute top-[3px] h-[calc(100%-7px)] bg-pink-900/60 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                        left: style.left,
                        width: style.width,
                        opacity: style.opacity,
                    }}
                />

                {/* Hamburger */}
                <div className="flex flex-col gap-[4px] cursor-pointer px-3 py-2 z-10">
                    <span className="block w-5 h-[1.5px] bg-white/70" />
                    <span className="block w-5 h-[1.5px] bg-white/70" />
                </div>

                {/* Nav items */}
                <a  href="#Home"
                    onMouseEnter={handleHover}
                    className="px-3 py-2 rounded-[6px] cursor-pointer text-white/80 relative z-10"
                >
                    <span>Home</span>
                </a>

                <a  href="#About"
                    onMouseEnter={handleHover}
                    className="px-3 py-2 rounded-[6px] cursor-pointer text-white/80 relative z-10"
                >
                    <span>About</span>
                </a>

                <a  href="#Contact"
                    onMouseEnter={handleHover}
                    className="px-3 py-2 rounded-[6px] cursor-pointer text-white/80 relative z-10"
                >
                    <span>Contact</span>
                </a>

                <a  href="#Query"
                    onMouseEnter={handleHover}
                    className="px-3 py-2 rounded-[6px] cursor-pointer text-white/80 relative z-10"
                >
                    <span>Query</span>
                </a>
            </div>
        </div>
    );
}