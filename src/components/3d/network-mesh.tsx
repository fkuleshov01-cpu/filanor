"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Hash déterministe basé sur sin — remplace Math.random
function hash(n: number): number {
  const s = Math.sin(n) * 43758.5453123;
  return s - Math.floor(s);
}

// Distribution organique en toile via hash déterministe + seed
function generateMeshPoints(count: number, seed: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const s = seed * 0.001;
  for (let i = 0; i < count; i++) {
    const x = hash(i * 1.7 + 0.1 + s) * 4 - 2;     // [-2, 2]
    const y = hash(i * 2.3 + 0.5 + s) * 3 - 1.5;   // [-1.5, 1.5]
    const z = hash(i * 3.1 + 0.9 + s) * 1 - 0.5;    // [-0.5, 0.5]
    points.push([x, y, z]);
  }
  return points;
}

// Connexions : K plus proches voisins avec distance max
function buildConnections(
  points: [number, number, number][],
  k: number,
  maxDist: number
): [number, number][] {
  const edges = new Set<string>();
  const result: [number, number][] = [];
  const maxDistSq = maxDist * maxDist;

  for (let i = 0; i < points.length; i++) {
    const distances: { idx: number; dist: number }[] = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const dx = points[i][0] - points[j][0];
      const dy = points[i][1] - points[j][1];
      const dz = points[i][2] - points[j][2];
      const distSq = dx * dx + dy * dy + dz * dz;
      if (distSq <= maxDistSq) {
        distances.push({ idx: j, dist: distSq });
      }
    }
    distances.sort((a, b) => a.dist - b.dist);
    for (let n = 0; n < k && n < distances.length; n++) {
      const j = distances[n].idx;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edges.has(key)) {
        edges.add(key);
        result.push([i, j]);
      }
    }
  }
  return result;
}

// Map des voisins pour chaque noeud
function buildNeighborMap(
  connections: [number, number][],
  pointCount: number
): Map<number, number[]> {
  const map = new Map<number, number[]>();
  for (let i = 0; i < pointCount; i++) map.set(i, []);
  for (const [a, b] of connections) {
    map.get(a)!.push(b);
    map.get(b)!.push(a);
  }
  return map;
}

// Easing ease-out quadratique
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

// État d'un pulse voyageur continu
type PulseState = {
  current: number;
  target: number;
  previous: number;
  progress: number;
  cursor: number;
};

export default function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const pulseRefs = useRef<THREE.Group[]>([]);
  const pointMeshRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);
  // Rotation de base accumulée séparément — évite l'accélération
  const baseRotation = useRef({ x: 0, y: 0 });

  // Détection mobile au mount + seed unique par chargement
  const [isMobile, setIsMobile] = useState(false);
  const [seed] = useState(() => Date.now() % 10000);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const pointCount = isMobile ? 50 : 80;
  const pulseCount = isMobile ? 4 : 8;

  // Positions de base, connexions et voisins — calculés une seule fois
  const { basePoints, connections, neighbors } = useMemo(() => {
    const pts = generateMeshPoints(pointCount, seed);
    const conns = buildConnections(pts, 3, 2.0);
    const nbrs = buildNeighborMap(conns, pointCount);
    return { basePoints: pts, connections: conns, neighbors: nbrs };
  }, [pointCount, seed]);

  // Paramètres d'ondulation par point — chaque point a sa fréquence/phase propre
  const waveParams = useMemo(
    () =>
      basePoints.map((_, i) => ({
        freqX: 0.3 + hash(i * 5.7) * 0.4, // 0.3–0.7 Hz
        freqY: 0.2 + hash(i * 6.3) * 0.3, // 0.2–0.5 Hz
        freqZ: 0.25 + hash(i * 7.1) * 0.35,
        phaseX: hash(i * 8.9) * Math.PI * 2,
        phaseY: hash(i * 9.7) * Math.PI * 2,
        phaseZ: hash(i * 10.3) * Math.PI * 2,
        ampX: 0.08 + hash(i * 11.1) * 0.12, // amplitude 0.08–0.20
        ampY: 0.06 + hash(i * 12.7) * 0.10,
        ampZ: 0.04 + hash(i * 13.3) * 0.08,
      })),
    [basePoints]
  );

  // Positions animées courantes — mises à jour chaque frame
  const currentPoints = useRef<[number, number, number][]>(
    basePoints.map((p) => [...p])
  );

  // Refs pour les géométries des lignes (mise à jour chaque frame)
  const lineRefs = useRef<THREE.Line[]>([]);

  // Matériau partagé pour les lignes
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#14B8A6"),
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  // Géométries initiales des lignes
  const lineObjects = useMemo(() => {
    return connections.map(([a, b]) => {
      const geo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        basePoints[a][0], basePoints[a][1], basePoints[a][2],
        basePoints[b][0], basePoints[b][1], basePoints[b][2],
      ]);
      geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      const line = new THREE.Line(geo, lineMaterial);
      return line;
    });
  }, [basePoints, connections, lineMaterial]);

  // Prochain voisin — déterministe, évite le ping-pong
  const pickNextTarget = (
    current: number,
    previous: number,
    cursor: number
  ): { target: number; cursor: number } => {
    const nbrs = neighbors.get(current) ?? [];
    const candidates = nbrs.filter((n) => n !== previous);
    if (candidates.length === 0) {
      return { target: previous, cursor: cursor + 1 };
    }
    return { target: candidates[cursor % candidates.length], cursor: cursor + 1 };
  };

  // État initial des pulses — répartis et décalés
  const pulsesRef = useRef<PulseState[]>(
    Array.from({ length: 8 }, (_, i) => {
      const startIdx = Math.floor((i * pointCount) / 8);
      const nbrs = neighbors.get(startIdx) ?? [];
      const targetIdx = nbrs.length > 0 ? nbrs[0] : (startIdx + 1) % pointCount;
      return {
        current: startIdx,
        target: targetIdx,
        previous: -1,
        progress: hash(i * 7.13) * 0.8,
        cursor: i,
      };
    })
  );

  // Suivi de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;
    const t = timeRef.current;

    // Rotation de base très lente — accumulée dans un ref séparé
    baseRotation.current.y += 0.0005;
    baseRotation.current.x += 0.0001;

    // Réactivité souris — lerp doux, max 0.1 rad
    mouseCurrent.current.x +=
      (mouseTarget.current.x * 0.1 - mouseCurrent.current.x) * 0.05;
    mouseCurrent.current.y +=
      (mouseTarget.current.y * 0.1 - mouseCurrent.current.y) * 0.05;

    // Assignation directe = base + souris (pas d'accumulation)
    groupRef.current.rotation.x = baseRotation.current.x + mouseCurrent.current.y;
    groupRef.current.rotation.y = baseRotation.current.y + mouseCurrent.current.x;

    // Ondulation organique des points — respiration de la toile
    for (let i = 0; i < basePoints.length; i++) {
      const base = basePoints[i];
      const w = waveParams[i];
      const nx = base[0] + Math.sin(t * w.freqX + w.phaseX) * w.ampX;
      const ny = base[1] + Math.sin(t * w.freqY + w.phaseY) * w.ampY;
      const nz = base[2] + Math.sin(t * w.freqZ + w.phaseZ) * w.ampZ;
      currentPoints.current[i] = [nx, ny, nz];

      // Met à jour la position du mesh du point
      const mesh = pointMeshRefs.current[i];
      if (mesh) mesh.position.set(nx, ny, nz);
    }

    // Met à jour les géométries des lignes
    for (let i = 0; i < connections.length; i++) {
      const [a, b] = connections[i];
      const line = lineRefs.current[i];
      if (!line) continue;
      const posAttr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      const pa = currentPoints.current[a];
      const pb = currentPoints.current[b];
      posAttr.setXYZ(0, pa[0], pa[1], pa[2]);
      posAttr.setXYZ(1, pb[0], pb[1], pb[2]);
      posAttr.needsUpdate = true;
    }

    // Pulses — boucle continue, vitesse réduite (2s par segment)
    const speed = delta / 2.0;

    for (let i = 0; i < pulseCount; i++) {
      const pulse = pulsesRef.current[i];
      pulse.progress += speed;

      if (pulse.progress >= 1) {
        const prevNode = pulse.current;
        pulse.current = pulse.target;
        pulse.previous = prevNode;
        const next = pickNextTarget(pulse.current, pulse.previous, pulse.cursor);
        pulse.target = next.target;
        pulse.cursor = next.cursor;
        pulse.progress = pulse.progress - 1;
      }

      // Position interpolée sur les positions ANIMÉES (pas les positions de base)
      const eased = easeOutQuad(Math.min(pulse.progress, 1));
      const from = currentPoints.current[pulse.current];
      const to = currentPoints.current[pulse.target];
      if (!from || !to) continue;

      const ref = pulseRefs.current[i];
      if (ref) {
        ref.position.set(
          from[0] + (to[0] - from[0]) * eased,
          from[1] + (to[1] - from[1]) * eased,
          from[2] + (to[2] - from[2]) * eased
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Points de la toile */}
      {basePoints.map((pos, i) => (
        <mesh
          key={`pt-${i}`}
          position={pos}
          ref={(el) => {
            if (el) pointMeshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Connexions — refs pour mise à jour des vertices chaque frame */}
      {lineObjects.map((line, i) => (
        <primitive
          key={`ln-${i}`}
          object={line}
          ref={(el: THREE.Line) => {
            if (el) lineRefs.current[i] = el;
          }}
        />
      ))}

      {/* Pulses voyageurs continus */}
      {Array.from({ length: pulseCount }, (_, i) => (
        <group
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulseRefs.current[i] = el;
          }}
        >
          <mesh>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#14B8A6" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#14B8A6" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
