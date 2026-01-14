'use client';

import { useRef, useMemo, useEffect, useState, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Error Boundary for WebGL Canvas
 * Catches React errors and prevents entire page crash
 */
class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Canvas error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - minimal elegant gradient
      return (
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, #02040A 0%, #000000 100%)',
          }}
        />
      );
    }

    return this.props.children;
  }
}

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
  const [webglContextLost, setWebglContextLost] = useState(false);

  // Optimized particle count for network visualization
  // Reduce count for mobile and low-end devices to prevent WebGL context loss
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 600;

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Further reduce for mobile to prevent context loss
    if (isMobile) return 600;
    if (isTablet) return 900;
    return 1200;
  }, []);

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
    // Early return if refs are invalid or WebGL context is lost
    if (webglContextLost || !meshRef.current || !particleData || !state.gl || !state.gl.domElement) return;
    
    // Check if WebGL context is still valid - do this first to prevent errors
    try {
      const gl = state.gl.getContext();
      if (!gl || (gl as WebGLRenderingContext | WebGL2RenderingContext).isContextLost?.()) {
        setWebglContextLost(true);
        return;
      }
    } catch (error) {
      // Context check failed, mark as lost and skip this frame
      setWebglContextLost(true);
      return;
    }

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

          // Bounds check to prevent undefined access
          if (j3 + 2 >= positions.length) continue;

          // Additional safety: ensure positions exist and are numbers
          if (typeof positions[j3] !== 'number' ||
              typeof positions[j3 + 1] !== 'number' ||
              typeof positions[j3 + 2] !== 'number') continue;

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
          // Additional check for valid instance count
          if (i < particleCount) {
            meshRef.current.setMatrixAt(i, dummy.matrix);
          }
        } catch (error) {
          // Silently handle any errors during matrix update (e.g., WebGL context lost)
          // Don't spam console in production
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error setting matrix at index:', i, error);
          }
        }
      }
    }

    // Update connection lines with WebGL context safety checks
    if (linesRef.current && Array.isArray(linePositions) && linePositions.length > 0 && Array.isArray(lineColors) && lineColors.length > 0) {
      try {
        // Double-check WebGL context before updating geometry
        const gl = state.gl.getContext();
        if (!gl || (gl as WebGLRenderingContext | WebGL2RenderingContext).isContextLost?.()) {
          setWebglContextLost(true);
          return;
        }
        
        // Additional validation: ensure geometry ref is still valid
        if (!linesRef.current || !linesRef.current.geometry) {
          return;
        }

        const geometry = linesRef.current.geometry;
        if (!geometry || !geometry.isBufferGeometry) return;

        // Verify geometry is still valid (has attributes object)
        if (!geometry.attributes) return;

        // Create new buffer attributes with proper length validation
        const positionArray = new Float32Array(linePositions);
        const colorArray = new Float32Array(lineColors);

        // Ensure arrays have matching lengths for segments (each segment needs 6 values: 2 points * 3 coords)
        if (positionArray.length > 0 && colorArray.length > 0 && positionArray.length % 6 === 0 && colorArray.length % 6 === 0) {
          // Only update if we have valid data
          const positionAttr = new THREE.Float32BufferAttribute(positionArray, 3);
          const colorAttr = new THREE.Float32BufferAttribute(colorArray, 3);
          
          // Verify attributes were created successfully
          if (positionAttr && colorAttr && positionAttr.array && colorAttr.array.length > 0) {
            geometry.setAttribute('position', positionAttr);
            geometry.setAttribute('color', colorAttr);

            // Safely update attributes only if they exist and are valid
            if (geometry.attributes.position && geometry.attributes.position.array) {
              geometry.attributes.position.needsUpdate = true;
            }
            if (geometry.attributes.color && geometry.attributes.color.array) {
              geometry.attributes.color.needsUpdate = true;
            }
          }
        }
      } catch (error) {
        // Silently handle WebGL context loss errors
        // Don't log in production to avoid console spam
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error updating line geometry (WebGL context may be lost):', error);
        }
        // Return early to prevent further errors
        return;
      }
    }

    // Safely update instance matrix
    if (meshRef.current && meshRef.current.instanceMatrix) {
      try {
        meshRef.current.instanceMatrix.needsUpdate = true;
      } catch (error) {
        // Silently handle WebGL context errors
        console.warn('Error updating instance matrix:', error);
      }
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
    try {
      const geo = new THREE.BufferGeometry();
      // Initialize with placeholder arrays - will be updated in animation loop
      // Use Float32Array(6) for minimal line segment (2 points * 3 coords) to prevent undefined length errors
      const emptyPositions = new Float32Array(6);
      const emptyColors = new Float32Array(6);
      geo.setAttribute('position', new THREE.Float32BufferAttribute(emptyPositions, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(emptyColors, 3));
      return geo;
    } catch (error) {
      // Fallback: return minimal valid geometry
      console.error('Error creating line geometry:', error);
      const geo = new THREE.BufferGeometry();
      const emptyPositions = new Float32Array(6);
      const emptyColors = new Float32Array(6);
      geo.setAttribute('position', new THREE.Float32BufferAttribute(emptyPositions, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(emptyColors, 3));
      return geo;
    }
  }, []);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (geometry) geometry.dispose();
      if (lineGeometry) lineGeometry.dispose();
    };
  }, [geometry, lineGeometry]);

  // Don't render if particleData is invalid or WebGL context is lost
  if (webglContextLost || !particleData || !particleData.positions || particleData.positions.length === 0) {
    return null;
  }

  // Validate geometry attributes before rendering to prevent React Three Fiber errors
  // This prevents the "Cannot read properties of undefined (reading 'length')" error
  try {
    // Check line geometry first
    if (!lineGeometry || !lineGeometry.isBufferGeometry || (lineGeometry as any).disposed) {
      return null;
    }
    
    // Validate line geometry attributes exist and are valid
    const linePosAttr = lineGeometry.attributes?.position;
    if (!linePosAttr) {
      return null;
    }
    
    // Check if attribute has a valid array with length property
    const linePosArray = linePosAttr.array;
    if (!linePosArray || typeof linePosArray.length !== 'number' || linePosArray.length === 0) {
      // Re-initialize with minimal valid array if empty
      try {
        const emptyArray = new Float32Array(6);
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(emptyArray, 3));
      } catch {
        return null; // Can't fix it, don't render
      }
    }
    
    // Validate main geometry
    if (!geometry || !geometry.isBufferGeometry || (geometry as any).disposed) {
      return null;
    }
    
    // Ensure geometry has valid attributes
    if (!geometry.attributes || Object.keys(geometry.attributes).length === 0) {
      return null;
    }
  } catch (error) {
    // If any validation fails, don't render to prevent React Three Fiber errors
    if (process.env.NODE_ENV === 'development') {
      console.warn('Geometry validation failed, skipping render:', error);
    }
    return null;
  }

  // Final safety check: ensure geometries are valid before passing to React Three Fiber
  // This prevents React Three Fiber from trying to access undefined properties
  if (!lineGeometry || !geometry) {
    return null;
  }

  // Verify lineGeometry has valid structure that React Three Fiber expects
  try {
    // Check if lineGeometry has the required structure
    if (!lineGeometry.attributes || !lineGeometry.attributes.position) {
      return null;
    }
    const posAttr = lineGeometry.attributes.position;
    if (!posAttr || !posAttr.array || posAttr.array.length === 0) {
      // Ensure we have at least a minimal valid array
      const minArray = new Float32Array(6);
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(minArray, 3));
    }
  } catch {
    return null; // Can't safely render
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
          color="#E0F2FE"
          emissive="#7DD3FC"
          emissiveIntensity={8}
          toneMapped={false}
          transparent
          opacity={0.95}
          metalness={0.6}
          roughness={0.05}
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
      {/* Primary stellar glow sphere - elegant blue-white */}
      <mesh ref={sphere1Ref} position={[0, -2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#E0F2FE"
          emissive="#7DD3FC"
          emissiveIntensity={10}
          toneMapped={false}
          transparent
          opacity={0.3}
          metalness={0.4}
          roughness={0.1}
        />
      </mesh>

      {/* Secondary star-like accents */}
      <mesh ref={sphere2Ref} position={[-3, -1, 1.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#BAE6FD"
          emissive="#4FC3F7"
          emissiveIntensity={7}
          toneMapped={false}
          transparent
          opacity={0.2}
          metalness={0.3}
          roughness={0.15}
        />
      </mesh>

      <mesh ref={sphere3Ref} position={[3, -1, -1.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#E0F2FE"
          emissive="#7DD3FC"
          emissiveIntensity={7}
          toneMapped={false}
          transparent
          opacity={0.2}
          metalness={0.3}
          roughness={0.15}
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
      // WebGL context restored
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
    <CanvasErrorBoundary>
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
              // WebGL context restored
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
    </CanvasErrorBoundary>
  );
}
