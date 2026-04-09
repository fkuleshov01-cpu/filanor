"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

// Version light-mode simplifiée : un glow radial teal qui suit le curseur
export const CardSpotlight = ({
  children,
  radius = 300,
  color = "rgba(13, 148, 136, 0.15)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-xl border border-gray-200/60 bg-white",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
