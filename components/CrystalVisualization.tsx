'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A glowing BCC crystal lattice — "materials emerging from atomic arrangements".
 * Corner atoms (quantum indigo) + body-centred atoms (energy teal), bonded by
 * luminous struts. Floats, rotates slowly and tilts toward the cursor.
 */

const CELLS = 2; // 2×2×2 unit cells

function useLattice() {
  return useMemo(() => {
    const corners: THREE.Vector3[] = [];
    const centers: THREE.Vector3[] = [];
    const bonds: [THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i <= CELLS; i++)
      for (let j = 0; j <= CELLS; j++)
        for (let k = 0; k <= CELLS; k++)
          corners.push(new THREE.Vector3(i, j, k));

    for (let i = 0; i < CELLS; i++)
      for (let j = 0; j < CELLS; j++)
        for (let k = 0; k < CELLS; k++) {
          const c = new THREE.Vector3(i + 0.5, j + 0.5, k + 0.5);
          centers.push(c);
          // BCC: body centre bonds to its 8 cell corners
          for (const di of [0, 1])
            for (const dj of [0, 1])
              for (const dk of [0, 1])
                bonds.push([c, new THREE.Vector3(i + di, j + dj, k + dk)]);
        }

    const offset = new THREE.Vector3(CELLS / 2, CELLS / 2, CELLS / 2);
    corners.forEach((v) => v.sub(offset));
    centers.forEach((v) => v.sub(offset)); // bond start points share these refs
    // Bond end points are freshly created corner coordinates — shift them too
    const shifted: [THREE.Vector3, THREE.Vector3][] = bonds.map(([a, b]) => [
      a,
      b.sub(offset),
    ]);

    return { corners, centers, bonds: shifted };
  }, []);
}

function Bond({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const length = dir.length();
    const position = new THREE.Vector3()
      .addVectors(from, to)
      .multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return { position, quaternion, length };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.018, 0.018, length, 6]} />
      <meshStandardMaterial
        color="#00f5d4"
        emissive="#00f5d4"
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function Atom({
  position,
  color,
  size,
}: {
  position: THREE.Vector3;
  color: string;
  size: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        roughness={0.25}
        metalness={0.4}
      />
    </mesh>
  );
}

function Lattice({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { corners, centers, bonds } = useLattice();

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    // Slow intrinsic rotation
    group.current.rotation.y += delta * 0.15;
    // Gentle tilt toward the cursor
    const targetX = state.pointer.y * 0.3;
    const targetZ = state.pointer.x * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetZ,
      0.04
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={0}
      floatIntensity={reducedMotion ? 0 : 0.6}
    >
      <group ref={group} scale={1.15}>
        {corners.map((p, i) => (
          <Atom key={`c${i}`} position={p} color="#6c63ff" size={0.11} />
        ))}
        {centers.map((p, i) => (
          <Atom key={`b${i}`} position={p} color="#00f5d4" size={0.14} />
        ))}
        {bonds.map(([a, b], i) => (
          <Bond key={`bond${i}`} from={a} to={b} />
        ))}
      </group>
    </Float>
  );
}

export default function CrystalVisualization() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 2.6, 3.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!bg-transparent"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={40} color="#6c63ff" />
      <pointLight position={[-6, -4, -6]} intensity={25} color="#00f5d4" />
      <Lattice reducedMotion={reducedMotion} />
    </Canvas>
  );
}
