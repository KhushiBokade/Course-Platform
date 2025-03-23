import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Course from './Components/Course';
import Features from './Components/Features';
import Dashboard from './Components/Dashboard';

function App() {
  useEffect(() => {
    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return false;
      }
    };
    
    if (!detectWebGL()) {
      document.body.classList.add('webgl-not-supported');
    }
    
    const root = document.getElementById('root');
    if (root) {
      root.style.paddingTop = '80px';
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="app-content">
        <Routes>
          {/* Default route (home page) */}
          <Route path="/" element={
            <>
              <section id="home" className="section">
                <div className="container">
                  <Hero/>
                </div>
              </section>
            </>
          } />

          {/* Individual routes for each component */}
          <Route path="/courses" element={
            <section className="section">
              <div className="container">
                <Course />
              </div>
            </section>
          } />
          
          <Route path="/features" element={
            <section className="section">
              <div className="container">
                <Features />
              </div>
            </section>
          } />
          
          <Route path="/dashboard" element={
            <section className="section">
              <div className="container">
                <Dashboard />
              </div>
            </section>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;