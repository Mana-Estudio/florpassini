import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { migrateHashUrl } from './lib/router';
import './index.css';

migrateHashUrl();

createRoot(document.getElementById('root')!).render(<App />);
