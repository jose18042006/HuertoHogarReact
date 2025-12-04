// src/components/organisms/Header.jsx

import { NavLink, Link } from 'react-router-dom';
import React from 'react';
import { useApp } from '../../contexts/AppContext';

export default function Header() {
  const { user, loading, logout, cartItems } = useApp();
  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <nav className="nav main-nav" aria-label="Principal">
        <ul className="menu left" role="list">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/catalogo">Productos</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
        </ul>
        <div className="logo">
          <Link to="/"><img src="/Huerto Hogar 1.png" alt="Huerto Hogar" /></Link>
        </div>
        <div className="right-section">
          <NavLink to="/carrito" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
            🛒 Carrito <span className="badge777">({count})</span>
          </NavLink>

          {/* Mientras se verifica el estado de autenticación */}
          {loading ? (
            <span className="nav-button">Cargando...</span>
          ) : user ? (
            // --- SI HAY UN USUARIO LOGUEADO ---
            <>
              {/* 1. Enlace al Panel de Admin (solo para ADMIN) */}
              {user.role === 'ROLE_ADMIN' && (
                <NavLink to="/admin" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                  Panel Admin
                </NavLink>
              )}

              {/* 2. Enlace al Panel de Empleado (para ADMIN y EMPLOYEE) */}
              {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_EMPLOYEE') && (
                <NavLink to="/employee" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                  Gestión Productos
                </NavLink>
              )}

              {/* Enlace al perfil (para todos los usuarios logueados) */}
              <NavLink to="/perfil" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                👤 {user.username}
              </NavLink>

              {/* Botón para cerrar sesión */}
              <button onClick={logout} className="nav-button logout-button">Cerrar Sesión</button>
            </>
          ) : (
            // --- SI NO HAY UN USUARIO LOGUEADO ---
            <>
              <NavLink to="/iniciar-sesion" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                Iniciar Sesión
              </NavLink>
              <NavLink to="/crear-cuenta" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                Crear Cuenta
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}