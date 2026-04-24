"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  X,
  BadgeCheck,
  MoreHorizontal,
} from "lucide-react";
import type { Post } from "@/data/justine-posts";
import { ToolsIllustration } from "./PostCard";

type PostModalProps = {
  post: Post | null;
  date: string;
  open: boolean;
  onClose: () => void;
};

const SAGE = "#A8B5A0";
const SAGE_30 = "rgba(168,181,160,0.3)";
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_SECONDARY = "#8B7355";
const SURFACE = "#FFFCF8";

export default function PostModal({ post, date, open, onClose }: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesDelta, setLikesDelta] = useState(0); // +1 si liké, 0 sinon
  const [isSaved, setIsSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Mesure la largeur du conteneur carrousel (ResizeObserver)
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => setContainerWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, post?.id]);

  // Reset state à l'ouverture/changement de post
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      setIsLiked(false);
      setLikesDelta(0);
      setIsSaved(false);
    }
  }, [open, post?.id]);

  if (!post) return null;

  const isCarousel = post.type === "carousel";
  const slides = post.type === "carousel" ? post.slides : [];
  const totalSlides = slides.length;

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesDelta(0);
    } else {
      setIsLiked(true);
      setLikesDelta(1);
    }
  };

  const totalLikes = post.initialLikes + likesDelta;
  const othersCount = totalLikes - 1;

  const goToSlide = (i: number) => {
    if (i < 0 || i > totalSlides - 1) return;
    setCurrentIndex(i);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[55] md:rounded-[38px] overflow-hidden flex flex-col"
          style={{ background: SURFACE }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-modal-title"
        >
          {/* HEADER MODAL */}
          <header
            className="flex items-center justify-between px-3 py-2.5 shrink-0"
            style={{ borderBottom: "1px solid rgba(139,115,85,0.08)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -ml-1 rounded-md transition-opacity hover:opacity-60"
              aria-label="Fermer la publication"
              style={{ color: TEXT_PRIMARY }}
            >
              <X size={22} strokeWidth={1.8} />
            </button>

            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: SURFACE,
                  color: SAGE,
                  border: "1px solid rgba(168,181,160,0.4)",
                  fontFamily:
                    'var(--font-justine-serif), "Playfair Display", serif',
                }}
                aria-hidden
              >
                LdJ
              </div>
              <div className="flex items-center gap-1">
                <span
                  id="post-modal-title"
                  className="text-[13px] font-semibold tracking-tight"
                  style={{ color: TEXT_PRIMARY }}
                >
                  latelier_de_justine
                </span>
                <BadgeCheck size={14} strokeWidth={2} style={{ color: SAGE }} aria-hidden />
              </div>
            </div>

            <button
              type="button"
              className="p-1.5 -mr-1 rounded-md transition-opacity hover:opacity-60"
              aria-label="Plus d'options"
              style={{ color: TEXT_PRIMARY }}
            >
              <MoreHorizontal size={20} strokeWidth={1.8} />
            </button>
          </header>

          {/* SCROLL AREA */}
          <div className="flex-1 overflow-y-auto">
            {/* MEDIA AREA — carrousel ou rendu statique */}
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden group"
              style={{ aspectRatio: "1 / 1", background: TEXT_PRIMARY }}
            >
              {isCarousel ? (
                <>
                  <motion.div
                    className="flex h-full select-none"
                    drag="x"
                    dragConstraints={{
                      left: -(totalSlides - 1) * containerWidth,
                      right: 0,
                    }}
                    dragElastic={0.15}
                    dragMomentum={false}
                    animate={{ x: -currentIndex * containerWidth }}
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    onDragEnd={(_, info) => {
                      const offset = info.offset.x;
                      const velocity = info.velocity.x;
                      const threshold = containerWidth / 4;
                      if (
                        (offset < -threshold || velocity < -500) &&
                        currentIndex < totalSlides - 1
                      ) {
                        setCurrentIndex(currentIndex + 1);
                      } else if (
                        (offset > threshold || velocity > 500) &&
                        currentIndex > 0
                      ) {
                        setCurrentIndex(currentIndex - 1);
                      }
                    }}
                  >
                    {slides.map((slide, i) => (
                      <div
                        key={slide.src}
                        className="relative shrink-0 h-full"
                        style={{ width: containerWidth || "100%" }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 393px"
                          className="object-cover pointer-events-none"
                          priority={i === 0}
                          draggable={false}
                        />
                      </div>
                    ))}
                  </motion.div>

                  {/* Flèches desktop seulement, visibles au hover */}
                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => goToSlide(currentIndex - 1)}
                      className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      style={{ background: "rgba(255,255,255,0.85)", color: TEXT_PRIMARY }}
                      aria-label="Slide précédente"
                    >
                      <ChevronLeft size={20} strokeWidth={2} />
                    </button>
                  )}
                  {currentIndex < totalSlides - 1 && (
                    <button
                      type="button"
                      onClick={() => goToSlide(currentIndex + 1)}
                      className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      style={{ background: "rgba(255,255,255,0.85)", color: TEXT_PRIMARY }}
                      aria-label="Slide suivante"
                    >
                      <ChevronRight size={20} strokeWidth={2} />
                    </button>
                  )}

                  {/* Compteur slide en haut droite (style IG) */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium pointer-events-none"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      color: "white",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {currentIndex + 1}/{totalSlides}
                  </div>
                </>
              ) : post.type === "quote" ? (
                <div
                  className="absolute inset-0 flex items-center justify-center px-10 py-10"
                  style={{ background: post.quote.style.background }}
                >
                  <div className="flex flex-col items-center gap-6 w-full">
                    <p
                      className="text-center whitespace-pre-line"
                      style={{
                        color: post.quote.style.textColor,
                        fontFamily:
                          'var(--font-justine-serif), "Playfair Display", serif',
                        fontStyle: post.quote.style.italic ? "italic" : "normal",
                        fontSize: post.quote.style.fontSize,
                        lineHeight: 1.4,
                        fontWeight: 500,
                      }}
                    >
                      {post.quote.text}
                    </p>
                    {post.quote.style.signature && (
                      <span
                        className="text-[12px] tracking-wide self-end pr-2"
                        style={{
                          color: post.quote.style.signature.color,
                          fontFamily:
                            "var(--font-justine-sans), Inter, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {post.quote.style.signature.text}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ background: post.icon.background }}
                >
                  <ToolsIllustration />
                  <span
                    className="text-[12px] italic tracking-wide"
                    style={{
                      color: post.icon.captionColor,
                      fontFamily:
                        "var(--font-justine-sans), Inter, sans-serif",
                    }}
                  >
                    {post.icon.caption}
                  </span>
                </div>
              )}
            </div>

            {/* Indicateurs pagination — sous les slides, centré */}
            {isCarousel && totalSlides > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-3 pb-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className="rounded-full transition-all"
                    aria-label={`Aller à la slide ${i + 1}`}
                    style={{
                      width: i === currentIndex ? 6 : 5,
                      height: i === currentIndex ? 6 : 5,
                      background: i === currentIndex ? SAGE : SAGE_30,
                    }}
                  />
                ))}
              </div>
            )}

            {/* ACTION BAR */}
            <div className="flex items-center justify-between px-3 pt-3 pb-1">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleLike}
                  className="p-1 -m-1 rounded-md"
                  aria-label={isLiked ? "Je n'aime plus" : "J'aime"}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.div
                    animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Heart
                      size={26}
                      strokeWidth={1.6}
                      fill={isLiked ? "#ef4444" : "none"}
                      color={isLiked ? "#ef4444" : TEXT_PRIMARY}
                    />
                  </motion.div>
                </motion.button>

                <button
                  type="button"
                  className="p-1 -m-1 rounded-md transition-opacity hover:opacity-60"
                  aria-label="Commenter"
                  style={{ color: TEXT_PRIMARY }}
                >
                  <MessageCircle size={26} strokeWidth={1.6} />
                </button>

                <button
                  type="button"
                  className="p-1 -m-1 rounded-md transition-opacity hover:opacity-60"
                  aria-label="Partager"
                  style={{ color: TEXT_PRIMARY }}
                >
                  <Send size={26} strokeWidth={1.6} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="p-1 -m-1 rounded-md transition-opacity hover:opacity-60"
                aria-label={isSaved ? "Retirer des sauvegardes" : "Sauvegarder"}
                style={{ color: TEXT_PRIMARY }}
              >
                <Bookmark
                  size={26}
                  strokeWidth={1.6}
                  fill={isSaved ? TEXT_PRIMARY : "none"}
                />
              </button>
            </div>

            {/* COMPTEUR LIKES */}
            <p
              className="px-3 pt-1.5 text-[13px]"
              style={{ color: TEXT_PRIMARY }}
            >
              Aimée par <span className="font-semibold">{post.firstLiker}</span>{" "}
              et <span className="font-semibold">{othersCount}</span> autres
              personnes
            </p>

            {/* CAPTION */}
            <div className="px-3 pt-2 text-[13px] leading-[1.45]" style={{ color: TEXT_PRIMARY }}>
              <p className="whitespace-pre-line">
                <span className="font-semibold mr-1">latelier_de_justine</span>
                {post.caption}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-1.5 gap-y-0.5">
                {post.hashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="transition-opacity hover:opacity-70"
                    style={{ color: SAGE }}
                    aria-label={`Hashtag ${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </p>
            </div>

            {/* DATE */}
            <p
              className="px-3 pt-3 pb-6 text-[11px] uppercase tracking-wide"
              style={{ color: TEXT_SECONDARY, opacity: 0.75 }}
            >
              {date}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
