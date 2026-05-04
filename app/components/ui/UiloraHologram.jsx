"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function HologramScene({ color, rotationSpeed }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const glowRef = useRef(null);
  const groupRef = useRef(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    outerRef.current.rotation.y = t * rotationSpeed;
    outerRef.current.rotation.x = t * rotationSpeed * 0.37;
    outerRef.current.rotation.z = t * rotationSpeed * 0.18;
    innerRef.current.rotation.y = -t * rotationSpeed * 1.4;
    innerRef.current.rotation.z = t * rotationSpeed * 0.7;
    ring1Ref.current.rotation.z = t * rotationSpeed * 0.6;
    ring2Ref.current.rotation.z = -t * rotationSpeed * 0.45;
    // Pulse the glow sphere
    const pulse = 1 + Math.sin(t * 2) * 0.15;
    glowRef.current.scale.set(pulse, pulse, pulse);
    groupRef.current.rotation.y += (mouse.x * 0.8 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (-mouse.y * 0.4 - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.04} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color={color} />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color={color} />

      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color={color} wireframe opacity={0.55} transparent />
      </mesh>

      {/* Inner wireframe icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.88, 0]} />
        <meshBasicMaterial color={color} wireframe opacity={0.35} transparent />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.018, 8, 80]} />
        <meshBasicMaterial color={color} opacity={0.28} transparent />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.95, 0.01, 6, 64]} />
        <meshBasicMaterial color={color} opacity={0.15} transparent />
      </mesh>

      {/* Core sphere — bright */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={color} opacity={0.9} transparent />
      </mesh>

      {/* Fake glow sphere — large, soft, additive */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color={color}
          opacity={0.12}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function UiloraHologram({
  color = "#ccff00",
  rotationSpeed = 0.4,
}) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <HologramScene color={color} rotationSpeed={rotationSpeed} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
