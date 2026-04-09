"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Wrapper carte avec bordure lumineuse qui tourne autour
export function CardWithMovingBorder({
  children,
  borderRadius = "1rem",
  duration = 4000,
  containerClassName,
  innerClassName,
  glowClassName,
}: {
  children: React.ReactNode;
  borderRadius?: string;
  duration?: number;
  containerClassName?: string;
  innerClassName?: string;
  glowClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-transparent p-[1.5px]",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="8%" ry="8%">
          <div
            className={cn(
              "h-28 w-28 bg-[radial-gradient(#0D9488_30%,#059669_55%,transparent_70%)] opacity-80",
              glowClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-white border border-gray-200/60 h-full w-full",
          innerClassName
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </div>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
