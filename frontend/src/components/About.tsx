import { motion } from "framer-motion";

export function About() {
    return (
        <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: false, amount: 0.05 }}
            className="relative z-10 min-h-screen bg-[#0a0008] overflow-hidden"
            style={{ borderRadius: "5px 5px 0 0", marginTop: "-20px" }}
        >

           
        </motion.div>
    );
}