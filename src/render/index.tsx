import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

window.React = React;
window.ReactDOM = ReactDOM;

createRoot(document.querySelector('div#root') as HTMLDivElement).render(<App />);
