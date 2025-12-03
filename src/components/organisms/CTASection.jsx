import { Link } from 'react-router-dom'

export default function CTASection(){
  return (
    <section className="cta">
      <div className="container cta-inner">
        <span className="kicker">Club HuertoHogar</span>
        <h2>Únete y desbloquea ofertas exclusivas</h2>
        <p className="secondary-text">
          Inicia sesión para recibir precios especiales, preventas de temporada y beneficios solo para miembros.
        </p>
        <ul className="cta-perks">
          <li>10% en tu primera compra</li>
          <li>Despacho programado</li>
          <li>Recomendaciones de temporada</li>
        </ul>
        <div className="cta-actions">
          <Link className="button button--light" to="/iniciar-sesion">Iniciar sesión</Link>
          <Link className="btn" to="/crear-cuenta">Crear cuenta</Link>
          <Link className="button button--light" to="/cambios">Modificar cuenta</Link>
        </div>
        <small className="cta-note">Es gratis y toma menos de 1 minuto.</small>
      </div>
    </section>
  )
}
