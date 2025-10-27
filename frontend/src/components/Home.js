import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1 className="page-title">Welcome to Kind Find</h1>
      
      <div className="form-container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
          Lost Something? Found Something?
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          Kind Find is your AI-powered lost and found platform. We help reunite people with their 
          lost belongings using intelligent matching algorithms that connect lost items with found items.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '10px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>📢 Report Lost</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Lost an item? List it here and let our AI help you find it.
            </p>
            <Link to="/report-lost">
              <button className="btn btn-primary">Report Lost Item</button>
            </Link>
          </div>
          
          <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '10px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🎯 Report Found</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Found an item? List it here to help someone find what they lost.
            </p>
            <Link to="/report-found">
              <button className="btn btn-primary">Report Found Item</button>
            </Link>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: '10px' }}>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>🤖 How Our AI Works</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Our intelligent matching system analyzes multiple factors including category, location, 
            color, and description to find potential matches between lost and found items. 
            Get instant match suggestions with confidence scores!
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <Link to="/browse-lost" style={{ flex: 1 }}>
            <button className="btn btn-primary">Browse Lost Items</button>
          </Link>
          <Link to="/browse-found" style={{ flex: 1 }}>
            <button className="btn btn-primary">Browse Found Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
