import React, { useState } from 'react';

function ReportFound() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    location: '',
    color: '',
    date: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/found-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          itemName: '',
          category: '',
          description: '',
          location: '',
          color: '',
          date: '',
          contactName: '',
          contactEmail: '',
          contactPhone: ''
        });
        
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Report a Found Item</h1>
      
      <div className="form-container">
        {submitted && (
          <div className="success-message">
            ✓ Thank you for reporting this found item! You're helping someone find what they lost.
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              placeholder="e.g., Black Wallet, iPhone 13"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Wallet">Wallet</option>
              <option value="Keys">Keys</option>
              <option value="Bag">Bag</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Clothing">Clothing</option>
              <option value="Documents">Documents</option>
              <option value="Pet">Pet</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide detailed description of the item..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location Found *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Central Park, Coffee Shop on Main St"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Black, Silver, Blue"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date Found</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <h3 style={{ color: '#667eea', marginTop: '2rem', marginBottom: '1rem' }}>
            Contact Information
          </h3>
          
          <div className="form-group">
            <label htmlFor="contactName">Your Name *</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactEmail">Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactPhone">Phone Number</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit Found Item Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportFound;
