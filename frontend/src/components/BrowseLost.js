import React, { useState, useEffect } from 'react';

function BrowseLost() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await fetch('/api/lost-items');
      const data = await response.json();
      setLostItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lost items:', error);
      setLoading(false);
    }
  };

  const findMatches = async (itemId) => {
    setLoadingMatches(true);
    setSelectedItem(itemId);
    
    try {
      const response = await fetch(`/api/match/lost/${itemId}`);
      const data = await response.json();
      setMatches(data);
      setLoadingMatches(false);
    } catch (error) {
      console.error('Error finding matches:', error);
      setLoadingMatches(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Browse Lost Items</h1>
        <div className="loading">Loading lost items...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Browse Lost Items</h1>
      
      {lostItems.length === 0 ? (
        <div className="no-items">
          No lost items reported yet. Be the first to report a lost item!
        </div>
      ) : (
        <div className="items-grid">
          {lostItems.map((item) => (
            <div key={item.id} className="item-card">
              <span className="item-category">{item.category}</span>
              <h3 className="item-title">{item.itemName}</h3>
              <p className="item-description">{item.description}</p>
              
              <div className="item-details">
                <div className="item-detail">
                  <strong>Location:</strong>
                  <span>{item.location}</span>
                </div>
                {item.color && (
                  <div className="item-detail">
                    <strong>Color:</strong>
                    <span>{item.color}</span>
                  </div>
                )}
                {item.date && (
                  <div className="item-detail">
                    <strong>Date Lost:</strong>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="item-detail">
                  <strong>Contact:</strong>
                  <span>{item.contactName}</span>
                </div>
                <div className="item-detail">
                  <strong>Email:</strong>
                  <span>{item.contactEmail}</span>
                </div>
                {item.contactPhone && (
                  <div className="item-detail">
                    <strong>Phone:</strong>
                    <span>{item.contactPhone}</span>
                  </div>
                )}
              </div>
              
              <button 
                className="btn btn-match"
                onClick={() => findMatches(item.id)}
              >
                🤖 Find AI Matches
              </button>
              
              {selectedItem === item.id && (
                <div className="matches-container">
                  <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                    Potential Matches
                  </h4>
                  
                  {loadingMatches ? (
                    <p>Finding matches...</p>
                  ) : matches.length === 0 ? (
                    <p style={{ color: '#666' }}>
                      No matching found items yet. Check back later!
                    </p>
                  ) : (
                    matches.map((match, index) => (
                      <div 
                        key={index}
                        style={{
                          padding: '1rem',
                          background: '#f9f9f9',
                          borderRadius: '5px',
                          marginBottom: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>{match.item.itemName}</strong>
                          <span className="match-score">{match.score}% Match</span>
                        </div>
                        <p style={{ margin: '0.5rem 0', color: '#666' }}>
                          {match.item.description}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#888' }}>
                          Found at: {match.item.location}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#888' }}>
                          Contact: {match.item.contactEmail}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseLost;
