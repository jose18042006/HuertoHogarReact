// src/components/organisms/CTASection.jsx

import { Link } from 'react-router-dom';

export default function CTASection() {
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

        {/* --- ¡AQUÍ ESTÁ LA MODIFICACIÓN! --- */}
        {/* Añadimos los botones de acción para que el usuario pueda registrarse o iniciar sesión */}
        <div className="cta-actions">
          <Link className="button" to="/crear-cuenta">Crear mi Cuenta Gratis</Link>
          <Link className="button button--light" to="/iniciar-sesion">Ya soy miembro</Link>
        </div>

        <small className="cta-note">Es gratis y toma menos de 1 minuto.</small>
      </div>
    </section>
  );
}