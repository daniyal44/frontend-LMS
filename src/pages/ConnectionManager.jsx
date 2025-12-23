import { useState } from 'react';

const ConnectionManager = () => {
  const [activeConnection, setActiveConnection] = useState(null);
  const [connections, setConnections] = useState({
    google: { connected: false },
    facebook: { connected: false },
    twitter: { connected: false },
    linkedin: { connected: false },
    github: { connected: false },
    stripe: { connected: true },
    mailchimp: { connected: false },
    slack: { connected: false },
    zapier: { connected: true },
  });

  const socialMediaAccounts = [
    { id: 'google', name: 'Google', description: 'Sign in with Google' },
    { id: 'facebook', name: 'Facebook', description: 'Connect your Facebook account' },
    { id: 'twitter', name: 'Twitter', description: 'Connect your Twitter account' },
    { id: 'linkedin', name: 'LinkedIn', description: 'Connect your LinkedIn account' },
    { id: 'github', name: 'GitHub', description: 'Connect your GitHub account' },
  ];

  const thirdPartyServices = [
    { id: 'stripe', name: 'Stripe', description: 'Payment processing service' },
    { id: 'mailchimp', name: 'Mailchimp', description: 'Email marketing platform' },
    { id: 'slack', name: 'Slack', description: 'Team communication tool' },
    { id: 'zapier', name: 'Zapier', description: 'Automation platform' },
  ];

  const handleConnectClick = (serviceId) => {
    setActiveConnection(serviceId);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const apiKey = formData.get('apiKey');
    const accountName = formData.get('accountName');
    
    // In a real app, you would send this to your backend
    console.log(`Connecting ${activeConnection} with:`, { apiKey, accountName });
    
    // Update connection status
    setConnections(prev => ({
      ...prev,
      [activeConnection]: { connected: true }
    }));
    
    setActiveConnection(null);
  };

  const handleDisconnect = (serviceId) => {
    setConnections(prev => ({
      ...prev,
      [serviceId]: { connected: false }
    }));
  };

  const handleCancel = () => {
    setActiveConnection(null);
  };

  return (
    <div className="connection-manager">
      <div className="connection-sections">
        {/* Social Media Accounts Section */}
        <section className="connection-section">
          <h2>Social Media Accounts</h2>
          <p className="section-subtitle">Connect your social media accounts for easy sign-in</p>
          
          <div className="service-list">
            {socialMediaAccounts.map(account => (
              <div key={account.id} className="service-item">
                <div className="service-info">
                  <h3>{account.name}</h3>
                  <p>{account.description}</p>
                </div>
                <div className="service-actions">
                  {connections[account.id].connected ? (
                    <>
                      <button
                        className="status-badge connected"
                        onClick={() => handleConnectClick(account.id)}
                        aria-label={`Manage ${account.name}`}
                        title={`Manage ${account.name}`}
                      >
                        Connected
                      </button>
                      <button 
                        className="btn manage-btn"
                        onClick={() => handleConnectClick(account.id)}
                      >
                        Manage
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn connect-btn"
                      onClick={() => handleConnectClick(account.id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Third-Party Services Section */}
        <section className="connection-section">
          <h2>Third-Party Services</h2>
          <p className="section-subtitle">Manage integrations with external services</p>
          
          <div className="service-list">
            {thirdPartyServices.map(service => (
              <div key={service.id} className="service-item">
                <div className="service-info">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-actions">
                  {connections[service.id].connected ? (
                    <>
                      <button
                        className="status-badge connected"
                        onClick={() => handleConnectClick(service.id)}
                        aria-label={`Manage ${service.name}`}
                        title={`Manage ${service.name}`}
                      >
                        Connected
                      </button>
                      <button 
                        className="btn manage-btn"
                        onClick={() => handleConnectClick(service.id)}
                      >
                        Manage
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn connect-btn"
                      onClick={() => handleConnectClick(service.id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Connection Form Modal */}
      {activeConnection && (
        <div className="connection-modal-overlay">
          <div className="connection-modal">
            <div className="modal-header">
              <h3>
                Connect {socialMediaAccounts.concat(thirdPartyServices)
                  .find(s => s.id === activeConnection)?.name || activeConnection}
              </h3>
              <button className="close-btn" onClick={handleCancel}>×</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="connection-form">
              <div className="form-group">
                <label htmlFor="accountName">Account Name</label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  placeholder="Enter your account name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="apiKey">API Key / Access Token</label>
                <input
                  type="password"
                  id="apiKey"
                  name="apiKey"
                  placeholder="Enter your API key or access token"
                  required
                />
                <small className="help-text">
                  You can find this in your {socialMediaAccounts.concat(thirdPartyServices)
                    .find(s => s.id === activeConnection)?.name} developer settings
                </small>
              </div>
              
              {connections[activeConnection].connected && (
                <div className="warning-box">
                  <strong>Warning:</strong> Reconnecting will override your existing connection.
                </div>
              )}
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                {connections[activeConnection].connected && (
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => handleDisconnect(activeConnection)}
                  >
                    Disconnect
                  </button>
                )}
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {connections[activeConnection].connected ? 'Update Connection' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .connection-manager {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .connection-section {
          margin-bottom: 40px;
        }
        
        .section-subtitle {
          color: #666;
          margin-bottom: 20px;
        }
        
        .service-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .service-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        
        .service-info h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
        }
        
        .service-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        
        .service-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .connect-btn {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        
        .connect-btn:hover {
          background: #0056b3;
          border-color: #0056b3;
        }
        
        .manage-btn {
          color: #666;
        }
        
        .manage-btn:hover {
          background: #f8f9fa;
        }
        
        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }
        
        .status-badge.connected {
          background: #d4edda;
          color: #155724;
          box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset;
        }

        .status-badge.connected:hover,
        .status-badge.connected:focus {
          transform: translateY(-1px);
          outline: none;
          box-shadow: 0 4px 12px rgba(21,87,36,0.06);
        }
        
        /* Modal Styles */
        .connection-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .connection-modal {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .modal-header h3 {
          margin: 0;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        
        .close-btn:hover {
          background: #f8f9fa;
        }
        
        .connection-form {
          padding: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        
        .help-text {
          display: block;
          margin-top: 4px;
          color: #666;
          font-size: 12px;
        }
        
        .warning-box {
          padding: 12px;
          background: #fff3cd;
          border: 1px solid #ffecb5;
          border-radius: 6px;
          color: #856404;
          margin-bottom: 20px;
          font-size: 14px;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }
        
        .btn-primary {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        
        .btn-primary:hover {
          background: #0056b3;
          border-color: #0056b3;
        }
        
        .btn-secondary {
          color: #666;
          background: white;
        }
        
        .btn-secondary:hover {
          background: #f8f9fa;
        }
        
        .btn-danger {
          background: #dc3545;
          color: white;
          border-color: #dc3545;
        }
        
        .btn-danger:hover {
          background: #c82333;
          border-color: #bd2130;
        }
      `}</style>
    </div>
  );
};

export default ConnectionManager;