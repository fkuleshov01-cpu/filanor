"use client";

import Image from "next/image";
import { Scissors } from "lucide-react";
import type { Post } from "@/data/justine-posts";

type PostCardProps = {
  post: Post;
  onClick: () => void;
  index: number; // pour priorité de chargement (3 premiers eager, le reste lazy)
};

// Icône carrousel Instagram (2 carrés superposés) en haut droite
function CarouselBadge() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
      }}
    >
      <rect x="7" y="3" width="14" height="14" rx="2" />
      <path d="M5 7h-1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-1" />
    </svg>
  );
}

// Illustration ciseaux croisés + peigne discret pour Post 8
function ToolsIllustration() {
  return (
    <div className="relative w-[100px] h-[100px] flex items-center justify-center">
      {/* Peigne en arrière-plan, plus discret */}
      <svg
        width="84"
        height="22"
        viewBox="0 0 84 22"
        fill="none"
        stroke="#A8B5A0"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="absolute"
        style={{ top: "62%", opacity: 0.55 }}
        aria-hidden
      >
        <line x1="2" y1="6" x2="82" y2="6" />
        {Array.from({ length: 21 }, (_, i) => (
          <line key={i} x1={4 + i * 3.7} y1="6" x2={4 + i * 3.7} y2="20" />
        ))}
      </svg>

      {/* Deux ciseaux croisés au premier plan */}
      <div
        className="absolute"
        style={{
          transform: "translateX(-12px) rotate(-18deg)",
        }}
      >
        <Scissors size={54} strokeWidth={1.4} color="#A8B5A0" aria-hidden />
      </div>
      <div
        className="absolute"
        style={{
          transform: "translateX(12px) rotate(18deg) scaleX(-1)",
        }}
      >
        <Scissors size={54} strokeWidth={1.4} color="#A8B5A0" aria-hidden />
      </div>
    </div>
  );
}

export default function PostCard({ post, onClick, index }: PostCardProps) {
  const isCarousel = post.type === "carousel";

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-square w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8B5A0]"
      aria-label={`Ouvrir la publication ${post.id}`}
    >
      {/* Carousel cover */}
      {post.type === "carousel" && (
        <Image
          src={post.cover}
          alt={post.slides[0]?.alt ?? ""}
          fill
          sizes="(max-width: 768px) 33vw, 130px"
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          priority={index < 3}
        />
      )}

      {/* Quote */}
      {post.type === "quote" && (
        <div
          className="absolute inset-0 flex items-center justify-center px-4 py-5 text-center"
          style={{ background: post.quote.style.background }}
        >
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <p
              className="leading-[1.35] whitespace-pre-line"
              style={{
                color: post.quote.style.textColor,
                fontFamily: 'var(--font-justine-serif), "Playfair Display", serif',
                fontStyle: post.quote.style.italic ? "italic" : "normal",
                // Réduit légèrement pour la grille (1:1 ~130px)
                fontSize: Math.max(11, Math.round(post.quote.style.fontSize * 0.5)),
                fontWeight: 500,
              }}
            >
              {post.quote.text}
            </p>
            {post.quote.style.signature && (
              <span
                className="text-[8px] tracking-wide self-end"
                style={{
                  color: post.quote.style.signature.color,
                  fontFamily: "var(--font-justine-sans), Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                {post.quote.style.signature.text}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Icon (Post 8) */}
      {post.type === "icon" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 py-5"
          style={{ background: post.icon.background }}
        >
          <div className="scale-[0.6]">
            <ToolsIllustration />
          </div>
          <span
            className="text-[9px] italic tracking-wide"
            style={{
              color: post.icon.captionColor,
              fontFamily: "var(--font-justine-sans), Inter, sans-serif",
            }}
          >
            {post.icon.caption}
          </span>
        </div>
      )}

      {/* Badge carrousel en haut droite */}
      {isCarousel && (
        <div className="absolute top-1.5 right-1.5 pointer-events-none">
          <CarouselBadge />
        </div>
      )}
    </button>
  );
}

export { ToolsIllustration };
