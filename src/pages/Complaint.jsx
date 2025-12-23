import React, { useState } from 'react';

const ComplaintForm = () => {
  // State management
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'Low'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock "Save" functionality
  const handleSave = () => {
    localStorage.setItem('draft_complaint', JSON.stringify(formData));
    alert('Progress saved to local storage!');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setSubmitted(true);
  };

  // Success View
  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ color: '#2ecc71' }}>✔ Report submitted successfully</h2>
          <p>Thank you for your feedback. We will review your case shortly.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={styles.homeBtn}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Submit a Complaint</h2>
        
        <label style={styles.label}>Category</label>
        <select 
          name="category" 
          required 
          value={formData.category} 
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select a category...</option>
          <option value="technical">Technical Issue</option>
          <option value="billing">Billing/Payments</option>
          <option value="service">Customer Service</option>
          <option value="other">Other</option>
        </select>

        <label style={styles.label}>Subject</label>
        <input 
          type="text" 
          name="subject" 
          required 
          value={formData.subject} 
          onChange={handleChange} 
          placeholder="Brief summary"
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea 
          name="description" 
          required 
          rows="5" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Tell us what happened..."
          style={styles.input}
        />

        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleSave} style={styles.saveBtn}>
            Save Draft
          </button>
          <button type="submit" style={styles.submitBtn}>
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

// Simple inline styles for demonstration
const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '40px', fontFamily: 'sans-serif' },
  card: { width: '100%', maxWidth: '500px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  buttonGroup: { display: 'flex', gap: '10px' },
  submitBtn: { flex: 2, padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  saveBtn: { flex: 1, padding: '12px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  homeBtn: { padding: '10px 20px', marginTop: '20px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ComplaintForm;