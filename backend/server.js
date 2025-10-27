const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const MATCH_THRESHOLD = 30; // Minimum match score to be considered a potential match

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (for demo purposes)
let lostItems = [];
let foundItems = [];

// Helper function for AI-based matching
function calculateMatchScore(lostItem, foundItem) {
  let score = 0;
  
  // Category match (highest weight)
  if (lostItem.category && foundItem.category) {
    if (lostItem.category.toLowerCase() === foundItem.category.toLowerCase()) {
      score += 40;
    }
  }
  
  // Location proximity (high weight)
  if (lostItem.location && foundItem.location) {
    const lostLoc = lostItem.location.toLowerCase();
    const foundLoc = foundItem.location.toLowerCase();
    if (lostLoc === foundLoc) {
      score += 30;
    } else if (lostLoc.includes(foundLoc) || foundLoc.includes(lostLoc)) {
      score += 15;
    }
  }
  
  // Color match
  if (lostItem.color && foundItem.color) {
    if (lostItem.color.toLowerCase() === foundItem.color.toLowerCase()) {
      score += 15;
    }
  }
  
  // Description similarity (basic keyword matching)
  if (lostItem.description && foundItem.description) {
    const lostWords = lostItem.description.toLowerCase().split(/\s+/);
    const foundWords = foundItem.description.toLowerCase().split(/\s+/);
    const commonWords = lostWords.filter(word => 
      word.length > 3 && foundWords.includes(word)
    );
    score += Math.min(commonWords.length * 3, 15);
  }
  
  return score;
}

// API Routes

// Get all lost items
app.get('/api/lost-items', (req, res) => {
  res.json(lostItems);
});

// Get all found items
app.get('/api/found-items', (req, res) => {
  res.json(foundItems);
});

// Create a lost item listing
app.post('/api/lost-items', (req, res) => {
  const newItem = {
    id: uuidv4(),
    ...req.body,
    timestamp: new Date().toISOString(),
    type: 'lost'
  };
  lostItems.push(newItem);
  res.status(201).json(newItem);
});

// Create a found item listing
app.post('/api/found-items', (req, res) => {
  const newItem = {
    id: uuidv4(),
    ...req.body,
    timestamp: new Date().toISOString(),
    type: 'found'
  };
  foundItems.push(newItem);
  res.status(201).json(newItem);
});

// AI-based matching endpoint
app.post('/api/match', (req, res) => {
  const { itemId, itemType } = req.body;
  
  let sourceItem;
  let targetItems;
  
  if (itemType === 'lost') {
    sourceItem = lostItems.find(item => item.id === itemId);
    targetItems = foundItems;
  } else {
    sourceItem = foundItems.find(item => item.id === itemId);
    targetItems = lostItems;
  }
  
  if (!sourceItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  // Calculate match scores for all items
  const matches = targetItems.map(targetItem => ({
    item: targetItem,
    score: calculateMatchScore(
      itemType === 'lost' ? sourceItem : targetItem,
      itemType === 'lost' ? targetItem : sourceItem
    )
  }))
  .filter(match => match.score > MATCH_THRESHOLD) // Only return matches above threshold
  .sort((a, b) => b.score - a.score)
  .slice(0, 10); // Top 10 matches
  
  res.json(matches);
});

// Get matches for a specific item
app.get('/api/match/:itemType/:itemId', (req, res) => {
  const { itemId, itemType } = req.params;
  
  let sourceItem;
  let targetItems;
  
  if (itemType === 'lost') {
    sourceItem = lostItems.find(item => item.id === itemId);
    targetItems = foundItems;
  } else {
    sourceItem = foundItems.find(item => item.id === itemId);
    targetItems = lostItems;
  }
  
  if (!sourceItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  // Calculate match scores
  const matches = targetItems.map(targetItem => ({
    item: targetItem,
    score: calculateMatchScore(
      itemType === 'lost' ? sourceItem : targetItem,
      itemType === 'lost' ? targetItem : sourceItem
    )
  }))
  .filter(match => match.score > MATCH_THRESHOLD)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);
  
  res.json(matches);
});

// Serve static files from React app (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Kind Find server running on port ${PORT}`);
});
