import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sparkles, Stars, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './DigitalMarketingPage.css';

// ========== 3D COMPONENTS ==========

const DigitalSphere = ({ position, color = '#4f46e5', speed = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#7c73ff' : color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const DataVisualization = () => {
  const meshRef = useRef();
  const points = [];
  
  for (let i = 0; i < 500; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 4;
    points.push(x, y, z);
  }

  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group>
      <lineSegments ref={meshRef}>
        <bufferGeometry attach="geometry" {...linesGeometry} />
        <lineBasicMaterial attach="material" color="#00d4ff" linewidth={1} />
      </lineSegments>
      <Sparkles count={100} size={2} color="#ffffff" />
    </group>
  );
};

const AnimatedChart = () => {
  const barsRef = useRef([]);
  const data = [1, 1.5, 2, 1.2, 2.5, 1.8, 2.2];
  
  useFrame((state) => {
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        bar.scale.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2 + data[i];
      }
    });
  });

  return (
    <group position={[0, -1, 0]}>
      {data.map((height, i) => (
        <mesh 
          key={i} 
          ref={el => barsRef.current[i] = el}
          position={[i - 3, height / 2, 0]}
        >
          <boxGeometry args={[0.4, height, 0.4]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#10b981' : '#3b82f6'}
            emissive={i % 2 === 0 ? '#10b981' : '#3b82f6'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const RotatingPlatform = ({ children }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return <group ref={groupRef}>{children}</group>;
};

// ========== MAIN COMPONENT ==========

const DigitalMarketingPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    leads: 2450,
    conversion: 15.3,
    roi: 320,
    traffic: 12500
  });

  const services = [
    { id: 1, title: 'SEO Optimization', desc: 'Boost your search rankings', icon: '📈', color: '#10b981' },
    { id: 2, title: 'Social Media', desc: 'Engage your audience', icon: '💬', color: '#3b82f6' },
    { id: 3, title: 'PPC Advertising', desc: 'Targeted ad campaigns', icon: '🎯', color: '#8b5cf6' },
    { id: 4, title: 'Content Marketing', desc: 'Quality content creation', icon: '📝', color: '#f59e0b' },
    { id: 5, title: 'Email Marketing', desc: 'Automated campaigns', icon: '📧', color: '#ef4444' },
    { id: 6, title: 'Analytics', desc: 'Data-driven insights', icon: '📊', color: '#06b6d4' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'CEO, TechStart Inc.', text: 'Our traffic increased by 300% in 3 months!' },
    { name: 'Michael Rodriguez', role: 'Marketing Director', text: 'The ROI exceeded our expectations by far.' },
    { name: 'Emma Wilson', role: 'E-commerce Manager', text: 'Conversion rates doubled in just 60 days.' },
  ];

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        leads: prev.leads + Math.floor(Math.random() * 10),
        conversion: Math.min(prev.conversion + (Math.random() - 0.5) * 0.2, 25),
        roi: prev.roi + Math.floor(Math.random() * 5),
        traffic: prev.traffic + Math.floor(Math.random() * 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digital-marketing-page">
      
      {/* Hero Section with 3D Background */}
      <section className="hero-section">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, -10]} angle={0.3} intensity={1} />
            
            <RotatingPlatform>
              <DigitalSphere position={[-3, 1, 0]} color="#3b82f6" speed={0.8} />
              <DigitalSphere position={[3, -1, 0]} color="#10b981" speed={1.2} />
              <DigitalSphere position={[0, 2, -2]} color="#8b5cf6" speed={0.6} />
            </RotatingPlatform>
            
            <DataVisualization />
            <AnimatedChart />
            
            <Float speed={2} rotationIntensity={1}>
              <Text
                position={[0, 0, -3]}
                fontSize={1.2}
                color="#ffffff"
                font="/fonts/Inter-Bold.woff"
              >
                DIGITAL GROWTH
              </Text>
            </Float>
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} />
          </Canvas>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your <span className="gradient-text">Digital Presence</span>
          </h1>
          <p className="hero-subtitle">
            Data-driven marketing solutions that deliver measurable results and accelerate business growth
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Free Audit</button>
            <button className="btn-secondary">View Case Studies</button>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-number">{stats.leads.toLocaleString()}+</div>
            <div className="stat-label">Qualified Leads</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-number">{stats.conversion.toFixed(1)}%</div>
            <div className="stat-label">Avg. Conversion</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">{stats.roi}% ROI</div>
            <div className="stat-label">Average Return</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-number">{(stats.traffic / 1000).toFixed(1)}K</div>
            <div className="stat-label">Monthly Traffic</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our <span className="highlight">Services</span></h2>
        <div className="services-grid">
          {services.map(service => (
            <div 
              key={service.id} 
              className="service-card"
              style={{ '--card-color': service.color } }
              onMouseEnter={() => setActiveSection(service.title.toLowerCase())}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-hover">
                <span>Learn More →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marketing Strategies */}
      <section className="strategies-section">
        <div className="strategy-content">
          <div className="strategy-text">
            <h2>AI-Powered <span className="gradient-text">Marketing Strategies</span></h2>
            <p>
              Leverage cutting-edge artificial intelligence to analyze market trends, 
              predict consumer behavior, and automate campaign optimization in real-time.
            </p>
            <ul className="strategy-list">
              <li>✅ Predictive Analytics & Forecasting</li>
              <li>✅ Automated A/B Testing</li>
              <li>✅ Real-time Performance Tracking</li>
              <li>✅ Personalized Customer Journeys</li>
            </ul>
          </div>
          <div className="strategy-visual">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} />
              <mesh rotation={[0.5, 0.5, 0]}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshPhysicalMaterial 
                  color="#6366f1"
                  transmission={0.8}
                  thickness={1}
                  roughness={0.1}
                  clearcoat={1}
                />
              </mesh>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Client <span className="highlight">Success Stories</span></h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to <span className="gradient-text">Skyrocket</span> Your Growth?</h2>
          <p>Schedule a free 30-minute strategy session with our experts</p>
          <form className="cta-form">
            <input type="email" placeholder="Enter your business email" />
            <button type="submit" className="btn-primary">Get Started</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>DigitalGrowth Pro</h3>
            <p>Transforming businesses through innovative digital solutions</p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 DigitalGrowth Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DigitalMarketingPage;