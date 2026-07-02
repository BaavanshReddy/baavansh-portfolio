"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Three.js hero background — wireframe geometry + particle field     */
/* ------------------------------------------------------------------ */

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ---- Scene & Camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // ---- Materials ----
    const limeMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const violetMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });

    // ---- Geometric shapes ----
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 1),
      limeMat
    );
    ico.position.set(1.5, 0.3, 0);

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.3, 80, 12),
      cyanMat
    );
    torusKnot.position.set(-3, -1, -2);

    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.8, 0),
      violetMat
    );
    octa.position.set(3.5, 2, -3);

    const dodeca = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.6, 0),
      limeMat.clone()
    );
    (dodeca.material as THREE.MeshBasicMaterial).opacity = 0.08;
    dodeca.position.set(-2, 2.5, -1);

    scene.add(ico, torusKnot, octa, dodeca);

    // ---- Particles ----
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0xccff00,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ---- Secondary particle layer (cyan) ----
    const positions2 = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 25;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3;
    }
    const particlesGeo2 = new THREE.BufferGeometry();
    particlesGeo2.setAttribute(
      "position",
      new THREE.BufferAttribute(positions2, 3)
    );
    const particlesMat2 = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.2,
    });
    const particles2 = new THREE.Points(particlesGeo2, particlesMat2);
    scene.add(particles2);

    // ---- Animation ----
    const clock = new THREE.Clock();

    // Pause rendering when the hero is scrolled out of view — no reason to
    // burn GPU on a canvas the user can't see.
    let inView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = inView;
        inView = entry.isIntersecting;
        if (inView && !wasInView) animate();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function animate() {
      if (!inView) return;
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;

      if (!prefersReduced) {
        // Rotate shapes
        ico.rotation.x = elapsed * 0.15;
        ico.rotation.y = elapsed * 0.2;

        torusKnot.rotation.x = elapsed * 0.1;
        torusKnot.rotation.z = elapsed * 0.12;

        octa.rotation.y = elapsed * 0.25;
        octa.rotation.z = elapsed * 0.15;

        dodeca.rotation.x = elapsed * 0.18;
        dodeca.rotation.y = elapsed * 0.22;

        // Mouse parallax
        const targetX = mouse.x * 0.8;
        const targetY = mouse.y * 0.5;
        ico.position.x += (1.5 + targetX - ico.position.x) * 0.02;
        ico.position.y += (0.3 + targetY - ico.position.y) * 0.02;

        torusKnot.position.x += (-3 + targetX * 0.3 - torusKnot.position.x) * 0.015;
        torusKnot.position.y += (-1 + targetY * 0.3 - torusKnot.position.y) * 0.015;

        octa.position.x += (3.5 + targetX * 0.5 - octa.position.x) * 0.02;

        // Subtle particle drift
        particles.rotation.y = elapsed * 0.02;
        particles2.rotation.y = -elapsed * 0.015;
        particles.rotation.x = elapsed * 0.008;
      }

      renderer.render(scene, camera);
    }
    animate();

    // ---- Resize handler ----
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouseMove);

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      particlesGeo.dispose();
      particlesMat.dispose();
      particlesGeo2.dispose();
      particlesMat2.dispose();
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
