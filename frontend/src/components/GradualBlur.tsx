export function GradualBlur() {
    const layers = 8;

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {Array.from({ length: layers }).map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                        backdropFilter: `blur(${(i + 1) * 2}px)`,
                        WebkitBackdropFilter: `blur(${(i + 1) * 2}px)`,
                        maskImage: `linear-gradient(to bottom, 
                            transparent ${(i / layers) * 100}%, 
                            black ${((i + 1) / layers) * 100}%, 
                            black ${((i + 2) / layers) * 100}%, 
                            transparent ${((i + 3) / layers) * 100}%
                        )`,
                        WebkitMaskImage: `linear-gradient(to bottom, 
                            transparent ${(i / layers) * 100}%, 
                            black ${((i + 1) / layers) * 100}%, 
                            black ${((i + 2) / layers) * 100}%, 
                            transparent ${((i + 3) / layers) * 100}%
                        )`,
                    }}
                />
            ))}
        </div>
    );
}