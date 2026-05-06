"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HomepageCinematicSceneProps = {
  children: React.ReactNode;
};

export function HomepageCinematicScene({ children }: HomepageCinematicSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <main ref={containerRef} className="homepage-cinematic-root relative overflow-x-clip">
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
        <div className="homepage-depth-vignette" />
      </div>

      <div className="homepage-cinematic-content relative z-10">{children}</div>
      <div aria-hidden className="homepage-scene-release" />
    </main>
  );
}
