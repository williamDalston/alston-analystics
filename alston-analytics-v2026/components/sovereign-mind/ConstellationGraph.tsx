'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  type: 'model' | 'draft' | 'speech';
  position: [number, number, number];
  connections: string[];
}

const nodes: Node[] = [
  {
    id: 'inversion',
    label: 'Inversion',
    type: 'model',
    position: [0, 0, 0],
    connections: ['leverage', 'pareto'],
  },
  {
    id: 'leverage',
    label: 'Leverage',
    type: 'model',
    position: [3, 1, -2],
    connections: ['pareto'],
  },
  {
    id: 'pareto',
    label: 'Pareto',
    type: 'model',
    position: [-2, -1, 2],
    connections: [],
  },
  {
    id: 'prometheus-ch1',
    label: 'Prometheus: Ch1',
    type: 'draft',
    position: [4, -2, 1],
    connections: ['inversion'],
  },
  {
    id: 'data-speech',
    label: 'Data is Organic',
    type: 'speech',
    position: [-3, 2, -1],
    connections: ['leverage'],
  },
];

function NodeSphere({
  node,
  onClick,
  isSelected,
}: {
  node: Node;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;

    if (hovered || isSelected) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const getColor = () => {
    if (isSelected) return '#E0F2FE';
    switch (node.type) {
      case 'model':
        return '#E0F2FE';
      case 'draft':
        return '#00F0FF';
      case 'speech':
        return '#E2D1C3';
      default:
        return '#E0F2FE';
    }
  };

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Label */}
      <Html distanceFactor={10}>
        <div className="pointer-events-none text-soft-clay font-mono text-xs whitespace-nowrap">
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function ConnectionLines({ nodes }: { nodes: Node[] }) {
  return (
    <>
      {nodes.map((node) =>
        node.connections.map((targetId) => {
          const target = nodes.find((n) => n.id === targetId);
          if (!target) return null;

          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...target.position),
          ];

          return (
            <line key={`${node.id}-${targetId}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      node.position[0],
                      node.position[1],
                      node.position[2],
                      target.position[0],
                      target.position[1],
                      target.position[2],
                    ]),
                    3,
                  ]}
                  count={2}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#E0F2FE" opacity={0.25} transparent />
            </line>
          );
        })
      )}
    </>
  );
}

export function ConstellationGraph() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="relative w-full h-full glass-surface rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#7DD3FC" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />

        <ConnectionLines nodes={nodes} />

        {nodes.map((node) => (
          <NodeSphere
            key={node.id}
            node={node}
            onClick={() => setSelectedNode(node)}
            isSelected={selectedNode?.id === node.id}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableDamping
          dampingFactor={0.08}
          minDistance={6}
          maxDistance={18}
        />
      </Canvas>

      {/* Content Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-0 right-0 w-full md:w-96 h-full glass-heavy p-8 overflow-y-auto"
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-soft-clay/50 hover:text-soft-clay"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-4">
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  selectedNode.type === 'model'
                    ? 'bg-stellar-white/20 text-stellar-white'
                    : selectedNode.type === 'draft'
                    ? 'bg-data-cyan/20 text-data-cyan'
                    : 'bg-soft-clay/20 text-soft-clay'
                }`}
              >
                {selectedNode.type}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-soft-clay mb-4 glow-electric">
              {selectedNode.label}
            </h2>

            <p className="text-soft-clay/70 font-sans leading-relaxed mb-6">
              {selectedNode.type === 'model'
                ? 'A mental model for sovereign decision-making. This framework distills complexity into actionable principles.'
                : selectedNode.type === 'draft'
                ? 'A chapter from the Prometheus manuscript. Exploring creation, leverage, and executive power.'
                : 'A video essay on transforming chaos into clarity. Watch the full presentation below.'}
            </p>

            <a
              href="#"
              className="glass-surface px-6 py-3 rounded-full text-stellar-white font-mono hover:bg-stellar-white/10 transition-all inline-block"
            >
              {selectedNode.type === 'speech' ? 'Watch Video' : 'Read Full Content'} →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
