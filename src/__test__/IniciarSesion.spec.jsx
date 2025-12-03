
import { render, screen, fireEvent } from '@testing-library/react'
import IniciarSesion from '../pages/IniciarSesion'


describe('IniciarSesion.spec.jsx - Testing del formulario de inicio de sesión', () => {
  beforeEach(() => {
    render(<IniciarSesion />)
  })

  test('debería mostrar error si el correo no contiene @', () => {
    const emailInput = screen.getByLabelText(/Correo Electrónico/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i)
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

   
    fireEvent.change(emailInput, { target: { value: 'usuario.ejemplo.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)

    const errorMsg = screen.getByText(/Error, revisa los campos en rojo!/i)
    expect(errorMsg).toBeInTheDocument()
  })

  test('debería mostrar éxito si los campos son válidos', () => {
    const emailInput = screen.getByLabelText(/Correo Electrónico/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i)
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

    
    fireEvent.change(emailInput, { target: { value: 'usuario@ejemplo.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)

    const successMsg = screen.getByText(/Formulario enviado correctamente!/i)
    expect(successMsg).toBeInTheDocument()
  })
})
