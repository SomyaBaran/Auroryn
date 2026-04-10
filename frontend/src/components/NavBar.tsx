import { useRef, useState } from "react";

export function Navbar() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [style, setStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const parent = containerRef.current;
        if (!parent) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        setStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
            opacity: 1,
        });
    };

    const navItems = ["Home", "About", "Contact", "Query"];

    return (
        <div className="flex justify-center pt-5 fixed top-0 w-full">
            <div
                ref={containerRef}
                onMouseLeave={() => setStyle((s) => ({ ...s, opacity: 0 }))}
                className="relative flex items-center gap-1 text-xs bg-[#151617] rounded-[8px] p-[2px]"
            >
                <div
                    className="absolute top-[3px] h-[calc(100%-7px)] bg-pink-900/60 rounded-[6px] transition-all duration-500"
                    style={style}
                />

                {/* // two lines  */}
                <div className="flex flex-col gap-[4px] px-3 py-2 z-10">
                    <span className="w-5 h-[1.5px] bg-white/70" />
                    <span className="w-5 h-[1.5px] bg-white/70" />
                </div>

                {/* Nav items */}
                {navItems.map((item) => (
                    <a
                        key={item}
                        href={`#${item}`}
                        onMouseEnter={handleHover}
                        className="px-3 py-2 text-white/80 z-10"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
}