import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixe la racine Turbopack sur ce projet (plusieurs lockfiles présents dans l'arbo utilisateur)
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
