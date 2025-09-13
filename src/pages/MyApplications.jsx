import React, { useState } from 'react';
import './MyApplications.css';
import { useApplications } from '../context/ApplicationContext';

export default function MyApplications() {
  // ✅ Hooks must be inside a component function
  const { applications } = useApplications();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');

  // Status options
  const statusOptions = ['All Status', 'Submitted', 'Approved', 'Pending', 'Rejected'];

  // Filter applications by search and status
  const filteredApps = (applications || []).filter(app => {
    const matchesSearch =
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.village.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'All Status' || app.status === status;
    return matchesSearch && matchesStatus;
  });

  // Count by status for summary cards
  const statusCounts = {
    Submitted: (applications || []).filter(app => app.status === 'Submitted').length,
    Approved: (applications || []).filter(app => app.status === 'Approved').length,
    Pending: (applications || []).filter(app => app.status === 'Pending').length,
    Rejected: (applications || []).filter(app => app.status === 'Rejected').length,
  };

  return (
    <div className="my-applications-page">
      <h1>My Applications</h1>

      {/* Summary cards */}
      <div className="applications-cards">
        <div className="applications-card">
          Submitted <span>{statusCounts.Submitted}</span>
        </div>
        <div className="applications-card">
          Approved <span>{statusCounts.Approved}</span>
        </div>
        <div className="applications-card">
          Pending <span>{statusCounts.Pending}</span>
        </div>
        <div className="applications-card">
          Rejected <span>{statusCounts.Rejected}</span>
        </div>
      </div>

      {/* Search + filter + new app */}
      <div className="applications-actions">
        <input
          type="text"
          placeholder="Search by application ID, name, or village..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button className="new-app-btn">+ New Application</button>
      </div>

      {/* Applications list */}
      <div className="applications-list">
        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <div className="application-item" key={app.id}>
              <div className="application-id">{app.id}</div>
              <div className="application-name">{app.name}</div>
              <div className="application-location">
                {app.village}, {app.district}
              </div>
              <div className="application-date">Applied: --/--/----</div>
              <div className="application-area">
                Area Claimed: <b>{app.area} hectares</b>
              </div>
              <div className="application-level">
                Committee Level: Village Level
              </div>
              <div className={`application-status ${app.status.toLowerCase()}`}>{app.status}</div>
              <button className="view-details-btn">View Details</button>
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
}
