// src/pages/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/api';
import Button from '../components/atoms/Button'; // Asumo que tienes este átomo

const AdminPanel = () => {
  // Estados para la lista de usuarios y mensajes
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Estados para manejar el formulario de creación/edición
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
    role: 'ROLE_CLIENT' // Rol por defecto al crear
  });

  // Función para obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('No se pudieron cargar los usuarios.');
    }
  };

  // Cargar usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- MANEJADORES DE EVENTOS ---

  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentUser({ id: null, username: '', email: '', password: '', role: 'ROLE_CLIENT' });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  };

  const handleEditClick = (user) => {
    setIsEditing(true);
    setCurrentUser({ ...user, password: '' }); // Limpiamos el password por seguridad
    setShowForm(true);
    setSuccess(null);
    setError(null);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        setSuccess('Usuario eliminado correctamente.');
        fetchUsers(); // Recargamos la lista de usuarios
      } catch (err) {
        setError('Error al eliminar el usuario.');
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isEditing) {
        // Lógica para actualizar
        await updateUser(currentUser.id, currentUser);
        setSuccess('Usuario actualizado correctamente.');
      } else {
        // Lógica para crear
        await createUser(currentUser);
        setSuccess('Usuario creado correctamente.');
      }
      setShowForm(false);
      fetchUsers(); // Recargamos la lista de usuarios
    } catch (err) {
      setError('Error al guardar el usuario. Revisa los datos.');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Administración</h1>
        <Button onClick={handleCreateClick}>Crear Nuevo Usuario</Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* --- FORMULARIO DE CREACIÓN/EDICIÓN --- */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">{isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Nombre de Usuario</label>
                  <input type="text" name="username" value={currentUser.username} onChange={handleFormChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" name="email" value={currentUser.email} onChange={handleFormChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Contraseña {isEditing && '(dejar en blanco para no cambiar)'}</label>
                  <input type="password" name="password" value={currentUser.password} onChange={handleFormChange} className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Rol</label>
                  <select name="role" value={currentUser.role} onChange={handleFormChange} className="form-select" required>
                    <option value="ROLE_CLIENT">Cliente</option>
                    <option value="ROLE_EMPLOYEE">Empleado</option>
                    <option value="ROLE_ADMIN">Administrador</option>
                  </select>
                </div>
              </div>
              <Button type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
              <Button variant="light" onClick={() => setShowForm(false)} className="ms-2">Cancelar</Button>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLA DE USUARIOS --- */}
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => handleEditClick(user)} className="me-2">Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(user.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;