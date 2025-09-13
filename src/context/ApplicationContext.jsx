import React, { createContext, useContext, useState } from 'react';

// 1️⃣ Create the context
const ApplicationContext = createContext();

// 2️⃣ Custom hook to consume context
export function useApplications() {
  return useContext(ApplicationContext);
}

// 3️⃣ Provider component
export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([
    {
      id: 'FRA-707142',
      name: 'VIVEK CHAUDHARI',
      state: 'Tripura',
      district: 'West Tripura',
      village: 'Jirania',
      area: 0.14,
      latitude: 23.84,
      longitude: 91.45,
      status: 'Submitted',
      rightsType: 'Individual',
      boundary: [
        [23.841, 91.449],
        [23.842, 91.451],
        [23.843, 91.450],
        [23.842, 91.448],
        [23.841, 91.449],
      ],
    },
    {
      id: 'FRA-707200',
      name: 'RAM SINGH',
      state: 'Madhya Pradesh',
      district: 'Bhopal',
      village: 'Bhopal',
      area: 0.25,
      latitude: 23.2599,
      longitude: 77.4126,
      status: 'Submitted',
      rightsType: 'Individual',
      boundary: [
        [23.259, 77.411],
        [23.260, 77.413],
        [23.261, 77.412],
        [23.260, 77.410],
        [23.259, 77.411],
      ],
    },
  ]);

  // function to add new applications
  const addApplication = (app) => {
    setApplications((prev) => {
      // Check for duplicate area claim (same village, district, area, boundary)
      let duplicateIdx = prev.findIndex(
        a => a.village === app.village && a.district === app.district && a.area === app.area && JSON.stringify(a.boundary) === JSON.stringify(app.boundary)
      );
      if (duplicateIdx !== -1) {
        // Mark both as Pending (conflict)
        const updatedPrev = prev.map((a, idx) =>
          idx === duplicateIdx ? { ...a, status: 'Pending' } : a
        );
        return [...updatedPrev, { ...app, status: 'Pending' }];
      }
      return [...prev, app];
    });
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
}
