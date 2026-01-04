'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
}

/**
 * Modern Network Particle System with Dynamic Connections
 * Implements neural network visualization with sophisticated visual effects
 */
function AdvancedParticleSystem({ mousePosition }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Optimized particle count for network visualization
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 1200;

  // Store particle data for physics simulation
  const particleData = useMemo(() => {
    try {
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const phases = new Float32Array(particleCount); // For organic pulsing

      if (!positions || !velocities || !phases) {
        throw new Error('Failed to allocate particle arrays');
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Create modern 3D network distribution with clustering
        const cluster = Math.floor(Math.random() * 5); // 5 main clusters
        const clusterAngle = (cluster / 5) * Math.PI * 2;
        const clusterRadius = 6 + Math.random() * 3;

        // Add randomness within cluster
        const localAngle = Math.random() * Math.PI * 2;
        const localRadius = Math.random() * 2.5;
        const localHeight = (Math.random() - 0.5) * 3;

        // Position nodes in spherical clusters
        const baseX = Math.cos(clusterAngle) * clusterRadius;
        const baseZ = Math.sin(clusterAngle) * clusterRadius;
        const baseY = Math.sin(clusterAngle * 0.5) * 2;

        positions[i3] = baseX + Math.cos(localAngle) * localRadius;
        positions[i3 + 1] = baseY + localHeight;
        positions[i3 + 2] = baseZ + Math.sin(localAngle) * localRadius;

        // Initialize velocities with slight variation
        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

        // Phase for pulsing animation
        phases[i] = Math.random() * Math.PI * 2;
      }

      return { positions, velocities, phases };
    } catch (error) {
      console.error('Error initializing particle data:', error);
      // Return empty arrays as fallback
      return {
        positions: new Float32Array(0),
        velocities: new Float32Array(0),
        phases: new Float32Array(0),
      };
    }
  }, [particleCount]);

  // Enhanced curl noise for ultra-smooth fluid motion
  const curlNoise3D = (x: number, y: number, z: number, time: number) => {
    // Multi-octave curl noise for organic, flowing movement
    const scale = 0.3;
    const timeScale = 0.15;

    // First octave - broad sweeping motion
    const nx1 = Math.sin(x * scale + time * timeScale) * Math.cos(y * scale * 0.8);
    const ny1 = Math.sin(y * scale + time * timeScale) * Math.cos(z * scale * 0.8);
    const nz1 = Math.sin(z * scale + time * timeScale) * Math.cos(x * scale * 0.8);

    // Second octave - finer detail
    const nx2 = Math.sin(x * scale * 2.1 + time * timeScale * 1.3) * 0.5;
    const ny2 = Math.sin(y * scale * 2.1 + time * timeScale * 1.3) * 0.5;
    const nz2 = Math.sin(z * scale * 2.1 + time * timeScale * 1.3) * 0.5;

    return {
      x: nx1 + nx2,
      y: ny1 + ny2,
      z: nz1 + nz2
    };
  };

  // Animate particles with physics and update connections
  useFrame((state) => {
    if (!meshRef.current || !particleData) return;

    const time = state.clock.getElapsedTime();

    // Safety check: Ensure particleData exists
    if (!particleData.positions || !particleData.velocities || !particleData.phases) {
      return;
    }

    const { positions, velocities, phases } = particleData;

    // Dynamic connection lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxConnectionDistance = 3.5; // Connection threshold

    // Safety check: Ensure arrays are defined and have correct length
    if (!positions || !velocities || !phases ||
        typeof positions.length === 'undefined' ||
        typeof velocities.length === 'undefined' ||
        typeof phases.length === 'undefined' ||
        positions.length !== particleCount * 3 ||
        velocities.length !== particleCount * 3 ||
        phases.length !== particleCount) {
      return;
    }

    const dummy = new THREE.Object3D();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // Apply enhanced curl noise for ultra-smooth flow
      const curl = curlNoise3D(x * 0.08, y * 0.08, z * 0.08, time);

      // Refined magnetic cursor effect with smoother falloff
      const dx = mousePosition.x * 10 - x;
      const dy = mousePosition.y * 5 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const magneticForce = Math.max(0, 1 - distance / 20) * 0.03;

      // Update velocities with smoother forces
      velocities[i3] += curl.x * 0.008 + dx * magneticForce * 0.015;
      velocities[i3 + 1] += curl.y * 0.006 + dy * magneticForce * 0.015;
      velocities[i3 + 2] += curl.z * 0.008;

      // Higher drag for smoother, more fluid motion
      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;

      // Update positions
      x += velocities[i3];
      y += velocities[i3 + 1];
      z += velocities[i3 + 2];

      // Bounding box (keep particles in view)
      const boundRadius = 12;
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter > boundRadius || y < -4 || y > 10) {
        // Respawn at origin with slight randomness
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 2;
        x = Math.cos(angle) * r;
        y = Math.random() * 2;
        z = Math.sin(angle) * r;

        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Check connections to nearby particles (optimized - check subset)
      if (i % 3 === 0) { // Only check every 3rd particle for performance
        for (let j = i + 1; j < Math.min(i + 50, particleCount); j++) {
          const j3 = j * 3;
          const dx = positions[j3] - x;
          const dy = positions[j3 + 1] - y;
          const dz = positions[j3 + 2] - z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxConnectionDistance) {
            // Add line segment
            linePositions.push(x, y, z, positions[j3], positions[j3 + 1], positions[j3 + 2]);

            // Color based on distance (closer = brighter)
            const intensity = 1 - (dist / maxConnectionDistance);
            const r = 0.31 * intensity; // Cyan red component
            const g = 0.76 * intensity; // Cyan green component
            const b = 0.97 * intensity; // Cyan blue component

            lineColors.push(r, g, b, r, g, b);
          }
        }
      }

      // Pulsing scale based on phase - larger nodes
      const pulse = 1 + Math.sin(time * 2 + phases[i]) * 0.2;
      const scale = 0.12 * pulse;

      dummy.position.set(x, y, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      if (meshRef.current && typeof meshRef.current.setMatrixAt === 'function') {
        try {
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } catch (error) {
          // Silently handle any errors during matrix update
          console.warn('Error setting matrix at index:', i, error);
        }
      }
    }

    // Update connection lines
    if (linesRef.current && linePositions.length > 0) {
      const geometry = linesRef.current.geometry;
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    }

    if (meshRef.current && meshRef.current.instanceMatrix) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Gentle rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.03;
    }
  });

  const geometry = useMemo(() => {
    try {
      // More detailed sphere for better visuals
      return new THREE.SphereGeometry(1, 16, 16);
    } catch (error) {
      console.error('Error creating geometry:', error);
      return new THREE.SphereGeometry(1, 16, 16);
    }
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Initialize with empty arrays - will be updated in animation loop
    geo.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute([], 3));
    return geo;
  }, []);

  // Don't render if particleData is invalid
  if (!particleData || !particleData.positions || particleData.positions.length === 0) {
    return null;
  }

  return (
    <>
      {/* Connection lines - rendered first for depth sorting */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Network nodes */}
      <instancedMesh ref={meshRef} args={[geometry, undefined, particleCount]}>
        {/* Modern glass-like material with depth */}
        <meshStandardMaterial
          color="#E8F4F8"
          emissive="#4FC3F7"
          emissiveIntensity={10}
          toneMapped={false}
          transparent
          opacity={0.9}
          metalness={0.5}
          roughness={0.1}
        />
      </instancedMesh>
    </>
  );
}

/**
 * Ambient glow spheres with HDR emission
 */
function BioluminescentSpheres() {
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const sphere3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = -2 + Math.sin(time * 0.5) * 0.2;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = -1 + Math.sin(time * 0.7 + 1) * 0.15;
    }
    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = -1 + Math.sin(time * 0.6 + 2) * 0.15;
    }
  });

  return (
    <>
      {/* Primary glow sphere - elegant cyan */}
      <mesh ref={sphere1Ref} position={[0, -2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#B3E5FC"
          emissive="#4FC3F7"
          emissiveIntensity={12}
          toneMapped={false}
          transparent
          opacity={0.35}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary warm accents */}
      <mesh ref={sphere2Ref} position={[-3, -1, 1.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#FFE0B2"
          emissive="#FFA726"
          emissiveIntensity={8}
          toneMapped={false}
          transparent
          opacity={0.25}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      <mesh ref={sphere3Ref} position={[3, -1, -1.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#E1BEE7"
          emissive="#AB47BC"
          emissiveIntensity={8}
          toneMapped={false}
          transparent
          opacity={0.25}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>
    </>
  );
}

export function AdvancedParticleTree() {
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePositionRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  };

  // Error handler for WebGL context loss
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, []);

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      style={{
        background: 'radial-gradient(ellipse at center, #02040A 0%, #000000 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 15], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          // Disable automatic context loss recovery to prevent errors
          const canvas = gl.domElement;
          if (canvas) {
            canvas.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost');
            }, false);
            canvas.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
            }, false);
          }
        }}
        onError={(error) => {
          console.error('Canvas error:', error);
        }}
      >
        {/* Volumetric atmosphere */}
        <fog attach="fog" args={['#000000', 10, 30]} />

        {/* Refined lighting for elegant depth */}
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 5, 0]} intensity={2.0} color="#4FC3F7" distance={25} decay={2} />
        <pointLight position={[-10, 0, 5]} intensity={1.0} color="#FFA726" distance={18} decay={2} />
        <pointLight position={[10, 0, -5]} intensity={1.0} color="#AB47BC" distance={18} decay={2} />

        {/* Environment for subtle reflections */}
        <Environment preset="night" />

        {/* Particle system */}
        <AdvancedParticleSystem mousePosition={mousePositionRef.current} />

        {/* Ambient glow spheres */}
        <BioluminescentSpheres />

        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Refined HDR Bloom - Crisp and elegant */}
        <EffectComposer multisampling={8}>
          <Bloom
            intensity={1.5}           // Reduced for crisp, refined glow
            luminanceThreshold={0.85} // Tighter threshold for sharper particles
            luminanceSmoothing={0.95} // Smoother gradient
            mipmapBlur               // High-quality blur
            radius={0.6}              // Tighter glow spread for crispness
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
