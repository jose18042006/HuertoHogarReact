import { NavLink, Link } from 'react-router-dom'
import React from 'react'

export default function Header(){
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    setCount(products.length)

    const onStorage = () => {
      const p = JSON.parse(localStorage.getItem('products') || '[]')
      setCount(p.length)
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <header className="site-header">
      <nav className="nav main-nav" aria-label="Principal">
        {/* 🔹 Menú izquierdo */}
        <ul className="menu left" role="list">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/catalogo">Productos</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
        </ul>

        {/* 🔹 Logo centrado */}
        <div className="logo">
          <Link to="/">
            <img src="/Huerto Hogar 1.png" alt="Huerto Hogar" />
          </Link>
        </div>

        {/* 🔹 Carrito + Teléfono (separados con espacio) */}
        <div className="right-section">
          <NavLink
            to="/carrito"
            className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
          >
            🛒 Carrito <span className="badge">({count})</span>
          </NavLink>

          <a href="tel:+56998765432" className="phone-link">📞 +56 9 9876 5432</a>
        </div>
      </nav>
    </header>
  )
}
