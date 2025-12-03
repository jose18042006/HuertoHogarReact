// src/__tests__/Carrito.spec.jsx
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Carrito from '../pages/Carrito'


function setLS(items){ localStorage.setItem('products', JSON.stringify(items)) }

describe('Carrito', () => {
  beforeEach(() => localStorage.clear())

  it('muestra "Volver al catálogo" con href /catalogo', () => {
    render(<MemoryRouter><Carrito /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /volver al catálogo/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/catalogo')
  })

  it('muestra mensaje de vacío cuando no hay productos', () => {
    render(<MemoryRouter><Carrito /></MemoryRouter>)
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  it('el botón "Eliminar" remueve una fila', async () => {
    setLS([
      { id:'A1', nombre:'Tomate', precio:990 },
      { id:'B2', nombre:'Lechuga', precio:1290 },
    ])
    render(<MemoryRouter><Carrito /></MemoryRouter>)
    const filas = screen.getAllByRole('row').slice(1)
    expect(filas).toHaveLength(2)

    await userEvent.click(within(filas[0]).getByRole('button', { name: /eliminar/i }))
    // Recuenta filas (cabecera + 1)
    expect(screen.getAllByRole('row').length - 1).toBe(1)
  })

  it('el botón "Limpiar carrito" vacía el listado y localStorage', async () => {
    setLS([{ id:'A1', nombre:'Tomate', precio:990 }])
    render(<MemoryRouter><Carrito /></MemoryRouter>)
    expect(screen.getAllByRole('row').length - 1).toBe(1)

    await userEvent.click(screen.getByRole('button', { name: /limpiar carrito/i }))
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('products') || '[]')).toEqual([])
  })
})
