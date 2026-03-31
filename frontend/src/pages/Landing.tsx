import { ThreeBackground } from "../components/ThreeBackground";
import { Navbar } from "../components/NavBar";
import { Writing } from "../components/Writing";
import { Hero } from "../components/Hero";
export function Landing() {

    return (
        <div className="relative h-screen flex items-center justify-center text-white">
            <Navbar />
            <ThreeBackground />
            <Writing />
            <Hero />
        </div>
    );
}