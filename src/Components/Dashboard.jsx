import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const canvasRef = useRef(null);
  const [isStudentDashboard, setIsStudentDashboard] = useState(true);

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

  // Sample data for Student Dashboard
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      completed: 20,
      total: 54,
      attempts: 4,
    },
    {
      id: 2,
      title: "Advanced Web Development",
      completed: 15,
      total: 40,
      attempts: 3,
    },
  ];

  const bookmarks = [
    { id: 1, title: "Python Variables", course: "Introduction to Python Programming" },
    { id: 2, title: "React Hooks", course: "Advanced Web Development" },
  ];

  // Sample data for Instructor Dashboard
  const analytics = {
    studentEngagement: 82,
    quizScores: 78,
  };

  const courses = [
    { id: 1, title: "Introduction to Python Programming", status: "Published" },
    { id: 2, title: "Advanced Web Development", status: "Draft" },
  ];

  return (
    <div className="dashboard-page">
      <canvas ref={canvasRef} className="three-background" />
      <motion.h2
        className="dashboard-title"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isStudentDashboard ? "Student Dashboard" : "Instructor Dashboard"}
      </motion.h2>
      <motion.div
        className="dashboard-toggle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <button
          className={isStudentDashboard ? "active" : ""}
          onClick={() => setIsStudentDashboard(true)}
        >
          Student Dashboard
        </button>
        <button
          className={!isStudentDashboard ? "active" : ""}
          onClick={() => setIsStudentDashboard(false)}
        >
          Instructor Dashboard
        </button>
      </motion.div>

      {isStudentDashboard ? (
        <div className="dashboard-content">
          {/* Enrolled Courses */}
          <motion.section
            className="dashboard-section enrolled-courses"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h3>Enrolled Courses</h3>
            <div className="course-list">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="course-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="course-header">
                    <h4>{course.title}</h4>
                    <div className="circular-progress">
                      <svg className="progress-ring" width="140" height="140">
                        <circle
                          className="progress-ring__circle-bg"
                          stroke="#444"
                          strokeWidth="12"
                          fill="transparent"
                          r="62"
                          cx="70"
                          cy="70"
                        />
                        <motion.circle
                          className="progress-ring__circle"
                          stroke="#00ff00"
                          strokeWidth="12"
                          fill="transparent"
                          r="62"
                          cx="70"
                          cy="70"
                          strokeDasharray="389.56"
                          strokeDashoffset="389.56"
                          animate={{
                            strokeDashoffset: 389.56 * (1 - course.completed / course.total),
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="progress-content">
                        <span className="progress-fraction">
                          {course.completed}/{course.total}
                        </span>
                        <span className="progress-done">Done</span>
                        <span className="progress-label">Solved</span>
                        <span className="attempts">{course.attempts} Attempts</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Bookmarks */}
          <motion.section
            className="dashboard-section bookmarks"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h3>Bookmarks</h3>
            <div className="bookmark-list">
              {bookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  className="bookmark-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span>{bookmark.title}</span>
                  <span className="course-name">{bookmark.course}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Course Creation Tools */}
          <motion.section
            className="dashboard-section course-creation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h3>Course Creation Tools</h3>
            <div className="creation-tools">
              <motion.button
                className="action-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create New Course
              </motion.button>
              <motion.button
                className="action-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Content
              </motion.button>
            </div>
          </motion.section>

          {/* Analytics */}
          <motion.section
            className="dashboard-section analytics"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h3>Analytics</h3>
            <div className="analytics-data">
              <div className="analytics-item">
                <h4>Student Engagement</h4>
                <div className="progress-container">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${analytics.studentEngagement}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="progress-glow"></div>
                    <span className="progress-text">{analytics.studentEngagement}%</span>
                  </motion.div>
                </div>
              </div>
              <div className="analytics-item">
                <h4>Average Quiz Scores</h4>
                <div className="score-display">
                  <motion.span
                    className="score-value"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {analytics.quizScores}/100
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Content Management */}
          <motion.section
            className="dashboard-section content-management"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <h3>Content Management</h3>
            <div className="content-list">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="content-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <span>{course.title}</span>
                  <span className={`status ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                  <button className="edit-button">Edit</button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;