"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(0.15),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.span ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="inline-block opacity-0"
          style={{ filter: filter ? "blur(10px)" : "none" }}
        >
          {word}
          {idx < wordsArray.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
