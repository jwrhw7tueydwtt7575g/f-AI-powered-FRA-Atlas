import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-circle">
          <span role="img" aria-label="tree">🌲</span>
        </div>
        <div>
          <h2>FRA Atlas</h2>
          <span className="subtitle">Decision Support System</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/my-applications">My Applications</NavLink>
        <NavLink to="/submit-application">Submit Application</NavLink>
        <NavLink to="/interactive-map">Interactive Map</NavLink>
  <NavLink to="/ai-analytics">AI Analytics</NavLink>
  <NavLink to="/communities">Communities</NavLink>
  <NavLink to="/gov-schemes">Gov Schemes</NavLink>
      </nav>
      <div className="sidebar-stats">
        <div><span>Total States</span><span>4</span></div>
        <div><span>Active Applications</span><span className="active">2,847</span></div>
        <div><span>Rights Granted</span><span className="granted">1,456</span></div>
      </div>
      <footer className="sidebar-footer">
        <div className="footer-title">FRA Monitoring</div>
        <div className="footer-subtitle">Government of India</div>
      </footer>
    </aside>
  );
}
