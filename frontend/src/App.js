import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ReportLost from './components/ReportLost';
import ReportFound from './components/ReportFound';
import BrowseLost from './components/BrowseLost';
import BrowseFound from './components/BrowseFound';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🔍 Kind Find
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/report-lost" className="nav-link">Report Lost</Link>
              </li>
              <li className="nav-item">
                <Link to="/report-found" className="nav-link">Report Found</Link>
              </li>
              <li className="nav-item">
                <Link to="/browse-lost" className="nav-link">Browse Lost</Link>
              </li>
              <li className="nav-item">
                <Link to="/browse-found" className="nav-link">Browse Found</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/browse-lost" element={<BrowseLost />} />
          <Route path="/browse-found" element={<BrowseFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
