import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade + rise scroll reveal. Collapses to an instant appearance
 * under prefers-reduced-motion. Communicates hierarchy: content
 * arrives in the order the reader should notice it.
 */
export default function Reveal({
  children,
  as: Component = motion.div,
  delay = 0,
  y = 20,
  className,
  once = true,
  amount = 0.3,
}) {
  const reduce = useReducedMotion();

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
