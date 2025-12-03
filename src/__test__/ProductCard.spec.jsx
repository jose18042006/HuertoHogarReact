// src/__test__/ProductCard.spec.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../components/molecules/ProductCard'

// ✅ Mock correcto del módulo de carrito que usa ProductCard
jest.mock('../utils/cart', () => ({
  __esModule: true,
  addToCart: jest.fn(),
}))
import { addToCart } from '../utils/cart'

// ✅ Mock correcto del Button con export default ESM
jest.mock('../components/atoms/Button', () => ({
  __esModule: true,
  default: (props) => <button {...props} />,
}))

describe('ProductCard', () => {
  const p = {
    id: 'A1',
    nombre: 'Tomate',
    precio: 990,
    unidad: 'kg',
    descripcion: 'Tomate jugoso',
    imagen: '/img/tomate.jpg',
    categoria: 'verduras',
    origen: 'Paine',
    stock: 'Alta',
  }

  it('clic en "Añadir al Carrito" llama addToCart con el payload correcto', async () => {
    render(<ProductCard p={p} />)
    await userEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }))
    expect(addToCart).toHaveBeenCalledWith({
      code: p.id,
      image: p.imagen,
      name: p.nombre,
      description: p.descripcion,
      price: p.precio,
    })
  })
})
