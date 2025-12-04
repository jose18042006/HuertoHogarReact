// src/pages/Perfil.jsx

import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import { updateMyProfile } from '../services/api';
import Button from '../components/atoms/Button';

const Perfil = () => {
  const { user, loading } = useApp();
  
  // Estado para controlar si estamos en modo edición
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Estados para los mensajes de feedback
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cuando el usuario del contexto cargue, llenamos el formulario
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '' // El password siempre empieza vacío por seguridad
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateMyProfile(formData);
      setSuccess('¡Perfil actualizado con éxito! La página se recargará.');
      // Forzamos una recarga para que el Header y todo se actualice con los nuevos datos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError('Error al actualizar el perfil. Inténtalo de nuevo.');
      console.error(err);
    }
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (!user) {
    return <Navigate to="/iniciar-sesion" />;
  }

  return (
    <div className="container py-5">
      <h1>Mi Perfil</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* --- LÓGICA CONDICIONAL: Mostramos la vista o el formulario --- */}
      {isEditing ? (
        // --- VISTA DE EDICIÓN (FORMULARIO) ---
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Editar Perfil</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre de Usuario</label>
                <input type="text" name="username" value={formData.username} onChange={handleFormChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Nueva Contraseña (dejar en blanco para no cambiar)</label>
                <input type="password" name="password" value={formData.password} onChange={handleFormChange} className="form-control" />
              </div>
              <Button type="submit">Guardar Cambios</Button>
              <Button variant="light" onClick={() => setIsEditing(false)} className="ms-2">Cancelar</Button>
            </form>
          </div>
        </div>
      ) : (
        // --- VISTA DE LECTURA (PERFIL) ---
        <div className="card">
          <div className="card-body">
            <p><strong>Nombre de Usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <Button onClick={() => setIsEditing(true)}>Modificar Perfil</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;