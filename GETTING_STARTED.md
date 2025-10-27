# Getting Started with Kind Find

This guide will help you get the Kind Find application up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

You can verify your installation by running:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/AhmadHassan-DS/kind-find.git
cd kind-find
```

### 2. Install Backend Dependencies

```bash
npm install
```

This will install all the required packages for the backend server including Express.js, CORS, and other dependencies.

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

This will install React and all required frontend dependencies.

## Running the Application

### Development Mode (Recommended for Testing)

You'll need two terminal windows for this:

#### Terminal 1: Start the Backend Server

```bash
npm start
```

The backend server will start on http://localhost:5000

You should see the message:
```
Kind Find server running on port 5000
```

#### Terminal 2: Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will start on http://localhost:3000 and should automatically open in your browser.

### Production Mode

First, build the frontend:

```bash
cd frontend
npm run build
cd ..
```

Then start the backend server:

```bash
npm start
```

The entire application will be available at http://localhost:5000

## Using the Application

### For People Who Lost Items:

1. Click on **"Report Lost"** in the navigation menu
2. Fill out the form with details about your lost item:
   - Item name
   - Category (Electronics, Wallet, Keys, etc.)
   - Detailed description
   - Location where you lost it
   - Color
   - Date lost (optional)
   - Your contact information
3. Submit the form
4. Go to **"Browse Lost"** to see your listing
5. Click **"🤖 Find AI Matches"** to see potential matches from found items

### For People Who Found Items:

1. Click on **"Report Found"** in the navigation menu
2. Fill out the form with details about the found item
3. Submit the form
4. Go to **"Browse Found"** to see your listing
5. Click **"🤖 Find AI Matches"** to see potential matches from lost items

### AI Matching

The intelligent matching system analyzes:
- **Category** (40% weight): Exact category matching
- **Location** (30% weight): Location proximity
- **Color** (15% weight): Color matching
- **Description** (15% weight): Keyword analysis

Items with a match score above 30% are displayed as potential matches.

## API Endpoints

If you want to integrate with the backend API:

- `GET /api/lost-items` - Get all lost items
- `POST /api/lost-items` - Create a lost item
- `GET /api/found-items` - Get all found items
- `POST /api/found-items` - Create a found item
- `GET /api/match/:itemType/:itemId` - Get AI matches for an item

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use, you can change them:

For backend, create a `.env` file:
```
PORT=5001
```

For frontend, the dev server will automatically try the next available port.

### Installation Issues

If you encounter installation issues:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

If the frontend build fails, ensure you have enough memory and try:
```bash
cd frontend
npm run build -- --max_old_space_size=4096
```

## Features

✅ Report lost items with detailed information
✅ Report found items to help others
✅ AI-powered matching system
✅ Browse all lost and found items
✅ Match score with confidence levels
✅ Contact information for communication
✅ Responsive design for mobile and desktop
✅ Clean and intuitive user interface

## Technology Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS
- **AI Matching**: Custom algorithm with weighted scoring

## Support

For issues or questions, please open an issue on the GitHub repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
