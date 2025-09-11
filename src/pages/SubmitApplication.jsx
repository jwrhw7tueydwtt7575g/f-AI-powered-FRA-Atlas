
import React, { useState } from 'react';
import './Dashboard.css';
import { useApplications } from '../context/ApplicationContext';

export default function SubmitApplication() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    applicantName: '',
    communityType: '',
    rightsType: '',
    state: '',
    district: '',
    block: '',
    village: '',
    area: '',
    latitude: '',
    longitude: '',
    aadhaar: null,
    landDocs: null,
  });
  const { addApplication } = useApplications();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a fake boundary around the submitted lat/lng
    let boundary = null;
    if (form.latitude && form.longitude) {
      const lat = parseFloat(form.latitude);
      const lng = parseFloat(form.longitude);
      boundary = [
        [lat + 0.001, lng - 0.001],
        [lat + 0.001, lng + 0.001],
        [lat - 0.001, lng + 0.001],
        [lat - 0.001, lng - 0.001],
        [lat + 0.001, lng - 0.001],
      ];
    }
    addApplication({
      id: 'FRA-' + Math.floor(Math.random() * 1000000),
      name: form.applicantName,
      state: form.state,
      district: form.district,
      village: form.village,
      area: parseFloat(form.area),
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
      status: 'Submitted',
      rightsType: form.rightsType,
      boundary,
    });
    setStep(3);
  };

  return (
    <div className="submit-application-page" style={{ padding: '2rem' }}>
      <h1 style={{ fontWeight: 700 }}>Submit FRA Application</h1>
      <div style={{ color: '#555', marginBottom: 24 }}>Apply for Forest Rights Act recognition and protection</div>
      <div className="stepper" style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        <div className={`step ${step === 1 ? 'active' : ''}`}>1 Guidelines</div>
        <div style={{ flex: 1, height: 2, background: '#eee', margin: '0 8px' }} />
        <div className={`step ${step === 2 ? 'active' : ''}`}>2 Application Form</div>
        <div style={{ flex: 1, height: 2, background: '#eee', margin: '0 8px' }} />
        <div className={`step ${step === 3 ? 'active' : ''}`}>Submitted</div>
      </div>
      {step === 1 && (
        <div>
          <div style={{ background: '#f5faff', border: '1px solid #b6e0fe', padding: 16, borderRadius: 8, marginBottom: 24 }}>
            <span style={{ color: '#1976d2' }}>Please read through these guidelines carefully before submitting your Forest Rights Act application.</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#1a7f37', fontWeight: 700, marginBottom: 16 }}>Eligibility Criteria</h2>
            <ul style={{ color: '#222', fontSize: 17, lineHeight: 2 }}>
              <li>You must be a member of Scheduled Tribes or Other Traditional Forest Dwellers</li>
              <li>You must have been residing in the forest area before December 13, 2005</li>
              <li>The land must be primarily used for self-cultivation and livelihood</li>
              <li>Maximum area that can be claimed is 4 hectares per family</li>
            </ul>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#1a237e', fontWeight: 700, marginBottom: 16 }}>Required Documents</h2>
            <div style={{ display: 'flex', gap: 32 }}>
              <div>
                <b>Identity Proof (Choose One):</b>
                <ul>
                  <li>Aadhaar Card (with number masked)</li>
                  <li>Voter ID</li>
                </ul>
              </div>
              <div>
                <b>Land Documents:</b>
                <ul>
                  <li>Land ownership papers</li>
                  <li>Survey settlement records</li>
                  <li>Any land-related papers</li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="btn" style={{ background: '#1976d2', color: '#fff', padding: '10px 28px', border: 'none', borderRadius: 6, fontWeight: 600 }} onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, maxWidth: 700 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Personal Information</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <input name="applicantName" value={form.applicantName} onChange={handleChange} required placeholder="Applicant Name *" style={{ flex: 1, padding: 8 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <select name="communityType" value={form.communityType} onChange={handleChange} required style={{ flex: 1, padding: 8 }}>
              <option value="">Select community type</option>
              <option value="ST">Scheduled Tribe</option>
              <option value="OTFD">Other Traditional Forest Dweller</option>
            </select>
            <select name="rightsType" value={form.rightsType} onChange={handleChange} required style={{ flex: 1, padding: 8 }}>
              <option value="">Select rights type</option>
              <option value="Individual">Individual</option>
              <option value="Community">Community</option>
            </select>
          </div>
          <h2 style={{ fontWeight: 700, margin: '24px 0 16px' }}>Location Details</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <select name="state" value={form.state} onChange={handleChange} required style={{ flex: 1, padding: 8 }}>
              <option value="">Select state *</option>
              <option>Maharashtra</option>
              <option>Madhya Pradesh</option>
              <option>Chhattisgarh</option>
              <option>Odisha</option>
            </select>
            <input name="district" value={form.district} onChange={handleChange} required placeholder="District *" style={{ flex: 1, padding: 8 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <input name="block" value={form.block} onChange={handleChange} required placeholder="Block/Tehsil *" style={{ flex: 1, padding: 8 }} />
            <input name="village" value={form.village} onChange={handleChange} required placeholder="Village *" style={{ flex: 1, padding: 8 }} />
          </div>
          <h2 style={{ fontWeight: 700, margin: '24px 0 16px' }}>Land & Area Details</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <input name="area" value={form.area} onChange={handleChange} required placeholder="Area Claimed (in hectares) *" style={{ flex: 1, padding: 8 }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude (Optional)" style={{ flex: 1, padding: 8 }} />
            <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude (Optional)" style={{ flex: 1, padding: 8 }} />
          </div>
          <h2 style={{ fontWeight: 700, margin: '24px 0 16px' }}>Required Documents Upload</h2>
          <div style={{ marginBottom: 16 }}>
            <label>Aadhaar Card (masked) or Voter ID *</label>
            <input type="file" name="aadhaar" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleChange} style={{ display: 'block', marginTop: 8 }} />
            <small>Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label>Land Papers/Documents *</label>
            <input type="file" name="landDocs" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleChange} style={{ display: 'block', marginTop: 8 }} />
            <small>Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="btn" style={{ background: '#eee', color: '#333', padding: '10px 28px', border: 'none', borderRadius: 6, fontWeight: 600 }} onClick={() => setStep(1)}>
              Back to Guidelines
            </button>
            <button type="submit" className="btn" style={{ background: '#1a7f37', color: '#fff', padding: '10px 28px', border: 'none', borderRadius: 6, fontWeight: 600 }}>
              Submit Application
            </button>
          </div>
        </form>
      )}
      {step === 3 && (
        <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 12, padding: 32, textAlign: 'center', marginTop: 48 }}>
          <h2 style={{ color: '#1a7f37', fontWeight: 700 }}>Application Submitted!</h2>
          <div style={{ color: '#333', marginTop: 16 }}>Thank you for submitting your FRA application. We will review your details and contact you soon.</div>
        </div>
      )}
    </div>
  );
}
