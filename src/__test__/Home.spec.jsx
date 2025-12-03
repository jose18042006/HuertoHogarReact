import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'

describe('Home (HeroSection buttons)', () => {
  it('muestra el botón "Ver productos" que apunta a /catalogo', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /ver productos/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/catalogo')
  })

  
  it('muestra algún botón "Crear cuenta" que apunta a /crear-cuenta', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    const links = screen.getAllByRole('link', { name: /crear cuenta/i })
    expect(links[0]).toBeInTheDocument()
    expect(links[0]).toHaveAttribute('href', '/crear-cuenta')
  })
})
