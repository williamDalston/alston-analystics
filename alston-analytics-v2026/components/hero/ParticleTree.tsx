'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
}

function ParticleSystem({ mousePosition }: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

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
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Gentle swaying motion
      const swayX = Math.sin(time * 0.5 + y * 0.1) * 0.02;
      const swayZ = Math.cos(time * 0.5 + y * 0.1) * 0.02;

      // Mouse influence (wind effect)
      const windX = mousePosition.x * 0.5;
      const windZ = mousePosition.y * 0.5;

      positions[i3] = x + swayX + windX * 0.01;
      positions[i3 + 2] = z + swayZ + windZ * 0.01;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#CCFF00"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleTree() {
  const mousePositionRef = useRef({ x: 0, y: 0 });

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

        <ParticleSystem mousePosition={mousePositionRef.current} />

        {/* Optional: Add a subtle glow sphere at the base */}
        <Sphere args={[0.5, 32, 32]} position={[0, -2, 0]}>
          <meshBasicMaterial color="#CCFF00" transparent opacity={0.2} />
        </Sphere>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
