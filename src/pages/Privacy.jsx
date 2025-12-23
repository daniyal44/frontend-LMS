import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import './Privacy.css';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState({
    analytics: true,
    marketing: false,
    thirdParty: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [privacyScore, setPrivacyScore] = useState(100);

  // Privacy policy sections data
  const privacySections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      content: 'We are committed to protecting your personal information and your right to privacy. This policy outlines how we collect, use, and safeguard your data when you use our services.',
      details: 'Our privacy practices comply with GDPR, CCPA, and other global data protection regulations. We regularly review and update our policies to ensure the highest standards of data protection.',
      icon: '🛡️'
    },
    {
      id: 'data-collection',
      title: 'Data We Collect',
      content: 'We collect information you provide directly, data collected automatically, and information from third-party sources.',
      details: 'Direct information includes name, email, and contact details. Automatic data includes IP address, device information, and usage patterns. Third-party data may include social media profiles (with consent).',
      icon: '📊'
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      content: 'Your data helps us provide, maintain, and improve our services, communicate with you, and ensure platform security.',
      details: 'We use data for service delivery, personalization, analytics, marketing (with consent), fraud prevention, and legal compliance. We never sell your personal data to third parties.',
      icon: '⚙️'
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      content: 'We only share your data with trusted partners under strict conditions or when legally required.',
      details: 'Service providers (hosting, payment processing), legal authorities (when required), business transfers (mergers/acquisitions), and with your explicit consent.',
      icon: '🤝'
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      content: 'You have rights regarding your personal data, including access, correction, deletion, and portability.',
      details: 'Right to access, correct, delete, restrict processing, data portability, object to processing, and withdraw consent at any time.',
      icon: '👤'
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: 'We implement robust security measures to protect your personal information.',
      details: 'Encryption in transit and at rest, regular security audits, access controls, and employee training on data protection.',
      icon: '🔐'
    }
  ];

  // Privacy settings options
  const privacySettings = [
    { id: 'analytics', label: 'Analytics Cookies', description: 'Help us understand how visitors interact with our website' },
    { id: 'marketing', label: 'Marketing Cookies', description: 'Used to deliver relevant advertisements' },
    { id: 'thirdParty', label: 'Third-party Cookies', description: 'Set by services external to our website' }
  ];

  // Handle data sharing toggles
  const handleDataSharingToggle = (setting) => {
    setDataSharing(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Calculate privacy score based on settings
  const calculatePrivacyScore = () => {
    let score = 100;
    if (cookiesEnabled) score -= 10;
    if (dataSharing.analytics) score -= 5;
    if (dataSharing.marketing) score -= 20;
    if (dataSharing.thirdParty) score -= 25;
    return Math.max(0, score); // Ensure score doesn't go below 0
  };

  // Update privacy score whenever settings change
  useEffect(() => {
    setPrivacyScore(calculatePrivacyScore());
  }, [cookiesEnabled, dataSharing]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Set maximum privacy function
  const setMaximumPrivacy = () => {
    setCookiesEnabled(false);
    setDataSharing({ analytics: false, marketing: false, thirdParty: false });
  };

  // Download privacy policy function
  const downloadPrivacyPolicy = () => {
    const element = document.createElement('a');
    const file = new Blob([generatePolicyText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'privacy-policy.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Generate policy text for download
  const generatePolicyText = () => {
    return `Privacy Policy - Last Updated: ${new Date().toLocaleDateString()}
    
This document outlines our privacy practices and your rights regarding your personal data.
    
Active Settings:
- Cookies Enabled: ${cookiesEnabled ? 'Yes' : 'No'}
- Analytics Sharing: ${dataSharing.analytics ? 'Enabled' : 'Disabled'}
- Marketing Sharing: ${dataSharing.marketing ? 'Enabled' : 'Disabled'}
- Third-Party Sharing: ${dataSharing.thirdParty ? 'Enabled' : 'Disabled'}
    
For more details, visit our privacy dashboard.`;
  };

  // Find active section details
  const activeSectionData = privacySections.find(section => section.id === activeSection) || privacySections[0];

  return (
    <div className={`privacy-page ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar />
      
      <div className="privacy-container">
        <header className="privacy-header">
          <div className="header-content">
            <div className="header-title">
              <span className="privacy-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <h1>Privacy & Data Protection</h1>
            </div>
            <p className="header-subtitle">Take control of your personal data and privacy settings</p>
          </div>
          
          <div className="header-controls">
            <button 
              className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="toggle-icon">{darkMode ? '☀️' : '🌙'}</span>
              <span className="toggle-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </header>

        <div className="privacy-layout">
          <aside className="privacy-sidebar">
            <div className="privacy-score-card">
              <div className="score-header">
                <h3>Your Privacy Score</h3>
                <span className="score-badge">
                  {privacyScore >= 80 ? 'Excellent' : 
                   privacyScore >= 60 ? 'Good' : 
                   privacyScore >= 40 ? 'Fair' : 'Poor'}
                </span>
              </div>
              <div className="score-display">
                <div className="score-circle">
                  <svg className="score-circle-svg" viewBox="0 0 100 100">
                    <circle className="score-circle-bg" cx="50" cy="50" r="45"></circle>
                    <circle 
                      className="score-circle-progress" 
                      cx="50" 
                      cy="50" 
                      r="45"
                      strokeDasharray={`${privacyScore * 2.83} 283`}
                    ></circle>
                  </svg>
                  <div className="score-value">
                    <span className="score-number">{privacyScore}</span>
                    <span className="score-total">/100</span>
                  </div>
                </div>
                <p className="score-description">
                  {privacyScore >= 80 ? 'Excellent privacy protection!' : 
                   privacyScore >= 60 ? 'Good privacy settings' : 
                   privacyScore >= 40 ? 'Consider adjusting settings' : 
                   'Review your privacy settings'}
                </p>
              </div>
            </div>

            <nav className="privacy-nav">
              <h3>Privacy Policy Sections</h3>
              <ul>
                {privacySections.map(section => (
                  <li key={section.id}>
                    <button
                      className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <span className="nav-icon">{section.icon}</span>
                      <span className="nav-title">{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="cookie-controls">
              <h3>Cookie Settings</h3>
              <div className="cookie-settings">
                <div className="cookie-setting essential">
                  <div className="setting-info">
                    <span className="setting-label">Essential Cookies</span>
                    <span className="setting-description">Required for basic functionality</span>
                  </div>
                  <div className="setting-status locked">
                    <span className="status-icon">🔒</span>
                    <span className="status-text">Always On</span>
                  </div>
                </div>
                
                <div className="cookie-setting toggleable">
                  <div className="setting-info">
                    <span className="setting-label">All Non-Essential Cookies</span>
                    <span className="setting-description">Analytics, marketing, etc.</span>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="cookies-toggle"
                      checked={cookiesEnabled}
                      onChange={() => setCookiesEnabled(!cookiesEnabled)}
                    />
                    <label htmlFor="cookies-toggle" className="toggle-slider">
                      <span className="toggle-knob"></span>
                    </label>
                  </div>
                </div>
              </div>
              <p className="cookie-note">
                {cookiesEnabled 
                  ? 'All cookies are currently enabled' 
                  : 'Only essential cookies are enabled'}
              </p>
            </div>
          </aside>

          <main className="privacy-content">
            <section className="privacy-details">
              <div className="section-header">
                <div className="section-title">
                  <span className="section-icon">{activeSectionData.icon}</span>
                  <h2>{activeSectionData.title}</h2>
                </div>
                <div className="section-actions">
                  <button className="btn-icon" title="Save section">
                    <span>💾</span>
                  </button>
                  <button className="btn-icon" title="Print section">
                    <span>🖨️</span>
                  </button>
                </div>
              </div>
              
              <div className="privacy-card">
                <div className="card-content">
                  <h3>Summary</h3>
                  <p>{activeSectionData.content}</p>
                  
                  <div className="privacy-detail">
                    <h4>Detailed Information</h4>
                    <p>{activeSectionData.details}</p>
                  </div>
                  
                  {/* Visual representation for each section */}
                  <div className="privacy-visual">
                    {activeSection === 'overview' && (
                      <div className="visual-overview">
                        <div className="data-flow">
                          <div className="data-node user">
                            <div className="node-icon">👤</div>
                            <div className="node-label">User</div>
                          </div>
                          <div className="flow-arrow">→</div>
                          <div className="data-node collection">
                            <div className="node-icon">📥</div>
                            <div className="node-label">Collection</div>
                          </div>
                          <div className="flow-arrow">→</div>
                          <div className="data-node protection">
                            <div className="node-icon">🛡️</div>
                            <div className="node-label">Protection</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeSection === 'data-collection' && (
                      <div className="visual-collection">
                        <h4>Types of Data Collected</h4>
                        <div className="collection-types">
                          <div className="type-card direct">
                            <div className="type-icon">📝</div>
                            <h5>Direct Data</h5>
                            <p>Provided by you</p>
                            <ul>
                              <li>Name & Contact</li>
                              <li>Account Details</li>
                              <li>Payment Info</li>
                            </ul>
                          </div>
                          <div className="type-card automatic">
                            <div className="type-icon">⚙️</div>
                            <h5>Automatic Data</h5>
                            <p>Collected automatically</p>
                            <ul>
                              <li>Device Info</li>
                              <li>Usage Patterns</li>
                              <li>Location Data</li>
                            </ul>
                          </div>
                          <div className="type-card third-party">
                            <div className="type-icon">🤝</div>
                            <h5>Third-party</h5>
                            <p>From external sources</p>
                            <ul>
                              <li>Social Media</li>
                              <li>Partners</li>
                              <li>Public Records</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeSection === 'data-sharing' && (
                      <div className="visual-sharing">
                        <div className="sharing-controls">
                          <h4>Data Sharing Controls</h4>
                          <p>Control how your data is shared with external services</p>
                          
                          {privacySettings.map(setting => (
                            <div key={setting.id} className="sharing-option">
                              <div className="sharing-info">
                                <div className="sharing-header">
                                  <h5>{setting.label}</h5>
                                  <span className={`sharing-status ${dataSharing[setting.id] ? 'enabled' : 'disabled'}`}>
                                    {dataSharing[setting.id] ? 'Enabled' : 'Disabled'}
                                  </span>
                                </div>
                                <p>{setting.description}</p>
                              </div>
                              <div className="toggle-switch">
                                <input
                                  type="checkbox"
                                  id={`sharing-${setting.id}`}
                                  checked={dataSharing[setting.id]}
                                  onChange={() => handleDataSharingToggle(setting.id)}
                                />
                                <label htmlFor={`sharing-${setting.id}`} className="toggle-slider">
                                  <span className="toggle-knob"></span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeSection === 'user-rights' && (
                      <div className="visual-rights">
                        <h4>Exercise Your Rights</h4>
                        <div className="rights-grid">
                          <button className="right-btn">📥 Download Data</button>
                          <button className="right-btn">✏️ Correct Data</button>
                          <button className="right-btn">🗑️ Delete Data</button>
                          <button className="right-btn">🚫 Opt Out</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="privacy-actions">
                <button className="btn-primary" onClick={downloadPrivacyPolicy}>
                  <span className="btn-icon">📄</span>
                  Download Full Policy
                </button>
                <button className="btn-secondary">
                  <span className="btn-icon">📧</span>
                  Contact Privacy Officer
                </button>
                <button className="btn-outline" onClick={setMaximumPrivacy}>
                  <span className="btn-icon">🔒</span>
                  Set Maximum Privacy
                </button>
                <button className="btn-outline" onClick={() => {
                  setCookiesEnabled(true);
                  setDataSharing({ analytics: true, marketing: true, thirdParty: true });
                }}>
                  <span className="btn-icon">⚙️</span>
                  Reset to Default
                </button>
              </div>
            </section>

            <section className="privacy-summary">
              <h3>Key Privacy Principles</h3>
              <div className="principles-grid">
                <div className="principle-card">
                  <div className="principle-icon">🔒</div>
                  <h4>Data Minimization</h4>
                  <p>We only collect data necessary for our services</p>
                </div>
                <div className="principle-card">
                  <div className="principle-icon">👁️</div>
                  <h4>Transparency</h4>
                  <p>Clear explanations of how we use your data</p>
                </div>
                <div className="principle-card">
                  <div className="principle-icon">⚙️</div>
                  <h4>User Control</h4>
                  <p>You control your privacy settings and data</p>
                </div>
                <div className="principle-card">
                  <div className="principle-icon">🛡️</div>
                  <h4>Security</h4>
                  <p>Enterprise-grade protection for your data</p>
                </div>
              </div>
            </section>
            
            <section className="data-export">
              <h3>Your Data Rights</h3>
              <div className="export-options">
                <div className="export-card">
                  <h4>Export Your Data</h4>
                  <p>Download all your personal data in a portable format</p>
                  <button className="btn-export">
                    <span>📥</span>
                    Request Data Export
                  </button>
                </div>
                <div className="export-card">
                  <h4>Privacy Requests</h4>
                  <p>Submit requests to delete or correct your information</p>
                  <button className="btn-export">
                    <span>✏️</span>
                    Submit Request
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>

        <footer className="privacy-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p className="footer-note">We update our privacy policy regularly to comply with the latest regulations</p>
            </div>
            <div className="footer-links">
              <a href="#terms" className="footer-link">Terms of Service</a>
              <a href="#cookies" className="footer-link">Cookie Policy</a>
              <a href="#contact" className="footer-link">Contact Us</a>
              <a href="#dpa" className="footer-link">Data Processing Agreement</a>
              <a href="#gdpr" className="footer-link">GDPR Compliance</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Privacy Dashboard. All rights reserved.</p>
            <div className="compliance-badges">
              <span className="badge">GDPR</span>
              <span className="badge">CCPA</span>
              <span className="badge">ISO 27001</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;