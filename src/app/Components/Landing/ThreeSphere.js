'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    // — Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // white bg

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2.5);
    camera.lookAt(0, 0, 0);

    // — Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // — Lighting: pure cyan vs pink
    const cyanLight = new THREE.DirectionalLight(0x56849F, 1);
    cyanLight.position.set(1, 0, 1);
    scene.add(cyanLight);

    const pinkLight = new THREE.DirectionalLight(0xFF6EB4, 1);
    pinkLight.position.set(-1, 0, 1);
    scene.add(pinkLight);

    // — Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;

    // — Load Textures & OBJ
    const texLoader = new THREE.TextureLoader();
    const dispMap   = texLoader.load('/models/sphere/textures/Wavesphere_heights.jpg');
    const normalMap = texLoader.load('/models/sphere/textures/Wavesphere_normals.jpg');

    const objLoader = new OBJLoader();
    objLoader.load(
      '/models/sphere/Low.obj',
      (obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              roughness: 0.5,
              metalness: 0.1,
              displacementMap: dispMap,
              displacementScale: 0.2,
              normalMap: normalMap,
              normalScale: new THREE.Vector2(1, 1),
            });
          }
        });

        // Center & scale
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        obj.position.sub(center);
        obj.scale.setScalar(0.6);

        scene.add(obj);
      },
      undefined,
      (err) => console.error('OBJ load error:', err)
    );

    // — Render Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // — Handle Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // — Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
    />
  );
}
