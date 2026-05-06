"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeElement, setActiveElement] = useState<"interactive" | null>(null);

  // Mouse tracking
  useEffect(() => {
    // Set body to have cursor: none
    if (document.body) {
      document.body.classList.add("cursor-none");
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the element or its parents have interactive classes
      const target = e.target as Element;
      if (
        target.closest('a, button, [role="button"], input, select, textarea')
      ) {
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

  // Don't render anything on server
  if (typeof window === "undefined") return null;

  return (
    <>
      {isHovering && (
        <>
          <motion.div
            className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[9999] mix-blend-difference"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: activeElement === "interactive" ? 1.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="fixed w-3 h-3 rounded-full bg-white pointer-events-none mix-blend-difference z-[9998]"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                translateX: "-50%",
                translateY: "-50%",
                opacity: 0.3 - index * 0.1,
              }}
              animate={{
                left: mousePosition.x,
                top: mousePosition.y,
                scale: 0.8 - index * 0.2,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        /* Hide cursor on all elements */
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
