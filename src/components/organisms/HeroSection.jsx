import { Link } from 'react-router-dom'

export default function HeroSection(){
  return (
    <section className="hero">
      <div className="hero-scrim">
        <div className="hero-content">
          <span className="kicker">HuertoHogar</span>
          <h1>Verduras frescas, directo del campo</h1>
          <p className="secondary-text">
            Calidad, sabor y temporada — compra local con despacho rápido.
          </p>

          <ul className="hero-highlights">
            <li>Productores locales</li>
            <li>Origen y fecha de cosecha</li>
            <li>Entrega programada</li>
          </ul>

          <div className="hero-actions">
            <Link className="button" to="/catalogo">Ver productos</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
