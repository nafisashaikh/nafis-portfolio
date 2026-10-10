import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// After a redeploy, a browser holding a stale index.html can request old
// hashed chunks that no longer exist (404). Vite fires `vite:preloadError`
// when a dynamic import fails — reload once to pull the fresh assets.
window.addEventListener('vite:preloadError', () => {
  const key = 'chunk-reload-ts';
  const last = Number(sessionStorage.getItem(key) || '0');
  if (Date.now() - last > 10000) {
    sessionStorage.setItem(key, String(Date.now()));
    window.location.reload();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

