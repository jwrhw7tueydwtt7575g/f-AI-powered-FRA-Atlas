import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MyApplications from './pages/MyApplications';
import SubmitApplication from './pages/SubmitApplication';
import InteractiveMap from './pages/InteractiveMap';
import AIAnalytics from './pages/AIAnalytics';
import Communities from './pages/Communities';
import GovSchemes from './pages/GovSchemes';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/submit-application" element={<SubmitApplication />} />
            <Route path="/interactive-map" element={<InteractiveMap />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/gov-schemes" element={<GovSchemes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
