import { useState } from 'react'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

export default function IniciarSesion(){
  const [form, setForm] = useState({ email:'', clave1:'' })
  const [msg, setMsg] = useState('\u00A0')
  const [err, setErr] = useState({ email:false, clave1:false })

  const onChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // limpiar error del campo al escribir
    setErr(prev => ({ ...prev, [name]: false }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const emailErr = !form.email.includes('@')
    const passErr = !form.clave1

    if (emailErr || passErr) {
      setErr({ email: emailErr, clave1: passErr })
      setMsg('Error, revisa los campos en rojo!.')
      return
    }

    setErr({ email:false, clave1:false })
    setMsg('Formulario enviado correctamente!.')
  }

  return (
    <main className="form-container">
      <div className="card" style={{maxWidth:450, width:'100%'}}>
        <h2>Inicia sesión con tu cuenta</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu-correo@ejemplo.com"
              value={form.email}
              onChange={onChange}
              error={err.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="clave1">Contraseña</label>
            <Input
              id="clave1"
              name="clave1"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={form.clave1}
              onChange={onChange}
              error={err.clave1}
              required
            />
          </div>
          <Button type="submit" className="button" style={{width:'100%'}}>Iniciar sesión</Button>
          <p className="secondary-text" id="errores" style={{textAlign:'center', marginTop: 15}}>{msg}</p>
        </form>
        <p className="secondary-text" style={{textAlign:'center', marginTop: 15}}>
          ¿No tienes una cuenta? <a href="/crear-cuenta">Regístrate aquí</a>
        </p>
      </div>
    </main>
  )
}
