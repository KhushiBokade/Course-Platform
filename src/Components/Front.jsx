import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import img3 from '../assets/img3.png'; // Ensure this path is correct
import './Front.css';

const Front = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2500));
      vertices.push(THREE.MathUtils.randFloatSpread(2500));
      vertices.push(THREE.MathUtils.randFloatSpread(2500));
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x00B4DB, size: 2.5, transparent: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 600;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0008;
      particles.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  return (
    <div className="front-content">
      <canvas ref={canvasRef} className="three-background" />
      <motion.div
        className="text-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>Welcome to EduVerse</h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Your gateway to interactive learning experiences
        </motion.p>
      </motion.div>
      <motion.div
        className="image-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <img src={img3} alt="EduVerse Illustration" />
      </motion.div>
    </div>
  );
};

export default Front;