import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApplicationProvider } from './context/ApplicationContext';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApplicationProvider>
			<App />
		</ApplicationProvider>
	</React.StrictMode>
);
