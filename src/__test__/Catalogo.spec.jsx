import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Catalogo from '../pages/Catalogo'

// ✅ Jest (no Vitest)
jest.mock('../data/productos', () => ({
  productos: [
    { id: 1, categoria: 'frutas', nombre: 'Manzana' },
    { id: 2, categoria: 'verduras', nombre: 'Lechuga' },
    { id: 3, categoria: 'otros', nombre: 'Miel' },
  ],
}))

// Simplificamos ProductCard para contar tarjetas
jest.mock('../components/molecules/ProductCard', () => ({
  __esModule: true,
  default: ({ p }) => <div data-testid="card">{p.nombre}</div>,
}))

describe('Catalogo', () => {
  it('renderiza los 4 botones de filtro', () => {
    render(<Catalogo />)
    expect(screen.getByRole('button', { name: /todos los productos/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /frutas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /verduras/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /otros/i })).toBeInTheDocument()
  })

  it('marca activo el botón pulsado', async () => {
    render(<Catalogo />)
    const frutas = screen.getByRole('button', { name: /frutas/i })
    await userEvent.click(frutas)
    expect(frutas.className).toMatch(/active/)
  })

  it('filtra las tarjetas por categoría', async () => {
    render(<Catalogo />)
    expect(screen.getAllByTestId('card')).toHaveLength(3)

    await userEvent.click(screen.getByRole('button', { name: /frutas/i }))
    expect(screen.getAllByTestId('card')).toHaveLength(1)
    expect(screen.getByText('Manzana')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /verduras/i }))
    expect(screen.getAllByTestId('card')).toHaveLength(1)
    expect(screen.getByText('Lechuga')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /otros/i }))
    expect(screen.getAllByTestId('card')).toHaveLength(1)
    expect(screen.getByText('Miel')).toBeInTheDocument()
  })
})
