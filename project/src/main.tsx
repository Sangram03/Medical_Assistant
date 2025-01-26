import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { validateEnv } from './lib/env';
import App from './App';
import './index.css';

// Validate environment variables before rendering
validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);