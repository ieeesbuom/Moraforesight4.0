"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [particlePositions, setParticlePositions] = useState<
    { x: string; y: string }[]
  >([]);

  useEffect(() => {
    // Generate particle positions only on client to avoid hydration mismatch
    const positions = Array(20)
      .fill(null)
      .map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
      }));
    setParticlePositions(positions);
  }, []);

  // Brand accent colours for particles
  const particleColors = ["#01BEEB", "#E585E4", "#F8C312"];

  return (
    <div className="relative h-screen bg-black overflow-hidden">

      {/* ── BACKGROUND LAYER ── */}

      {/* Subtle digital grid — cyan-tinted lines */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(1,190,235,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(1,190,235,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Ambient glow — Cyan top-left */}
      <div
        className="fixed -top-40 -left-40 w-[560px] h-[560px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(1,190,235,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "ambientPulse 8s ease-in-out infinite",
        }}
      />

      {/* Ambient glow — Pink bottom-right */}
      <div
        className="fixed -bottom-40 -right-40 w-[560px] h-[560px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(229,133,228,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "ambientPulse 10s ease-in-out infinite reverse",
        }}
      />

      {/* Ambient glow — Gold faint centre */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(248,195,18,0.04) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating brand particles */}
      {particlePositions.map((pos, i) => {
        const color = particleColors[i % 3];
        return (
          <div
            key={i}
            className="fixed rounded-full z-0 pointer-events-none"
            style={{
              width: `${1 + (i % 3) * 0.8}px`,
              height: `${1 + (i % 3) * 0.8}px`,
              backgroundColor: color,
              opacity: 0.35 + (i % 4) * 0.1,
              left: pos.x,
              top: pos.y,
              animation: `float ${3.5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i % 4) * 0.5}s`,
            }}
          />
        );
      })}

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center max-w-2xl w-full"
        >
          {/* ── MAIN TITLE ─────────────────────────────────────
              Typography: Space Grotesk Medium (MORA) + Bold (FORESIGHT)
              Colour: White · Cyan→Pink gradient · Gold accent
          ─────────────────────────────────────────────────── */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-4 tracking-tight uppercase leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            MORA{" "}
            <span
              className="font-bold"
              style={{
                background: "linear-gradient(135deg, #01BEEB, #E585E4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FORESIGHT
            </span>{" "}
            <span style={{ color: "#F8C312" }}>4.0</span>
          </h1>

          {/* Brand gradient divider — cyan → pink → gold */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-44 h-[3px] rounded-full mb-8"
            style={{
              background:
                "linear-gradient(90deg, #01BEEB, #E585E4, #F8C312)",
              transformOrigin: "center",
            }}
          />

          {/* ── SUBTITLE ───────────────────────────────────────
              Space Grotesk Light · uppercase tracking · muted white
          ─────────────────────────────────────────────────── */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl font-light mb-10 uppercase"
            style={{
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.28em",
            }}
          >
            Coming Soon
          </motion.h2>

          {/* ── BODY TEXT ──────────────────────────────────────
              Space Grotesk Light · readable on dark bg
          ─────────────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md mb-12 text-sm md:text-base font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            We are preparing something extraordinary. A step beyond tomorrow is
            almost here. Stay tuned for the official launch.
          </motion.p>

          {/* ── CTA BUTTONS ────────────────────────────────────
              Primary: gradient-stroke  |  Secondary: ghost
          ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* Primary — Register Now */}
            <button
              id="btn-register-now"
              className="group relative px-8 py-3 rounded-full font-medium text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box",
                border: "2px solid transparent",
              }}
              onClick={() =>
                window.open("https://register.moraforesight.lk/", "_blank")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(1,190,235,0.15), rgba(229,133,228,0.1)) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box";
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(1,190,235,0.35), 0 0 55px rgba(229,133,228,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #01BEEB, #E585E4, #F8C312) border-box";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </button>

            {/* Secondary — Follow Updates */}
            <button
              id="btn-follow-updates"
              className="group px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
              onClick={() =>
                window.open(
                  "https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K",
                  "_blank"
                )
              }
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

      {/* ── PAGE-LEVEL ANIMATION OVERRIDES ── */}
      <style>{`
        html, body {
          overflow: hidden !important;
          height: 100% !important;
        }

        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
