"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const COUNT = 30000;
const SPEED_MULT = 1;

export default function NeuralSwarmBackground() {
  const containerRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || stateRef.current) return;

    // ── SCENE SETUP ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // ── POST-PROCESSING ──────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.4;
    bloomPass.threshold = 0;
    composer.addPass(bloomPass);

    // ── INSTANCED MESH ───────────────────────────────────────
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const target = new THREE.Vector3();

    const geometry = new THREE.TetrahedronGeometry(0.25);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    const positions = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
      instancedMesh.setColorAt(i, color.setHex(0x00ff88));
    }

    // ── PARAMS ───────────────────────────────────────────────
    const PARAMS = { spread: 90, pulse: 1.6, wave: 3.2, depth: 1.4 };

    // ── SCROLL STATE ─────────────────────────────────────────
    // Camera orbits based on scroll position of the section
    let scrollProgress = 0; // 0 → 1

    const updateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Progress: 0 when section enters viewport bottom, 1 when section leaves viewport top
      const raw = 1 - (rect.bottom / (viewH + rect.height));
      scrollProgress = Math.max(0, Math.min(1, raw));
    };

    const onScroll = () => updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    // ── ANIMATION LOOP ───────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * SPEED_MULT;

      // ── SCROLL-DRIVEN CAMERA ORBIT ───────────────────────
      // Horizontal: 0° → 270° (0 → 3π/2)
      const hAngle = scrollProgress * (270 * Math.PI / 180);
      // Vertical:   0° → 70°  (0 → 70π/180)
      const vAngle = scrollProgress * (70 * Math.PI / 180);
      const radius = 100;

      camera.position.x = radius * Math.cos(vAngle) * Math.sin(hAngle);
      camera.position.y = radius * Math.sin(vAngle);
      camera.position.z = radius * Math.cos(vAngle) * Math.cos(hAngle);
      camera.lookAt(0, 0, 0);

      // ── SWARM LOGIC ──────────────────────────────────────
      for (let i = 0; i < COUNT; i++) {
        const spread = PARAMS.spread;
        const pulse = PARAMS.pulse;
        const wave = PARAMS.wave;
        const depth = PARAMS.depth;

        const n = i / COUNT;
        const layer = Math.floor(n * 7.0);
        const local = n * 7.0 - layer;

        const t = time * 0.6;
        const side = layer - 3.0;

        const a = local * 6.28318530718 + t * (0.25 + layer * 0.03);
        const rBase = (1.0 - Math.abs(side) / 4.2) * spread;
        const r = rBase * (0.45 + 0.55 * Math.sin(local * 3.14159265));

        const xWave = Math.sin(a * 2.0 + t * wave + side) * 6.0 * pulse;
        const yWave = Math.cos(a * 3.0 - t * wave + local * 8.0) * 5.0 * pulse;
        const zWave = Math.sin(a + t * 1.7 + side * 1.3) * 7.0 * pulse;

        const x = side * spread * 0.34 + xWave;
        const y = Math.sin(a) * r + yWave;
        const z = Math.cos(a) * r * depth + zWave;

        const bridge = Math.sin(local * 18.8495559 + t * wave + layer) * 8.0;
        target.set(x + bridge, y, z);

        const activity = 0.5 + 0.5 * Math.sin(t * wave * 1.7 + local * 18.0 + layer);
        const hue = 0.55 + 0.18 * Math.sin(layer * 0.7 + t * 0.4);
        const sat = 0.75 + activity * 0.25;
        const lit = 0.28 + activity * 0.38;
        color.setHSL(hue, sat, lit);

        // LERP & UPDATE
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, color);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.instanceColor.needsUpdate = true;

      composer.render();
    }
    animate();

    // ── RESIZE HANDLER ───────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    stateRef.current = { animId, renderer, composer, scene };

    // ── CLEANUP ──────────────────────────────────────────────
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      composer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      stateRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0, opacity: 0.4 }}
    />
  );
}
