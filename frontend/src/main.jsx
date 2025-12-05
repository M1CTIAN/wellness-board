// frontend/src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // if using tailwind; otherwise create a simple css

createRoot(document.getElementById('root')).render(<App />);
