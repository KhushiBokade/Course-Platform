import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Course.css'; // Use App.css instead of Course.css

// Course data (same as before)
const courses = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    description: "Learn Python basics and start coding in no time.",
    image: "https://i.ytimg.com/vi/qTA-dPRch4s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1XjnLl9IdDilUK2oKhaArcb1X9g",
    difficulty: "Beginner",
    price: "Free",
    duration: "2 hrs",
    overview: "This course introduces you to the fundamentals of Python programming, covering basic syntax, variables, and control structures. Perfect for beginners looking to start coding.",
    syllabus: [
      "Introduction to Python and Setup",
      "Variables and Data Types",
      "Control Structures",
      "Functions and Modules",
    ],
  },
  {
    id: 2,
    title: "Advanced Web Development",
    description: "Master JavaScript, React, and build modern web apps.",
    image: "https://i.ytimg.com/vi/7wnove7K-ZQ/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbt1iK1uxnseWBsgO6v60kH6Hu8Q",
    difficulty: "Advanced",
    price: "$49",
    duration: "10 hrs",
    overview: "Dive deep into web development with JavaScript and React. Learn to build responsive, modern web applications with real-world projects.",
    syllabus: [
      "JavaScript Fundamentals",
      "React Basics",
      "State Management",
      "Building a Full-Stack App",
    ],
  },
  {
    id: 3,
    title: "Graphic Design Essentials",
    description: "Create stunning visuals with Adobe tools.",
    image: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/74526bc1fc87.jpg",
    difficulty: "Intermediate",
    price: "$29",
    duration: "5 hrs",
    overview: "Learn the essentials of graphic design using Adobe Photoshop and Illustrator. Create professional-grade visuals for branding and marketing.",
    syllabus: [
      "Introduction to Photoshop",
      "Illustrator Basics",
      "Typography and Color Theory",
      "Designing a Logo",
    ],
  },
  {
    id: 4,
    title: "Data Science with Python",
    description: "Analyze data and build predictive models.",
    image: "https://img.youtube.com/vi/o5t7PxRJSXk/maxresdefault.jpg",
    difficulty: "Intermediate",
    price: "$59",
    duration: "8 hrs",
    overview: "Explore data science with Python, including data analysis, visualization, and machine learning basics. Ideal for aspiring data scientists.",
    syllabus: [
      "Data Analysis with Pandas",
      "Visualization with Matplotlib",
      "Introduction to Machine Learning",
      "Final Project",
    ],
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    description: "Dive into ML concepts and algorithms.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sTGYUxGPwtxkt2rvTqvDfX-bEb9zZ9EkYg&s",
    difficulty: "Intermediate",
    price: "$69",
    duration: "12 hrs",
    overview: "Understand the core concepts of machine learning, including supervised and unsupervised learning, with hands-on projects.",
    syllabus: [
      "Introduction to ML",
      "Supervised Learning",
      "Unsupervised Learning",
      "Model Evaluation",
    ],
  },
  {
    id: 6,
    title: "UI/UX Design Mastery",
    description: "Design user-friendly interfaces with Figma.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6kTlBhnlnCKM-4UyYBNH6K72BJcIOJ8eZLg&s",
    difficulty: "Beginner",
    price: "$39",
    duration: "6 hrs",
    overview: "Master UI/UX design principles using Figma. Learn to create intuitive and visually appealing user interfaces.",
    syllabus: [
      "Introduction to UI/UX",
      "Figma Basics",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    id: 7,
    title: "Cybersecurity Basics",
    description: "Protect systems with essential security skills.",
    image: "https://i.ytimg.com/vi/MkaIrwOlP6Y/maxresdefault.jpg",
    difficulty: "Advanced",
    price: "$79",
    duration: "15 hrs",
    overview: "Learn the fundamentals of cybersecurity, including threat detection, encryption, and network security practices.",
    syllabus: [
      "Introduction to Cybersecurity",
      "Threat Detection",
      "Encryption Basics",
      "Network Security",
    ],
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    description: "Build and manage cloud infrastructure.",
    image: "https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/81632719306502.jpg",
    difficulty: "Intermediate",
    price: "$89",
    duration: "10 hrs",
    overview: "Get hands-on experience with AWS, learning to deploy and manage cloud infrastructure for scalable applications.",
    syllabus: [
      "AWS Fundamentals",
      "EC2 and S3 Basics",
      "Cloud Security",
      "Scaling Applications",
    ],
  },
];

const Course = () => {
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
          Our Courses
        </motion.h2>
        <div className="course-grid">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            >
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-info-container">
                  <div className="overview-container">
                    <h4>Overview</h4>
                    <p>{course.overview}</p>
                  </div>
                  <div className="syllabus-container">
                    <h4>Syllabus</h4>
                    <ul>
                      {course.syllabus.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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

export default Course;