// src/pages/IniciarSesion.jsx

import { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useApp } from '../contexts/AppContext';

export default function IniciarSesion() {
  const [form, setForm] = useState({ username: '', clave1: '' });
  const [msg, setMsg] = useState('\u00A0');
  const { login } = useApp();

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.clave1) {
      setMsg('Error: Ambos campos son requeridos.');
      return;
    }
    try {
      await login(form.username, form.clave1);
      setMsg('¡Inicio de sesión exitoso! Redirigiendo...');
      window.location.href = '/catalogo';
    } catch (err) {
      setMsg('Error: Usuario o contraseña incorrectos.');
    }
  };

  return (
    <main className="form-container">
      <div className="card" style={{maxWidth:450, width:'100%'}}>
        <h2>Inicia sesión con tu cuenta</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <Input id="username" name="username" type="text" placeholder="Ingresa tu nombre de usuario" value={form.username} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="clave1">Contraseña</label>
            <Input id="clave1" name="clave1" type="password" placeholder="Ingresa tu contraseña" value={form.clave1} onChange={onChange} required />
          </div>
          <Button type="submit" className="button" style={{width:'100%'}}>Iniciar sesión</Button>
          <p className="secondary-text" id="errores" style={{textAlign:'center', marginTop: 15}}>{msg}</p>
        </form>
        <p className="secondary-text" style={{textAlign:'center', marginTop: 15}}>
          ¿No tienes una cuenta? <a href="/crear-cuenta">Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
}