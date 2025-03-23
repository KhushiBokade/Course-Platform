import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const canvasRef = useRef(null);

  // Three.js Background Animation
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

  const features = [
    {
      title: "Video Lessons",
      description: "Engaging video content to guide you through each topic with clarity and depth.",
      videos: [
        "https://www.youtube.com/embed/UrsmFxEIp5k?si=o_W08iWzytxtzflp",
        "https://www.youtube.com/embed/xDHSP_hyWJA?si=H_PkZIoNl-m0B10b",
        "https://www.youtube.com/embed/xv9UbWp_Frs?si=KfCGThnZ8ooml31u",
      ],
    },
    {
      title: "Quizzes",
      description: "Interactive quizzes to test your knowledge and reinforce learning.",
      dailyQuiz: {
        buttonText: "Daily Quiz",
        score: 85, // Example score (out of 100)
      },
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with real-time progress tracking.",
      progress: 75, // Example progress percentage (0-100)
    },
    {
      title: "Course Completion Certificates",
      description: "Earn a certificate upon completing each course to showcase your achievement.",
      certificates: [
        "https://marketplace.canva.com/EAEffLAeqlo/3/0/1600w/canva-black-border-certificate-of-completion-c_0ntfwrOPo.jpg",
        "https://cdn.venngage.com/template/thumbnail/full/d793fea5-7d9c-4cdf-a438-69ea99c696b3.webp",
        "https://www.ispringsolutions.com/blog/wp-content/uploads/editor/2024/03/ispring-blog-image-1710417350.png",
        "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/nursing-course-completion-certificate-template-73u0pge9ba36b9.webp",
      ],
    },
  ];

  return (
    <div className="features-page">
      <canvas ref={canvasRef} className="three-background" />
      <motion.h2
        className="features-title"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Learning Features
      </motion.h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-item"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.videos && (
              <div className="video-gallery">
                {feature.videos.map((video, idx) => (
                  <motion.div
                    key={idx}
                    className="video-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (idx * 0.1) }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={video}
                      title={`YouTube video player ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                ))}
              </div>
            )}
            {feature.dailyQuiz && (
              <div className="daily-quiz-container">
                <motion.button
                  className="quiz-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.dailyQuiz.buttonText}
                </motion.button>
                <motion.div
                  className="score-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index * 0.2) + 0.2 }}
                >
                  <span className="score-label">Your Score:</span>
                  <motion.span
                    className="score-value"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + 0.4, type: "spring" }}
                  >
                    {feature.dailyQuiz.score}/100
                  </motion.span>
                </motion.div>
              </div>
            )}
            {feature.progress !== undefined && (
              <div className="progress-container">
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                >
                  <div className="progress-glow"></div>
                  <span className="progress-text">{feature.progress}%</span>
                </motion.div>
              </div>
            )}
            {feature.certificates && (
              <div className="certificate-gallery">
                {feature.certificates.map((certificate, idx) => (
                  <motion.div
                    key={idx}
                    className="certificate-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (idx * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={certificate} alt={`Certificate ${idx + 1}`} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;