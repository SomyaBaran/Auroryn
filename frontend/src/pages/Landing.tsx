import { ThreeBackground } from "../components/ThreeBackground";
import { Navbar } from "../components/NavBar";
import { Writing } from "../components/Writing";
import { Hero } from "../components/Hero";

export function Landing() {
    return (
        <div className="relative bg-black text-white">        
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <Navbar />
                <ThreeBackground />
                <Writing />
                <Hero />
            </div>
        </div>
    );
}