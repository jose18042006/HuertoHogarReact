// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AppProvider } from './contexts/AppContext';

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
// Restauramos todas las importaciones de CSS que se habían perdido.
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/estilos.css';
import './styles/home.css';
import './styles/nosotros.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);