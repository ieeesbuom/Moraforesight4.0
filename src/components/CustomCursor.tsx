"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeElement, setActiveElement] = useState<"interactive" | null>(null);

  useEffect(() => {
    // Hide the default browser cursor globally
    if (document.body) {
      document.body.classList.add("cursor-none");
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setActiveElement("interactive");
      } else {
        setActiveElement(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // SSR guard
  if (typeof window === "undefined") return null;

  return (
    <>
      {isHovering && (
        <>
          {/* Outer ring — brand gradient border */}
          <motion.div
            className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999]"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              translateX: "-50%",
              translateY: "-50%",
              border: "2px solid transparent",
              background:
                "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #01BEEB, #E585E4) border-box",
            }}
            animate={{ scale: activeElement === "interactive" ? 1.6 : 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Trailing dots */}
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998]"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                translateX: "-50%",
                translateY: "-50%",
                backgroundColor: index === 0 ? "#01BEEB" : index === 1 ? "#E585E4" : "#F8C312",
                opacity: 0.5 - index * 0.12,
              }}
              animate={{
                left: mousePosition.x,
                top: mousePosition.y,
                scale: 0.8 - index * 0.2,
              }}
              transition={{ duration: 0.45 + index * 0.1, delay: index * 0.07 }}
            />
          ))}
        </>
      )}

      <style>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
