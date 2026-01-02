import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, MeshReflectorMaterial, Environment, Lightformer, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiUser, FiLayers, FiSmartphone, FiCode, FiEye, FiDownload, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import * as THREE from 'three';
import './DesignPage.css';

// 3D UI Component
function UIElement({ position, rotation, scale, color = "#4f46e5", type = "button" }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const shape = () => {
    switch(type) {
      case "input":
        return <boxGeometry args={[2, 0.2, 0.1]} />;
      case "card":
        return <roundedBoxGeometry args={[1.8, 1.2, 0.1]} radius={0.05} />;
      default:
        return <roundedBoxGeometry args={[1.2, 0.4, 0.1]} radius={0.05} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {shape()}
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Interactive 3D Phone Model
function PhoneModel({ position, screenContent = "design" }) {
  const phoneRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const screenTextures = {
    design: useTexture('/textures/design-screen.jpg'),
    prototype: useTexture('/textures/prototype-screen.jpg'),
    final: useTexture('/textures/final-screen.jpg')
  };

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      phoneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  return (
    <group ref={phoneRef} position={position}>
      {/* Phone Body */}
      <mesh castShadow onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <roundedBoxGeometry args={[1, 2, 0.1]} radius={0.05} />
        <meshStandardMaterial 
          color={hovered ? "#6366f1" : "#1e293b"} 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.9, 1.8]} />
        <meshBasicMaterial map={screenTextures[screenContent]} />
      </mesh>
      
      {/* Button */}
      <mesh position={[0, -0.9, 0.06]}>
        <circleGeometry args={[0.05, 32]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  );
}

// Floating Design Elements
function FloatingElements() {
  const elementsRef = useRef([]);
  
  useFrame((state) => {
    elementsRef.current.forEach((el, i) => {
      if (el) {
        el.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.1;
        el.rotation.y = Math.cos(state.clock.elapsedTime + i) * 0.1;
        el.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
      }
    });
  });

  const shapes = [
    { type: 'box', color: '#8b5cf6' },
    { type: 'sphere', color: '#10b981' },
    { type: 'cone', color: '#f59e0b' },
    { type: 'torus', color: '#ef4444' },
    { type: 'cylinder', color: '#3b82f6' },
  ];

  return (
    <>
      {shapes.map((shape, i) => {
        const angle = (i / shapes.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh 
              ref={ref => elementsRef.current[i] = ref}
              position={[x, 1, z]}
              scale={0.5}
            >
              {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
              {shape.type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
              {shape.type === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
              {shape.type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
              {shape.type === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
              <meshStandardMaterial 
                color={shape.color}
                transparent
                opacity={0.8}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}

// Design Stats Component
const DesignStats = () => {
  const stats = [
    { value: '95%', label: 'User Satisfaction', color: '#10b981' },
    { value: '40%', label: 'Faster Development', color: '#3b82f6' },
    { value: '60%', label: 'Reduced Errors', color: '#8b5cf6' },
    { value: '5x', label: 'ROI Increase', color: '#f59e0b' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.05 }}
        >
          <div className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="stat-label">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Process Step Component
const ProcessStep = ({ step, index }) => {
  const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <motion.div 
      className="process-step"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ x: 10 }}
    >
      <div className="step-number" style={{ backgroundColor: colors[index] }}>
        {index + 1}
      </div>
      <div className="step-content">
        <h4>{step.title}</h4>
        <p>{step.description}</p>
        <div className="step-tools">
          {step.tools.map((tool, i) => (
            <span key={i} className="tool-tag">{tool}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const UXDesign = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenContent, setScreenContent] = useState('design');

  const designProcess = [
    {
      title: 'Research & Discovery',
      description: 'Understanding user needs, market analysis, and defining project goals',
      tools: ['User Interviews', 'Competitive Analysis', 'Surveys']
    },
    {
      title: 'Wireframing',
      description: 'Creating low-fidelity layouts to establish information hierarchy',
      tools: ['Figma', 'Sketch', 'Balsamiq']
    },
    {
      title: 'Visual Design',
      description: 'Developing high-fidelity mockups with colors, typography, and imagery',
      tools: ['Adobe XD', 'Figma', 'Illustrator']
    },
    {
      title: 'Prototyping',
      description: 'Creating interactive prototypes for user testing',
      tools: ['Framer', 'ProtoPie', 'InVision']
    },
    {
      title: 'Development Handoff',
      description: 'Preparing design specs and assets for development team',
      tools: ['Zeplin', 'Abstract', 'Storybook']
    }
  ];

  const designPrinciples = [
    { icon: <FiUser />, title: 'User-Centered', description: 'Design decisions based on user research and feedback' },
    { icon: <TbCursorClick />, title: 'Intuitive', description: 'Minimal learning curve with predictable interactions' },
    { icon: <FiLayers />, title: 'Consistent', description: 'Uniform patterns and behaviors across the product' },
    { icon: <TbColorSwatch />, title: 'Accessible', description: 'Inclusive design for users of all abilities' },
    { icon: <FiSmartphone />, title: 'Responsive', description: 'Seamless experience across all devices and screen sizes' },
    { icon: <FiCode />, title: 'Scalable', description: 'Design system that grows with product evolution' },
  ];

  return (
    <div className="design-page">
      {/* Navigation */}
      <nav className="design-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-gradient">DESIGN</span>SYSTEM
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Overview', 'Process', 'Principles', 'Tools', 'Showcase'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeTab === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.toLowerCase());
                  setMobileMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}
            <button className="cta-button">
              Get Started <FiArrowRight />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Scene */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1>
              <span className="gradient-text">UI/UX Design</span>
              <br />
              That Transforms Digital Experiences
            </h1>
            <p className="hero-subtitle">
              Creating intuitive, beautiful interfaces that drive engagement and deliver results. 
              Our design process combines user research with cutting-edge visual design.
            </p>
            <div className="hero-buttons">
              <motion.button 
                className="primary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiEye /> View Case Studies
              </motion.button>
              <motion.button 
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload /> Design Kit
              </motion.button>
            </div>
          </motion.div>

          <div className="hero-canvas">
            <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
              <color attach="background" args={['#0f172a']} />
              
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
              
              <Environment preset="studio" />
              
              {/* Main 3D Scene */}
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <PhoneModel position={[0, 0, 0]} screenContent={screenContent} />
              </Float>
              
              <UIElement position={[-2, 1.5, 0]} rotation={[0, 0.5, 0]} type="button" />
              <UIElement position={[2, 0.5, 0]} rotation={[0, -0.5, 0]} type="card" />
              <UIElement position={[0, -1.5, 0]} rotation={[0, 0, 0]} type="input" />
              
              <FloatingElements />
              
              {/* Floor Reflection */}
              <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={40}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#1e293b"
                  metalness={0.5}
                />
              </mesh>
              
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            <div className="screen-controls">
              {['design', 'prototype', 'final'].map((type) => (
                <button
                  key={type}
                  className={`screen-btn ${screenContent === type ? 'active' : ''}`}
                  onClick={() => setScreenContent(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <DesignStats />
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Design Process Section */}
        <section className="section">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Design Process</h2>
            <p className="section-subtitle">
              A systematic approach that ensures quality and user satisfaction at every stage
            </p>
            
            <div className="process-steps">
              {designProcess.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Design Principles */}
        <section className="section principles-section">
          <h2 className="section-title">Design Principles</h2>
          <div className="principles-grid">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                className="principle-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="principle-icon">
                  {principle.icon}
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="section">
          <h2 className="section-title">Design Stack</h2>
          <div className="tools-grid">
            {['Figma', 'Adobe Creative Suite', 'Framer', 'Sketch', 'InVision', 'Webflow'].map((tool, index) => (
              <motion.div
                key={tool}
                className="tool-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="tool-logo">
                  {tool.charAt(0)}
                </div>
                <h4>{tool}</h4>
                <div className="tool-proficiency">
                  <div className="proficiency-bar" style={{ width: `${85 - index * 5}%` }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="design-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-gradient">DESIGN</span>SYSTEM
            <p>Creating exceptional digital experiences since 2024</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Services</h4>
              <a href="#">UI/UX Design</a>
              <a href="#">Design Systems</a>
              <a href="#">User Research</a>
              <a href="#">Prototyping</a>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Case Studies</a>
              <a href="#">Design Kit</a>
              <a href="#">Blog</a>
              <a href="#">Tutorials</a>
            </div>
            
            <div className="link-group">
              <h4>Connect</h4>
              <a href="#">Contact Us</a>
              <a href="#">Careers</a>
              <a href="#">Twitter</a>
              <a href="#">Dribbble</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 DesignSystem. All rights reserved.</p>
          <div className="footer-cta">
            <button className="footer-button">
              Start a Project <FiArrowRight />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UXDesign;