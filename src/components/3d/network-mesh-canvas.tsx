"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const NetworkMesh = dynamic(() => import("./network-mesh"), {
  ssr: false,
  loading: () => null,
});

export default function NetworkMeshCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 65 }}
        style={{ background: "transparent", opacity: 0.35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <NetworkMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
