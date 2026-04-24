"use client";

import { useState } from "react";
import IphoneFrame from "./IphoneFrame";
import InstagramHeader from "./InstagramHeader";
import InstagramProfile from "./InstagramProfile";
import HighlightsBar from "./HighlightsBar";
import PostsTabs from "./PostsTabs";
import PostsGrid from "./PostsGrid";
import PostModal from "./PostModal";
import StoryModal from "./StoryModal";
import BookingModal from "./BookingModal";
import HighlightContent from "./HighlightContent";

import { justinePosts } from "@/data/justine-posts";
import type { Post } from "@/data/justine-posts";
import {
  justineHighlights,
  type HighlightId,
} from "@/data/justine-highlights";

export type InstagramAppProps = {
  // Map id de post → date relative à afficher dans la modal post
  dates: Record<number, string>;
  // Anneau dégradé conique aux couleurs Instagram sur l'avatar (signal stories)
  hasActiveStories: boolean;
};

// Composition complète d'un compte Instagram mockup à l'intérieur du frame iPhone.
// Pilote tous les états des modals (post / highlight / booking).
export default function InstagramApp({
  dates,
  hasActiveStories,
}: InstagramAppProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightId | null>(
    null
  );
  const [showBookingModal, setShowBookingModal] = useState(false);

  const currentHighlight = selectedHighlight
    ? justineHighlights.find((h) => h.id === selectedHighlight) ?? null
    : null;

  // Sur la version FULL, le clic sur l'anneau ouvre le highlight "Dispos"
  // (logique IG : la story du jour = celle de l'anneau)
  const handleAvatarClick = hasActiveStories
    ? () => setSelectedHighlight("dispos")
    : undefined;

  return (
    <IphoneFrame
      overlay={
        <>
          <PostModal
            post={selectedPost}
            date={selectedPost ? dates[selectedPost.id] ?? "" : ""}
            open={selectedPost !== null}
            onClose={() => setSelectedPost(null)}
          />

          <StoryModal
            open={selectedHighlight !== null}
            onClose={() => setSelectedHighlight(null)}
            title={
              currentHighlight
                ? `latelier_de_justine · ${currentHighlight.label}`
                : ""
            }
            background={currentHighlight?.background}
            textColor={currentHighlight?.textColor}
          >
            {selectedHighlight && <HighlightContent id={selectedHighlight} />}
          </StoryModal>

          <BookingModal
            open={showBookingModal}
            onClose={() => setShowBookingModal(false)}
          />
        </>
      }
    >
      <InstagramHeader username="latelier_de_justine" />

      <InstagramProfile
        hasActiveStories={hasActiveStories}
        onAvatarClick={handleAvatarClick}
        onBioLinkClick={() => setShowBookingModal(true)}
      />

      <HighlightsBar onSelect={(id) => setSelectedHighlight(id)} />

      <PostsTabs />

      <PostsGrid
        posts={justinePosts}
        onPostClick={(post) => setSelectedPost(post)}
      />

      {/* Padding bas pour respirer après la grille */}
      <div className="h-6 shrink-0" aria-hidden />
    </IphoneFrame>
  );
}
