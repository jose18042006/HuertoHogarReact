import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/organisms/Header'

test('actualiza el contador cuando se agregan productos al carrito', () => {
  // Simular 2 productos guardados en localStorage
  localStorage.setItem('products', JSON.stringify([{ id: 1 }, { id: 2 }]))

  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  
  const cartLink = screen.getByRole('link', { name: /carrito/i })

  
  const badge = within(cartLink).getByText('(2)')

  
  expect(badge).toBeInTheDocument()
  expect(badge.textContent).toContain('2')
})
