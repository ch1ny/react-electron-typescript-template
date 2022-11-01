import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.querySelector('div#root') as HTMLDivElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
