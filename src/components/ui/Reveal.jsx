import { motion } from "framer-motion";

export default function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}