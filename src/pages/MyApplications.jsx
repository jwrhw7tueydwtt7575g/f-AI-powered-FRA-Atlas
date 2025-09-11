import React from 'react';
import './MyApplications.css';
import { useApplications } from '../context/ApplicationContext';

export default function MyApplications() {
  // ✅ Hooks must be inside a component function
  const { applications } = useApplications();

  // ✅ Safely handle undefined or empty
  const submittedApps = (applications || []).filter(app => app.status === 'Submitted');

  return (
    <div className="my-applications-page">
      <h1>My Applications</h1>

      {/* Summary cards */}
      <div className="applications-cards">
        <div className="applications-card">
          Submitted <span>{submittedApps.length}</span>
        </div>
        <div className="applications-card">
          Under Review <span>0</span>
        </div>
        <div className="applications-card">
          Approved <span>0</span>
        </div>
        <div className="applications-card">
          Rejected <span>0</span>
        </div>
      </div>

      {/* Search + filter + new app */}
      <div className="applications-actions">
        <input
          type="text"
          placeholder="Search by application ID, name, or village..."
        />
        <select>
          <option>All Status</option>
        </select>
        <button className="new-app-btn">+ New Application</button>
      </div>

      {/* Applications list */}
      <div className="applications-list">
        {submittedApps.length > 0 ? (
          submittedApps.map(app => (
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
              <div className="application-status submitted">Submitted</div>
              <button className="view-details-btn">View Details</button>
            </div>
          ))
        ) : (
          <p>No submitted applications yet.</p>
        )}
      </div>
    </div>
  );
}
