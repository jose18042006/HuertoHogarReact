// src/components/utils/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

// Este componente recibe los roles permitidos y los hijos que debe renderizar
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useApp();

  // Mientras se verifica si el usuario está logueado, mostramos un mensaje
  if (loading) {
    return <p>Verificando autenticación...</p>;
  }

  // Si no hay usuario, lo redirigimos a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/iniciar-sesion" />;
  }

  // Si la ruta requiere roles y el rol del usuario no está en la lista de permitidos...
  if (roles && !roles.includes(user.role)) {
    // ...lo redirigimos a una página de "Acceso Denegado" o al home.
    // Por ahora, lo mandamos al catálogo.
    return <Navigate to="/catalogo" />;
  }

  // Si todas las verificaciones pasan, mostramos la página solicitada
  return children;
};

export default ProtectedRoute;