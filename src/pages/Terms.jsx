// Terms.jsx
import React from 'react';
import './Terms.css';

const Terms = () => {
  // Scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="terms-container">
      {/* Header Section */}
      <header className="terms-header">
        <div className="header-content">
          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last Updated: October 26, 2023</p>
          <p className="header-description">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>
      </header>

      <div className="terms-content-wrapper">
        {/* Quick Navigation Sidebar */}
        <aside className="terms-navigation">
          <h3>Quick Navigation</h3>
          <ul>
            <li><button onClick={() => scrollToSection('introduction')}>Introduction</button></li>
            <li><button onClick={() => scrollToSection('definitions')}>Definitions</button></li>
            <li><button onClick={() => scrollToSection('account-terms')}>Account Terms</button></li>
            <li><button onClick={() => scrollToSection('user-responsibilities')}>User Responsibilities</button></li>
            <li><button onClick={() => scrollToSection('intellectual-property')}>Intellectual Property</button></li>
            <li><button onClick={() => scrollToSection('privacy')}>Privacy & Data</button></li>
            <li><button onClick={() => scrollToSection('termination')}>Termination</button></li>
            <li><button onClick={() => scrollToSection('disclaimer')}>Disclaimer</button></li>
            <li><button onClick={() => scrollToSection('governing-law')}>Governing Law</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
          </ul>
          
          <div className="acceptance-box">
            <h4>Acceptance Required</h4>
            <p>By using our services, you agree to these terms.</p>
            <div className="checkbox-wrapper">
              <input type="checkbox" id="accept-terms" />
              <label htmlFor="accept-terms">I have read and accept the terms</label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="terms-main-content">
          {/* Introduction Section */}
          <section id="introduction" className="terms-section">
            <div className="section-header">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Document signing illustration" 
                className="section-image"
              />
              <div>
                <h2>1. Introduction</h2>
                <p className="section-intro">
                  Welcome to our platform. These Terms and Conditions govern your use of our website, applications, and services.
                </p>
              </div>
            </div>
            
            <div className="content-block">
              <p>
                These Terms of Service ("Terms") govern your access to and use of our services, including our various websites, SMS, APIs, email notifications, applications, buttons, widgets, ads, commerce services, and our other covered services that link to these Terms (collectively, the "Services"), and any information, text, links, graphics, photos, audio, videos, or other materials or arrangements of materials uploaded, downloaded or appearing on the Services (collectively referred to as "Content").
              </p>
              <p>
                By using the Services you agree to be bound by these Terms. If you are using the Services on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these Terms. In that case, "you" and "your" will refer to that organization.
              </p>
              <div className="highlight-box">
                <strong>Important:</strong> These terms include a mandatory arbitration provision and a waiver of your right to participate in a class action lawsuit. Please read carefully.
              </div>
            </div>
          </section>

          {/* Definitions Section */}
          <section id="definitions" className="terms-section">
            <h2>2. Definitions</h2>
            <div className="content-block">
              <p>For the purposes of these Terms and Conditions:</p>
              <ul className="definition-list">
                <li>
                  <strong>"Service"</strong> refers to the website, applications, and services provided by our company.
                </li>
                <li>
                  <strong>"User"</strong> refers to any individual or entity that accesses or uses the Service.
                </li>
                <li>
                  <strong>"Content"</strong> refers to text, images, videos, audio, or other materials that can be posted, uploaded, shared, or otherwise made available through the Service.
                </li>
                <li>
                  <strong>"Account"</strong> refers to the unique account created for you to access our Service.
                </li>
                <li>
                  <strong>"Personal Data"</strong> refers to any information that relates to an identified or identifiable individual.
                </li>
              </ul>
            </div>
          </section>

          {/* Account Terms Section */}
          <section id="account-terms" className="terms-section">
            <div className="section-header">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Secure login illustration" 
                className="section-image"
              />
              <div>
                <h2>3. Account Terms</h2>
                <p className="section-intro">
                  Requirements for creating and maintaining an account with our service.
                </p>
              </div>
            </div>
            
            <div className="content-block">
              <h3>3.1 Eligibility</h3>
              <p>
                To use our Services, you must be at least 13 years old. If you are under 18, you may only use the Services with the consent of a parent or legal guardian. By using the Services, you state that you meet these requirements and that you agree to these Terms.
              </p>
              
              <h3>3.2 Account Creation</h3>
              <p>
                When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.
              </p>
              
              <h3>3.3 Account Security</h3>
              <p>
                You are responsible for safeguarding your account credentials. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements. You are responsible for all activities that occur under your account, whether or not you know about them.
              </p>
            </div>
          </section>

          {/* User Responsibilities Section */}
          <section id="user-responsibilities" className="terms-section">
            <h2>4. User Responsibilities</h2>
            <div className="content-block">
              <p>As a user of our Service, you agree to the following:</p>
              
              <div className="responsibility-grid">
                <div className="responsibility-card">
                  <div className="card-icon">✓</div>
                  <h4>Compliance with Laws</h4>
                  <p>You will comply with all applicable laws, rules, and regulations in your use of the Service.</p>
                </div>
                
                <div className="responsibility-card">
                  <div className="card-icon">✓</div>
                  <h4>Accurate Information</h4>
                  <p>You will provide accurate and complete information when creating an account and using the Service.</p>
                </div>
                
                <div className="responsibility-card">
                  <div className="card-icon">✓</div>
                  <h4>Respect Others</h4>
                  <p>You will not harass, threaten, or intimidate other users or post content that is harmful or offensive.</p>
                </div>
                
                <div className="responsibility-card">
                  <div className="card-icon">✗</div>
                  <h4>Prohibited Activities</h4>
                  <p>You will not engage in spamming, phishing, or any malicious activities through the Service.</p>
                </div>
              </div>
              
              <h3>4.1 Prohibited Conduct</h3>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="prohibited-list">
                <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Harassing, threatening, intimidating, or stalking any other user of our Service</li>
                <li>Violating, or encouraging others to violate, any right of a third party</li>
                <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity</li>
                <li>Interfering with or disrupting the operation of the Service</li>
                <li>Attempting to gain unauthorized access to the Service or its related systems or networks</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property Section */}
          <section id="intellectual-property" className="terms-section">
            <div className="section-header">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Intellectual property illustration" 
                className="section-image"
              />
              <div>
                <h2>5. Intellectual Property Rights</h2>
                <p className="section-intro">
                  Our platform's content, features, and functionality are owned by us and are protected by copyright, trademark, and other laws.
                </p>
              </div>
            </div>
            
            <div className="content-block">
              <h3>5.1 Our Content</h3>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of our company.
              </p>
              
              <h3>5.2 Your Content</h3>
              <p>
                By posting, uploading, or submitting any content to our Service, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform that content in connection with the Service and our business.
              </p>
              <p>
                You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to grant the license above. You retain all of your ownership rights in your content.
              </p>
              
              <div className="ip-notice">
                <h4>Copyright Infringement</h4>
                <p>
                  We respect the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us with the following information:
                </p>
                <ol>
                  <li>A physical or electronic signature of the copyright owner or authorized person</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing</li>
                  <li>Your contact information</li>
                  <li>A statement that you have a good faith belief that use of the material is not authorized</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section id="privacy" className="terms-section">
            <h2>6. Privacy & Data Protection</h2>
            <div className="content-block">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              
              <div className="data-protection-grid">
                <div className="data-protection-item">
                  <h4>Data Collection</h4>
                  <p>We collect information you provide directly to us, such as when you create an account, and information about your use of the Service.</p>
                </div>
                
                <div className="data-protection-item">
                  <h4>Data Usage</h4>
                  <p>We use collected data to provide, maintain, and improve our services, to develop new ones, and to protect our users.</p>
                </div>
                
                <div className="data-protection-item">
                  <h4>Data Sharing</h4>
                  <p>We do not sell your personal data. We share information only as described in our Privacy Policy.</p>
                </div>
                
                <div className="data-protection-item">
                  <h4>Your Rights</h4>
                  <p>You have rights regarding your personal data, including access, correction, and deletion rights where applicable.</p>
                </div>
              </div>
              
              <h3>6.1 Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>
          </section>

          {/* Termination Section */}
          <section id="termination" className="terms-section">
            <h2>7. Termination</h2>
            <div className="content-block">
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              
              <p>
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <div className="termination-notice">
                <h4>Upon Termination:</h4>
                <ul>
                  <li>Your right to use the Service will immediately cease</li>
                  <li>All provisions of the Terms which by their nature should survive termination shall survive termination</li>
                  <li>We may retain your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section id="disclaimer" className="terms-section">
            <div className="section-header">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Disclaimer illustration" 
                className="section-image"
              />
              <div>
                <h2>8. Disclaimer of Warranties</h2>
                <p className="section-intro">
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
                </p>
              </div>
            </div>
            
            <div className="content-block">
              <p>
                Our company and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including without limitation the warranties of merchantability, fitness for a particular purpose, and non-infringement. Neither our company nor its suppliers and licensors, makes any warranty that the Service will be error free or that access thereto will be continuous or uninterrupted.
              </p>
              
              <div className="warning-box">
                <h4>Important Disclaimer</h4>
                <p>
                  You understand that you download from, or otherwise obtain content or services through, our Service at your own discretion and risk. We do not guarantee the accuracy, completeness, or usefulness of any information on the Service.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law Section */}
          <section id="governing-law" className="terms-section">
            <h2>9. Governing Law & Dispute Resolution</h2>
            <div className="content-block">
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
              
              <h3>9.1 Dispute Resolution</h3>
              <p>
                Any dispute arising from or relating to these Terms or your use of the Service shall be resolved through binding arbitration, rather than in court, except that you may assert claims in small claims court if your claims qualify.
              </p>
              
              <h3>9.2 Class Action Waiver</h3>
              <p>
                You agree that any arbitration or proceeding shall be limited to the dispute between us and you individually. You agree that you may not bring a claim as a plaintiff or a class member in a class, consolidated, or representative action.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="terms-section">
            <h2>10. Contact Information</h2>
            <div className="content-block contact-info">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h4>Email</h4>
                  <p>legal@ourcompany.com</p>
                </div>
                
                <div className="contact-item">
                  <h4>Mail</h4>
                  <p>
                    Our Company Legal Department<br />
                    123 Business Street<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
                
                <div className="contact-item">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="final-acceptance">
                <p>
                  By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
                <div className="acceptance-action">
                  <button className="primary-button" onClick={() => alert('Thank you for accepting our Terms & Conditions!')}>
                    I Accept the Terms & Conditions
                  </button>
                  <button className="secondary-button" onClick={() => window.print()}>
                    Print This Page
                  </button>
                </div>
              </div>
            </div>
          </section>

          <footer className="terms-footer">
            <p>© 2023 Our Company. All rights reserved.</p>
            <p>These terms may be updated periodically. Please check back for the latest version.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Terms;