# Kind Find 🔍

A web application to help people find their lost items using AI-based intelligent matching.

## Overview

Kind Find is a lost and found platform that connects people who have lost items with those who have found them. Our AI-powered matching system analyzes multiple factors including category, location, color, and description to suggest potential matches with confidence scores.

## Features

- 📢 **Report Lost Items**: List items you've lost with detailed descriptions
- 🎯 **Report Found Items**: Help others by listing items you've found
- 🤖 **AI-Based Matching**: Intelligent algorithm that matches lost and found items
- 📊 **Match Scoring**: Get confidence scores for potential matches
- 🌐 **Browse Listings**: View all lost and found items
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, React Router
- **Styling**: Custom CSS with gradient design
- **AI Matching**: Custom algorithm analyzing multiple attributes

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/AhmadHassan-DS/kind-find.git
cd kind-find
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create environment file:
```bash
cp .env.example .env
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
npm start
```
The backend will run on http://localhost:5000

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Start the backend server:
```bash
npm start
```

The application will be available at http://localhost:5000

## How It Works

### AI Matching Algorithm

The intelligent matching system evaluates the following factors:

1. **Category Match (40% weight)**: Exact category matching between lost and found items
2. **Location Proximity (30% weight)**: Matches items found in similar locations
3. **Color Match (15% weight)**: Compares color descriptions
4. **Description Similarity (15% weight)**: Analyzes keywords in item descriptions

Items with a match score above 30% are considered potential matches and displayed to users.

## API Endpoints

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `POST /api/lost-items` - Create a new lost item listing

### Found Items
- `GET /api/found-items` - Get all found items
- `POST /api/found-items` - Create a new found item listing

### Matching
- `GET /api/match/:itemType/:itemId` - Get AI matches for a specific item
- `POST /api/match` - Find matches with custom parameters

## Project Structure

```
kind-find/
├── backend/
│   └── server.js           # Express server and API routes
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Home.js
│   │   │   ├── ReportLost.js
│   │   │   ├── ReportFound.js
│   │   │   ├── BrowseLost.js
│   │   │   └── BrowseFound.js
│   │   ├── App.js          # Main App component
│   │   ├── App.css         # Styling
│   │   └── index.js        # Entry point
│   └── package.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ to help reunite people with their lost belongings