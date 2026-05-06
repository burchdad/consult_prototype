"use client";

import { Children } from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/ui/cn";

export function Reveal({
  children,
  delay = 0,
  className,
  staggerChildren = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
}) {
  const childList = Children.toArray(children);

  if (staggerChildren) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
      >
        {childList.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0.92, y: 6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45 },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0.92, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}
