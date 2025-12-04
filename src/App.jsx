// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import ProtectedRoute from './components/utils/ProtectedRoute';

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
// Nos aseguramos de importar TODOS los componentes de página que usamos en las rutas.
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import CrearCuenta from './pages/CrearCuenta';
import IniciarSesion from './pages/IniciarSesion';
import Cambios from './pages/Cambios';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Perfil from './pages/Perfil';
import AdminPanel from './pages/AdminPanel';
import EmployeePanel from './pages/EmployeePanel';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/cambios" element={<Cambios />} />

          {/* Rutas Protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}>
                <EmployeePanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CLIENT']}>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}