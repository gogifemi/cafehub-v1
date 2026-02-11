import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initI18n } from './i18n';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Initialize i18n before rendering the app so that the default Turkish
// experience is applied immediately.
initI18n().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
});
