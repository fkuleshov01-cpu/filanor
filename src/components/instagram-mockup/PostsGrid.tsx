"use client";

import type { Post } from "@/data/justine-posts";
import PostCard from "./PostCard";

type PostsGridProps = {
  posts: Post[];
  onPostClick: (post: Post) => void;
};

// Grille 3x3 — gap EXACT 2px (signature visuelle Instagram)
export default function PostsGrid({ posts, onPostClick }: PostsGridProps) {
  return (
    <div
      className="grid grid-cols-3 w-full"
      style={{ gap: 2 }}
    >
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          index={index}
          onClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
}
