"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

// Import dynamique pour éviter les erreurs SSR (WebGL)
const NetworkMesh = dynamic(() => import("./network-mesh"), {
  ssr: false,
  loading: () => null,
});

export default function NetworkMeshCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 65 }}
      style={{ background: "transparent", opacity: 0.35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <NetworkMesh />
      </Suspense>
    </Canvas>
  );
}
