'use client';

import { useRef, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
  reduceMotion: boolean;
}

function ParticleSystem({ mousePosition, reduceMotion }: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null);
  // Adjust particle count by viewport to keep frame rate smooth
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 900 : 1600;

  // Generate particle positions in a tree-like structure
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create branches that spread upward and outward
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 10 - 2; // -2 to 8
      const radius = Math.pow(Math.random(), 1.5) * (8 - height * 0.3);

      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = height;
      pos[i3 + 2] = Math.sin(angle) * radius;
    }

    return pos;
  }, [particleCount]);

  // Animate particles with wind effect based on mouse position
  useFrame((state) => {
    if (!particlesRef.current || !particlesRef.current.geometry) return;
    if (!particlesRef.current.geometry.attributes.position) return;
    
    const time = state.clock.getElapsedTime();
    const positionAttr = particlesRef.current.geometry.attributes.position;
    if (!positionAttr || !positionAttr.array) return;
    
    const positions = positionAttr.array as Float32Array;
    if (!positions || positions.length !== particleCount * 3) return;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Gentle swaying motion with moderated amplitude for smoothness
      const swayScale = reduceMotion ? 0.5 : 1;
      const swayX = Math.sin(time * 0.5 + y * 0.1) * 0.02 * swayScale;
      const swayZ = Math.cos(time * 0.5 + y * 0.1) * 0.02 * swayScale;
      const swayY = Math.sin(time * 0.3 + y * 0.2) * 0.008 * swayScale;

      // Mouse influence (wind effect) dialed back for steadier motion
      const windScale = reduceMotion ? 0.25 : 0.6;
      const windX = mousePosition.x * windScale;
      const windZ = mousePosition.y * windScale;
      const windY = (mousePosition.x + mousePosition.y) * 0.2 * windScale;

      positions[i3] = x + swayX + windX * 0.02;
      positions[i3 + 1] = y + swayY + windY * 0.01;
      positions[i3 + 2] = z + swayZ + windZ * 0.02;
    }

    if (positionAttr) {
      positionAttr.needsUpdate = true;
    }

    // Slow rotation
    particlesRef.current.rotation.y = time * 0.05;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#CCFF00"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleTree() {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePositionRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 3, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#CCFF00" />

        <ParticleSystem
          mousePosition={mousePositionRef.current}
          reduceMotion={!!prefersReducedMotion}
        />

        {/* Enhanced glow spheres at the base */}
        <Sphere args={[0.6, 32, 32]} position={[0, -2, 0]}>
          <meshBasicMaterial color="#CCFF00" transparent opacity={0.3} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[-2, -1, 1]}>
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.2} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[2, -1, -1]}>
          <meshBasicMaterial color="#CCFF00" transparent opacity={0.2} />
        </Sphere>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
