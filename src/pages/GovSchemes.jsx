import React from 'react';

const schemes = [
  {
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Affordable housing scheme for rural and urban poor.',
    link: 'https://pmaymis.gov.in/',
  },
  {
    name: 'Pradhan Mantri Ujjwala Yojana',
    description: 'Free LPG connections to women from BPL households.',
    link: 'https://pmuy.gov.in/',
  },
  {
    name: 'National Social Assistance Programme',
    description: 'Financial assistance to elderly, widows, and disabled persons.',
    link: 'https://nsap.nic.in/',
  },
  {
    name: 'Forest Rights Act (FRA) Benefits',
    description: 'Rights and benefits for Scheduled Tribes and Other Traditional Forest Dwellers.',
    link: 'https://tribal.nic.in/fra.aspx',
  },
  // Add more schemes as needed
];

export default function GovSchemes() {
  return (
    <div className="gov-schemes-page" style={{ padding: '2rem' }}>
      <h1 style={{ fontWeight: 700, marginBottom: 24 }}>Government Schemes</h1>
      <div style={{ color: '#555', marginBottom: 24 }}>Explore government schemes relevant to you and your community.</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {schemes.map((scheme) => (
          <div key={scheme.name} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 320, flex: '1 1 320px' }}>
            <h2 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 12 }}>{scheme.name}</h2>
            <div style={{ color: '#333', marginBottom: 16 }}>{scheme.description}</div>
            <a href={scheme.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1a7f37', fontWeight: 600, textDecoration: 'underline' }}>Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
}
