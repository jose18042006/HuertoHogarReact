import { useState } from 'react'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

export default function CrearCuenta(){
  const [form, setForm] = useState({
    email:'', direccion:'', telefono:'', clave1:'', clave2:''
  })
  const [msg, setMsg] = useState('\u00A0')
  const [err, setErr] = useState({
    email:false, direccion:false, telefono:false, clave1:false, clave2:false
  })

  const onChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErr(prev => ({ ...prev, [name]: false }))
  }

  const validate = () => {
    const next = {
      email: !form.email.includes('@'),
      telefono: form.telefono.length < 9,
      direccion: !form.direccion,
      clave1: !form.clave1,
      clave2: !form.clave2 || form.clave1 !== form.clave2,
    }
    setErr(next)
    if (Object.values(next).some(Boolean)) {
      if (next.email) return 'Error: Debes incluir un signo arroba en el correo.'
      if (next.telefono) return 'Error: Debes ingresar un número de teléfono válido.'
      if (next.direccion) return 'Error: Debes ingresar una dirección.'
      if (next.clave2) return 'Error: Las contraseñas no coinciden.'
    }
    return ''
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errMsg = validate()
    if (errMsg) { setMsg(errMsg); return }
    setMsg('Formulario enviado correctamente!.')
  }

  return (
    <main className="form-container">
      <div className="card" style={{maxWidth:450, width:'100%'}}>
        <h2>Crear una Cuenta</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <Input id="email" name="email" type="email"
              placeholder="tu-correo@ejemplo.com"
              value={form.email} onChange={onChange} error={err.email} required />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <Input id="direccion" name="direccion" type="text"
              placeholder="País, Ciudad, Calle, etc."
              value={form.direccion} onChange={onChange} error={err.direccion} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <Input id="telefono" name="telefono" type="tel"
              placeholder="+56912341234"
              value={form.telefono} onChange={onChange} error={err.telefono} required />
          </div>
          <div className="form-group">
            <label htmlFor="clave1">Contraseña</label>
            <Input id="clave1" name="clave1" type="password"
              placeholder="Crea una contraseña segura"
              value={form.clave1} onChange={onChange} error={err.clave1} required />
          </div>
          <div className="form-group">
            <label htmlFor="clave2">Confirmar Contraseña</label>
            <Input id="clave2" name="clave2" type="password"
              placeholder="Repite tu contraseña"
              value={form.clave2} onChange={onChange} error={err.clave2} required />
          </div>
          <Button type="submit" className="button" style={{width:'100%'}}>Registrarse</Button>
          <p className="secondary-text" id="errores" style={{textAlign:'center', marginTop: 15}}>{msg}</p>
        </form>
        <p className="secondary-text" style={{textAlign:'center', marginTop: 15}}>
          ¿Ya tienes una cuenta? <a href="/iniciar-sesion">Inicia sesión aquí</a>
        </p>
      </div>
    </main>
  )
}
