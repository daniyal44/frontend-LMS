import React, { useRef, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Environment, Html, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './WebDevPage.css';

// 3D Models Components
function HtmlModel({ position, scale = 1 }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/html-logo/model.gltf');
  return <primitive object={scene} position={position} scale={scale} />;
}

function CssModel({ position, scale = 1 }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/css-logo/model.gltf');
  return <primitive object={scene} position={position} scale={scale} />;
}

function JsModel({ position, scale = 1 }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/js-logo/model.gltf');
  return <primitive object={scene} position={position} scale={scale} />;
}

function ReactModel({ position, scale = 1 }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/react-logo/model.gltf');
  return <primitive object={scene} position={position} scale={scale} />;
}

// 3D Background Animation
function FloatingTechLogos() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <HtmlModel position={[-4, 1, -2]} scale={0.8} />
        <CssModel position={[-1, 2, -3]} scale={0.8} />
        <JsModel position={[2, 0, -4]} scale={0.8} />
        <ReactModel position={[4, -1, -3]} scale={0.8} />
      </Float>
    </group>
  );
}

function RotatingCodeSphere() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#00d8ff"
        wireframe
        wireframeLinewidth={2}
        emissive="#00d8ff"
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function AnimatedText3D() {
  return (
    <group position={[0, 3, -2]}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        WEB DEV
        <meshNormalMaterial />
      </Text3D>
    </group>
  );
}

function AnimatedConnectionLines() {
  const linesRef = useRef();
  const points = [
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(-1, 2, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(3, 1, 0),
    new THREE.Vector3(-2, -2, 0),
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <line ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#00ff88" linewidth={2} />
    </line>
  );
}

// Main Component
export default function WebDevPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', color: '#6366f1' },
    { id: 'frontend', title: 'Frontend', color: '#10b981' },
    { id: 'backend', title: 'Backend', color: '#f59e0b' },
    { id: 'fullstack', title: 'Full Stack', color: '#8b5cf6' },
    { id: 'tools', title: 'Tools', color: '#ef4444' },
  ];

  const techStacks = {
    frontend: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Vue', icon: '🟢', color: '#42b883' },
      { name: 'Angular', icon: '🅰️', color: '#DD0031' },
      { name: 'Svelte', icon: '⚡', color: '#FF3E00' },
    ],
    backend: [
      { name: 'Node.js', icon: '⬢', color: '#339933' },
      { name: 'Python', icon: '🐍', color: '#3776AB' },
      { name: 'Java', icon: '☕', color: '#007396' },
      { name: 'Ruby', icon: '💎', color: '#CC342D' },
    ],
    tools: [
      { name: 'Git', icon: '📘', color: '#F1502F' },
      { name: 'Docker', icon: '🐳', color: '#2496ED' },
      { name: 'VS Code', icon: '💻', color: '#007ACC' },
      { name: 'Figma', icon: '🎨', color: '#F24E1E' },
    ],
  };

  return (
    <div className="web-dev-page">
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
            
            <RotatingCodeSphere />
            <FloatingTechLogos />
            <AnimatedText3D />
            <AnimatedConnectionLines />
            
            <Environment preset="city" />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.8}
              minDistance={5}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <header className="header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Modern Web Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="subtitle"
          >
            Building the Digital Future with Cutting-Edge Technologies
          </motion.p>
        </header>

        {/* Navigation */}
        <nav className="nav-sections">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ '--color': section.color }}
            >
              {section.title}
            </motion.button>
          ))}
        </nav>

        {/* Main Content Sections */}
        <main className="main-content">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="content-section"
          >
            {activeSection === 'overview' && (
              <div className="overview-section">
                <h2>Web Development Overview</h2>
                <div className="stats-grid">
                  {[
                    { label: 'Global Developers', value: '28M+' },
                    { label: 'Websites Online', value: '1.8B+' },
                    { label: 'Avg Salary', value: '$85k+' },
                    { label: 'Growth Rate', value: '13%' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="stat-card"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="tech-showcase">
                  <h3>Core Technologies</h3>
                  <div className="tech-icons">
                    {['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB'].map((tech) => (
                      <div key={tech} className="tech-icon">
                        <div className="tech-name">{tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'frontend' && (
              <div className="frontend-section">
                <h2>Frontend Development</h2>
                <div className="tech-stack">
                  {techStacks.frontend.map((tech, idx) => (
                    <motion.div
                      key={tech.name}
                      className="tech-item"
                      style={{ borderColor: tech.color }}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="tech-emoji">{tech.icon}</span>
                      <span className="tech-name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="description">
                  <p>Frontend development focuses on creating the user interface and experience using:</p>
                  <ul>
                    <li>HTML/CSS for structure and styling</li>
                    <li>JavaScript for interactivity</li>
                    <li>Modern frameworks like React, Vue, and Angular</li>
                    <li>Responsive design principles</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'backend' && (
              <div className="backend-section">
                <h2>Backend Development</h2>
                <div className="tech-stack">
                  {techStacks.backend.map((tech, idx) => (
                    <motion.div
                      key={tech.name}
                      className="tech-item"
                      style={{ borderColor: tech.color }}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="tech-emoji">{tech.icon}</span>
                      <span className="tech-name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="description">
                  <p>Backend development handles server-side logic, databases, and APIs:</p>
                  <ul>
                    <li>Server-side programming languages</li>
                    <li>Database management (SQL & NoSQL)</li>
                    <li>API design and development</li>
                    <li>Authentication and security</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'tools' && (
              <div className="tools-section">
                <h2>Development Tools</h2>
                <div className="tools-grid">
                  {techStacks.tools.map((tool, idx) => (
                    <motion.div
                      key={tool.name}
                      className="tool-card"
                      whileHover={{ y: -5, rotate: 2 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{ '--tool-color': tool.color }}
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <h4>{tool.name}</h4>
                      <p>Essential tool for modern development workflow</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="footer-content"
          >
            <p>© 2024 Modern Web Development. All rights reserved.</p>
            <p>Built with React, Three.js, and Framer Motion</p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}