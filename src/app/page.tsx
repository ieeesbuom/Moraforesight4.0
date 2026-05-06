"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineSectionRef = useRef(null);
  const [particlePositions, setParticlePositions] = useState<
    { x: string; y: string }[]
  >([]);

  useEffect(() => {
    // Generate particle positions after component mounts
    const positions = Array(16)
      .fill(null)
      .map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
      }));
    setParticlePositions(positions);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = timelineSectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Subtle grid overlay — digital texture per design guide */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(1,190,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(1,190,235,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Ambient glow: Cyan — top-left */}
      <div
        className="fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(1,190,235,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />
      {/* Ambient glow: Pink — bottom-right */}
      <div
        className="fixed -bottom-32 -right-32 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(229,133,228,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulse 7s ease-in-out infinite 1s",
        }}
      />
      {/* Ambient glow: Gold — center-bottom */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(248,195,18,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse 8s ease-in-out infinite 2s",
        }}
      />

      {/* Vignette — per design guide: focus attention */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Floating particles — brand-colored */}
      {particlePositions.map((pos, i) => {
        const colors = ["#01BEEB", "#E585E4", "#F8C312"];
        const color = colors[i % 3];
        return (
          <div
            key={i}
            className="fixed rounded-full z-0 pointer-events-none"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: color,
              opacity: 0.4 + Math.random() * 0.3,
              left: pos.x,
              top: pos.y,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      })}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center max-w-2xl"
        >
          {/* Title — Space Grotesk Medium, high contrast white */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-4 tracking-tight uppercase"
            style={{ letterSpacing: "-0.02em" }}
          >
            MORA{" "}
            <span
              className="font-bold"
              style={{
                background: "linear-gradient(135deg, #01BEEB, #E585E4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FORESIGHT
            </span>{" "}
            <span style={{ color: "#F8C312" }}>4.0</span>
          </h1>

          {/* Gradient divider — brand gradient bar (cyan → pink → gold) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-40 h-[3px] rounded-full mb-8"
            style={{
              background: "linear-gradient(90deg, #01BEEB, #E585E4, #F8C312)",
            }}
          />

          {/* Subtitle — Space Grotesk Light, uppercase tracking */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl font-light mb-10 tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Coming Soon
          </motion.h2>

          {/* Body text — Space Grotesk Light, readable on dark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md mb-12 text-sm md:text-base font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            We are preparing something extraordinary. A step beyond tomorrow is almost here. Stay tuned for the official launch.
          </motion.p>

          {/* CTA Buttons — gradient stroke per design guide */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* Primary: Register Now — gradient-stroke button */}
            <button
              className="group relative px-8 py-3 rounded-full font-medium text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box",
                border: "2px solid transparent",
              }}
              onClick={() => window.open("https://register.moraforesight.lk/", "_blank")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(1,190,235,0.15), rgba(229,133,228,0.1)) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(1,190,235,0.3), 0 0 50px rgba(229,133,228,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </button>

            {/* Secondary: Follow Updates — subtle ghost button */}
            <button
              className="group px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
              onClick={() => window.open("https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K", "_blank")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              Follow Updates
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Global Animation and Override Styles */}
      <style jsx global>{`
        /* Prevent Scrolling */
        html, body {
          overflow: hidden !important;
          height: 100% !important;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
