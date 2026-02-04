"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedContent({
  children,
  delay = 0,
  className,
}: AnimatedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.header>
  );
}
