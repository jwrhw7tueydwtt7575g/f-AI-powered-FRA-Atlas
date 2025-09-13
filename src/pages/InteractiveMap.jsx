
import React, { useState } from 'react';
import './InteractiveMap.css';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useApplications } from '../context/ApplicationContext';

const states = ['All States', 'Maharashtra', 'Madhya Pradesh', 'Chhattisgarh', 'Odisha'];
const statuses = ['All Statuses', 'Active', 'Granted', 'Pending'];

export default function InteractiveMap() {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [layers, setLayers] = useState({
    applications: true,
    communities: false,
    boundaries: false,
  });
  const { applications } = useApplications();

  const handleLayerToggle = (layer) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Filter applications by state and status
  const filteredApps = applications.filter(app => {
    const stateMatch = selectedState === 'All States' || app.state === selectedState;
    const statusMatch = selectedStatus === 'All Statuses' || app.status === selectedStatus;
    return stateMatch && statusMatch;
  });

  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div className="interactive-map-page" style={{ display: 'flex', padding: '2rem' }}>
      <div style={{ minWidth: 340, marginRight: 32 }}>
        <h1 style={{ fontWeight: 700, marginBottom: 24 }}>Interactive Map</h1>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Filter by State</div>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 16 }}>
            {states.map(s => <option key={s}>{s}</option>)}
          </select>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Filter by Status</div>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ width: '100%', padding: 8 }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ background: '#f5faff', border: '1px solid #b6e0fe', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Map Layers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label><input type="checkbox" checked={layers.applications} onChange={() => handleLayerToggle('applications')} /> FRA Applications</label>
            <label><input type="checkbox" checked={layers.communities} onChange={() => handleLayerToggle('communities')} /> Communities</label>
            <label><input type="checkbox" checked={layers.boundaries} onChange={() => handleLayerToggle('boundaries')} /> Forest Boundaries</label>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Map Statistics</div>
          <div>Applications Shown: <b>{filteredApps.length}</b></div>
          <div>Communities Shown: <b>0</b></div>
        </div>
        <button className="export-map-btn" style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: 6, fontWeight: 600, width: '100%' }}>Export Map Data</button>
      </div>
      <div style={{ flex: 1, minHeight: 600, background: '#e3eafc', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
        <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: '100%', minHeight: 600, width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {layers.applications && filteredApps.map(app => (
            <React.Fragment key={app.id}>
              {app.boundary && (
                <Polygon
                  key={app.id + '-boundary'}
                  positions={app.boundary}
                  pathOptions={{
                    color:
                      app.status === 'Pending' ? 'yellow'
                      : app.status === 'Rejected' ? 'red'
                      : '#1976d2',
                    fillOpacity: 0.2,
                  }}
                />
              )}
              {app.latitude && app.longitude && (
                <Marker
                  key={app.id + '-marker'}
                  position={[app.latitude, app.longitude]}
                  icon={markerIcon}
                >
                  <Popup>
                    <b>{app.name}</b><br />
                    <b>Application ID:</b> {app.id}<br />
                    <b>State:</b> {app.state}<br />
                    <b>District:</b> {app.district}<br />
                    <b>Village:</b> {app.village}<br />
                    <b>Rights Type:</b> {app.rightsType}<br />
                    <b>Area Claimed:</b> {app.area} ha<br />
                    <span
                      style={{
                        color: '#fff',
                        background:
                          app.status === 'Pending' ? 'yellow'
                          : app.status === 'Rejected' ? 'red'
                          : '#fbc02d',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {app.status}
                    </span>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
