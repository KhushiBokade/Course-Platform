import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Home.css'; // Use App.css instead of Home.css

const courses = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    description: "Learn Python basics and start coding in no time.",
    image: "https://i.ytimg.com/vi/qTA-dPRch4s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1XjnLl9IdDilUK2oKhaArcb1X9g",
    difficulty: "Beginner",
    price: "Free",
    duration: "2 hrs",
  },
  {
    id: 2,
    title: "Advanced Web Development",
    description: "Master JavaScript, React, and build modern web apps.",
    image: "https://i.ytimg.com/vi/7wnove7K-ZQ/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbt1iK1uxnseWBsgO6v60kH6Hu8Q",
    difficulty: "Advanced",
    price: "$49",
    duration: "10 hrs",
  },
  {
    id: 3,
    title: "Graphic Design Essentials",
    description: "Create stunning visuals with Adobe tools.",
    image: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/74526bc1fc87.jpg",
    difficulty: "Intermediate",
    price: "$29",
    duration: "5 hrs",
  },
  {
    id: 4,
    title: "Data Science with Python",
    description: "Analyze data and build predictive models.",
    image: "https://img.youtube.com/vi/o5t7PxRJSXk/maxresdefault.jpg",
    difficulty: "Intermediate",
    price: "$59",
    duration: "8 hrs",
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    description: "Dive into ML concepts and algorithms.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sTGYUxGPwtxkt2rvTqvDfX-bEb9zZ9EkYg&s",
    difficulty: "Intermediate",
    price: "$69",
    duration: "12 hrs",
  },
  {
    id: 6,
    title: "UI/UX Design Mastery",
    description: "Design user-friendly interfaces with Figma.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6kTlBhnlnCKM-4UyYBNH6K72BJcIOJ8eZLg&s",
    difficulty: "Beginner",
    price: "$39",
    duration: "6 hrs",
  },
  {
    id: 7,
    title: "Cybersecurity Basics",
    description: "Protect systems with essential security skills.",
    image: "https://i.ytimg.com/vi/MkaIrwOlP6Y/maxresdefault.jpg",
    difficulty: "Advanced",
    price: "$79",
    duration: "15 hrs",
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    description: "Build and manage cloud infrastructure.",
    image: "https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/81632719306502.jpg",
    difficulty: "Intermediate",
    price: "$89",
    duration: "10 hrs",
  },
];

const Home = () => {
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
    <div className="app-content">
      <div className="section">
        <canvas ref={canvasRef} className="three-background" />
        <motion.h2
          className="course-page-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Explore Our Courses
        </motion.h2>
        <motion.input
          type="text"
          placeholder="Search for courses..."
          className="course-search-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.div
          className="course-filters"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="course-filter-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <select name="difficulty">
              <option value="">Difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </motion.div>
          <motion.div
            className="course-filter-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <select name="price">
              <option value="">Price</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </motion.div>
          <motion.div
            className="course-filter-item"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <select name="duration">
              <option value="">Duration</option>
              <option value="<1 hr">1 hr</option>
              <option value="1-5 hrs">1-5 hrs</option>
              <option value=">5 hrs">5 hrs</option>
            </select>
          </motion.div>
        </motion.div>

        <div className="course-grid">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-footer">
                  <span className="course-meta">
                    Difficulty: {course.difficulty} | Duration: {course.duration}
                  </span>
                  <span className="course-price">{course.price}</span>
                </div>
                <a href={`/course/${course.id}`} className="btn">Enroll Now</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;