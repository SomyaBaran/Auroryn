import { StatusDropdown } from "./StatusDropdown";

export function Hero() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">

            <h1 className="text-5xl font-semibold text-white/60 text-center">
                Don't Just Think It.
                <br />
                <span className="text-white/40">Post It.</span>
            </h1>
            <p className="text-white/45 text-sm font-extralight text-center">
                A place where your thoughts become stories,{" "}
                <span className="relative inline-block">
                    <span className="text-white/60">Instantly</span>
                    <svg
                        className="absolute left-0 -bottom-1 w-full"
                        viewBox="0 0 100 14"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M2 10 Q 50 2 98 10"
                            stroke="rgba(250,204,21,0.95)"
                            strokeWidth="1.8"
                            fill="transparent"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="scribble-line"
                        />
                        <path
                            d="M2 7 Q 50 12 98 7"
                            stroke="rgba(250,204,21,0.85)"
                            strokeWidth="1.6"
                            fill="transparent"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="scribble-line delay"
                        />
                    </svg>
                </span>
                .
            </p>

            <div
                className="w-[600px] rounded-2xl p-[1px]"
                style={{
                    background: 'linear-gradient(105deg, rgba(220,60,120,0.35) 0%, rgba(255,255,255,0.06) 50%, rgba(200,40,100,0.25) 100%)',
                    boxShadow: '0 0 40px rgba(220,60,120,0.08), 0 2px 20px rgba(0,0,0,0.6)',
                }}
            >
                <div className="w-full bg-[#0e0608] rounded-2xl overflow-hidden font-mono">

                    <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[rgba(220,60,120,0.10)]">
                        <div className="flex items-center gap-2.5">
                            {/* 3 dots  */}
                            <div className="flex gap-1.5">
                                <div className="w-[11px] h-[11px] rounded-full bg-[#a1130c]" />
                                <div className="w-[11px] h-[11px] rounded-full bg-[#4d4d4d]" />
                                <div className="w-[11px] h-[11px] rounded-full bg-[#138224]" />
                            </div>

                            <span className="text-white/40 text-[13px] tracking-widest flex items-center gap-1.5">
                                <span className="text-[rgba(220,80,130,0.55)]">+</span> Auroryn
                            </span>
                        </div>

                        <StatusDropdown />
                    </div>



                    <div className="px-4 py-5 min-h-[76px] flex items-center gap-2.5">
                        <span className="text-[rgba(220,80,130,0.40)] text-[13px] mt-2">›</span>
                        <input
                            type="text"
                            placeholder="write a new post . . ."
                            className="flex-1 bg-transparent border-none outline-none text-white/80 text-[13.5px] font-light tracking-wide leading-relaxed placeholder:text-white/22 pt-1"
                        />
                    </div>

                    <div className="flex items-center justify-between px-2 py-2 border-t border-[rgba(220,60,120,0.10)]">
                        <div className="flex items-center gap-3">
                            <button
                                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/85 text-[11.5px] tracking-widest"
                                style={{ background: 'linear-gradient(135deg, #c42866 0%, #e03870 100%)' }}
                            >
                                <span>+ aurora </span>
                            </button>
                        </div>
                        <button className="w-8 h-8 bg-[#1a0810] rounded-lg flex items-center justify-center text-white/40 border border-[rgba(220,60,120,0.12)]">
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}