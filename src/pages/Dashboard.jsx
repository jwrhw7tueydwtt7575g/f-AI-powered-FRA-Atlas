import React from 'react';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useApplications } from '../context/ApplicationContext';

export default function Dashboard() {
  const { applications } = useApplications();
  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
  // Count applications per state
  const stateCounts = states.map(state => ({
    state,
    count: applications.filter(app => app.state === state).length
  }));

  return (
    <div className="dashboard-page">
      <h1>FRA Implementation Dashboard</h1>
      <p className="dashboard-desc">Comprehensive monitoring of Forest Rights Act implementation across Madhya Pradesh, Tripura, Odisha, and Telangana</p>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div>Total Applications</div>
          <div className="card-value">{applications.length}</div>
          <div className="card-sub">+12% this month</div>
        </div>
        <div className="dashboard-card">
          <div>Approved Rights</div>
          <div className="card-value">0</div>
          <div className="card-sub">0.0% approval rate</div>
        </div>
        <div className="dashboard-card">
          <div>Active Communities</div>
          <div className="card-value">0</div>
          <div className="card-sub">Across 4 states</div>
        </div>
        <div className="dashboard-card">
          <div>Forest Area (Ha)</div>
          <div className="card-value">0.0K</div>
          <div className="card-sub">Rights granted</div>
        </div>
      </div>
      <div className="dashboard-progress">
        <div className="progress-chart">
          <h2>State-wise Progress</h2>
          <div style={{ height: 220, background: '#e6f4ea', borderRadius: 8, padding: 16 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={stateCounts} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="progress-status">
          <h2>Application Status</h2>
          <div className="status-placeholder">[Status]</div>
        </div>
      </div>
    </div>
  );
}
