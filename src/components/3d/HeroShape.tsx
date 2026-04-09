"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Convertit latitude/longitude en position 3D sur une sphère
function latLonToVec3(
  lat: number,
  lon: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return [x, y, z];
}

// Suisse — Berne (capitale) 46.95°N 7.45°E
const SWISS_POSITION = latLonToVec3(46.95, 7.45, 1.52);
const SWISS_HALO_POSITION = latLonToVec3(46.95, 7.45, 1.55);

function SwissMarker() {
  const haloRef = useRef<THREE.Mesh>(null);

  // Pulse du halo — rythme lent, comme un battement
  useFrame((state) => {
    if (haloRef.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 2) * 0.35;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Point central blanc brillant */}
      <mesh position={SWISS_POSITION}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Halo pulsant autour du point */}
      <mesh ref={haloRef} position={SWISS_HALO_POSITION}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotation continue lente sur l'axe Y (comme la Terre)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Sphère principale teal métallique */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color="#0D9488"
            roughness={0.35}
            metalness={0.65}
          />
        </mesh>

        {/* Wireframe overlay — effet globe avec lignes lat/long */}
        <mesh>
          <sphereGeometry args={[1.505, 24, 24]} />
          <meshBasicMaterial
            color="#14B8A6"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Marqueur Suisse qui tourne avec le globe */}
        <SwissMarker />
      </group>
    </Float>
  );
}

function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.9, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#14B8A6"
          emissive="#14B8A6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

export default function HeroShape() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none", background: "transparent" }}
    >
      {/* Éclairage multi-directionnel — pas besoin d'HDR */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -3, 5]} intensity={1.2} color="#14B8A6" />
      <pointLight position={[3, 3, 4]} intensity={1.5} color="#0D9488" />

      <Suspense fallback={null}>
        <Globe />
        <FloatingRing />
      </Suspense>
    </Canvas>
  );
}
