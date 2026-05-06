"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type HomepageCinematicSceneProps = {
  children: React.ReactNode;
};

export function HomepageCinematicScene({ children }: HomepageCinematicSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(34);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const earthX = useTransform(scrollYProgress, [0, 1], ["-1.6%", "1.2%"]);
  const earthY = useTransform(scrollYProgress, [0, 1], ["-0.6%", "0.8%"]);
  const earthScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.12]);

  const glowX = useTransform(scrollYProgress, [0, 1], ["-1.2%", "1.4%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-1.4%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.72, 0.9, 0.66]);

  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "2.4%"]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.035, 0.06, 0.03]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.35], [0, 6]);

  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(255, 64, 64, 0.12), rgba(255, 64, 64, 0) 36%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    cursorX.set(Math.max(0, Math.min(100, x)));
    cursorY.set(Math.max(0, Math.min(100, y)));
  }

  return (
    <main
      ref={containerRef}
      className="homepage-cinematic-root relative overflow-x-clip"
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden className="homepage-cinematic-stage">
        <div className="homepage-space-layer" />
        <motion.div
          className="homepage-earth-layer"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: earthX,
                  y: earthY,
                  scale: earthScale,
                }
          }
        />
        <motion.div
          className="homepage-atmosphere-layer"
          style={prefersReducedMotion ? undefined : { x: glowX, y: glowY, opacity: glowOpacity }}
        />
        <motion.div
          className="homepage-particle-layer"
          style={prefersReducedMotion ? undefined : { y: particleY, opacity: particleOpacity }}
        />
        <motion.div
          className="homepage-red-glow-layer"
          style={prefersReducedMotion ? undefined : { x: glowX, y: glowY, opacity: glowOpacity }}
        />
        <div className="homepage-scanline-layer" />
        <motion.div
          className="homepage-cursor-glow-layer"
          style={prefersReducedMotion ? undefined : { backgroundImage: cursorGlow }}
        />
        <div className="homepage-edge-vignette-layer" />
        <div className="homepage-depth-vignette" />
      </div>

      <motion.div
        className="homepage-cinematic-content relative z-10"
        style={prefersReducedMotion ? undefined : { ["--hero-shift-y" as string]: useMotionTemplate`${heroTextY}px` }}
      >
        {children}
      </motion.div>
      <div aria-hidden className="homepage-scene-release" />
    </main>
  );
}
