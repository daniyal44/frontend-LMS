import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import './AiIntegrationPage.css';

// 3D AI Brain Component
const AiBrain = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(
          scale * (hovered ? 1.2 : 1),
          scale * (hovered ? 1.2 : 1),
          scale * (hovered ? 1.2 : 1)
        ),
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#00d4ff" : "#6366f1"}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          wireframe={true}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Neural connections */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>
      ))}
    </group>
  );
};

// Floating Data Nodes
const DataNode = ({ position, size = 0.3, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

// Integration Pipeline Visualization
const IntegrationPipeline = () => {
  const points = [
    [-4, 0, 0],
    [-2, 1, 0],
    [0, 0, 0],
    [2, -1, 0],
    [4, 0, 0]
  ];

  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>
      
      {/* Connection points */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={i === 2 ? "#00d4ff" : "#8b5cf6"} />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Scene
const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} />
        
        <AiBrain position={[0, 0, 0]} scale={1.5} />
        
        {/* Data nodes */}
        <DataNode position={[-3, 2, 0]} color="#10b981" />
        <DataNode position={[3, 1, 1]} color="#f59e0b" />
        <DataNode position={[-2, -1, -1]} color="#ef4444" />
        <DataNode position={[2, -2, 1]} color="#8b5cf6" />
        
        <IntegrationPipeline />
        
        <Environment preset="city" />
        <OrbitControls enableZoom={true} enablePan={true} minDistance={5} maxDistance={15} />
      </Suspense>
    </Canvas>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="feature-card">
    <div className="feature-icon" style={{ backgroundColor: `${color}20`, color: color }}>
      {icon}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Integration Step Component
const IntegrationStep = ({ number, title, description, status = "pending" }) => (
  <div className={`integration-step ${status}`}>
    <div className="step-number">{number}</div>
    <div className="step-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

// Main Page Component
const AiIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [apiKey, setApiKey] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState({
    api: false,
    data: false,
    training: false,
    deployment: false
  });

  const features = [
    {
      icon: "🤖",
      title: "Machine Learning",
      description: "Advanced ML algorithms for predictive analytics and pattern recognition",
      color: "#3b82f6"
    },
    {
      icon: "🧠",
      title: "Neural Networks",
      description: "Deep learning models for complex decision making",
      color: "#8b5cf6"
    },
    {
      icon: "📊",
      title: "Data Analysis",
      description: "Real-time data processing and visualization",
      color: "#10b981"
    },
    {
      icon: "🔗",
      title: "API Integration",
      description: "Seamless integration with existing systems and APIs",
      color: "#f59e0b"
    },
    {
      icon: "🛡️",
      title: "Security",
      description: "Enterprise-grade security and compliance",
      color: "#ef4444"
    },
    {
      icon: "⚡",
      title: "Real-time Processing",
      description: "Low-latency processing for immediate insights",
      color: "#ec4899"
    }
  ];

  const integrationSteps = [
    {
      number: 1,
      title: "API Connection",
      description: "Connect to our AI services via REST API or SDK",
      status: "completed"
    },
    {
      number: 2,
      title: "Data Mapping",
      description: "Configure data sources and schema mapping",
      status: "completed"
    },
    {
      number: 3,
      title: "Model Training",
      description: "Train AI models with your specific data",
      status: "in-progress"
    },
    {
      number: 4,
      title: "Testing & Validation",
      description: "Validate AI performance and accuracy",
      status: "pending"
    },
    {
      number: 5,
      title: "Deployment",
      description: "Deploy AI models to production environment",
      status: "pending"
    },
    {
      number: 6,
      title: "Monitoring & Optimization",
      description: "Continuous monitoring and performance optimization",
      status: "pending"
    }
  ];

  const handleIntegrationStart = () => {
    setIntegrationStatus({
      api: true,
      data: true,
      training: false,
      deployment: false
    });
  };

  return (
    <div className="ai-integration-page">
      {/* Hero Section with 3D Canvas */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>AI Integration Platform</h1>
          <p className="subtitle">
            Seamlessly integrate artificial intelligence into your applications with our comprehensive platform
          </p>
          <button className="cta-button" onClick={handleIntegrationStart}>
            Start Integration
          </button>
        </div>
        <div className="canvas-container">
          <Scene />
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2>AI Capabilities</h2>
        <p className="section-description">
          Leverage our powerful AI features to transform your business processes
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Integration Process */}
      <section className="integration-process">
        <div className="process-header">
          <h2>Integration Process</h2>
          <div className="process-tabs">
            {['overview', 'api', 'data', 'deployment'].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="process-content">
          <div className="steps-container">
            {integrationSteps.map((step) => (
              <IntegrationStep key={step.number} {...step} />
            ))}
          </div>

          <div className="api-configuration">
            <h3>API Configuration</h3>
            <div className="config-form">
              <div className="form-group">
                <label>API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>
              <div className="form-group">
                <label>Endpoint URL</label>
                <input
                  type="text"
                  defaultValue="https://api.aimlplatform.com/v1"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Integration Status</label>
                <div className="status-indicators">
                  <div className={`status-indicator ${integrationStatus.api ? 'active' : ''}`}>
                    API Connected
                  </div>
                  <div className={`status-indicator ${integrationStatus.data ? 'active' : ''}`}>
                    Data Synced
                  </div>
                  <div className={`status-indicator ${integrationStatus.training ? 'active' : ''}`}>
                    Model Training
                  </div>
                  <div className={`status-indicator ${integrationStatus.deployment ? 'active' : ''}`}>
                    Deployed
                  </div>
                </div>
              </div>
              <button className="connect-button">
                Connect to API
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="code-section">
        <h2>Integration Example</h2>
        <div className="code-container">
          <div className="code-tabs">
            <button className="code-tab active">Python</button>
            <button className="code-tab">JavaScript</button>
            <button className="code-tab">Java</button>
          </div>
          <pre className="code-block">
            {`# AI Integration Example - Python
import aiml_sdk

# Initialize the AI client
client = aiml_sdk.Client(api_key="your_api_key_here")

# Configure AI model
model_config = {
    "model": "gpt-4",
    "temperature": 0.7,
    "max_tokens": 1000
}

# Process data with AI
def process_with_ai(data):
    response = client.process(
        model_config=model_config,
        input_data=data,
        stream=False
    )
    
    # Get predictions
    predictions = response.get_predictions()
    
    # Generate insights
    insights = client.analyze(predictions)
    
    return {
        "predictions": predictions,
        "insights": insights,
        "confidence": response.confidence_score
    }

# Example usage
data = load_your_data()
results = process_with_ai(data)
print(f"AI Insights: {results['insights']}")`}
          </pre>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">&lt;100ms</div>
          <div className="stat-label">Response Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Pre-trained Models</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Business with AI?</h2>
        <p>Start your integration today and unlock the power of artificial intelligence</p>
        <div className="cta-buttons">
          <button className="primary-cta">Get Started Free</button>
          <button className="secondary-cta">Schedule Demo</button>
        </div>
      </section>
    </div>
  );
};

export default AiIntegrationPage;