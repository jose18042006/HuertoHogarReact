
export default function Nosotros(){
  return (
    <main className="about-section">
      <section className="container card" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <h1 className="page-title">Sobre Nosotros</h1>
        <img
        src="/nosotrosImagen.jpg"
        alt="Equipo HuertoHogar"
        style={{
        width: '100%',
        maxHeight: '380px',
        objectFit: 'cover',
        borderRadius: '12px',
        marginTop: '1rem',
        marginBottom: '1.5rem'
        }}
        />

        <p className="secondary-text" style={{ marginTop: '1rem' }}>
          En <strong>HuertoHogar</strong> creemos en el poder del consumo local y responsable.
          Nuestra misión es acercar los productos del campo directamente a las mesas de los hogares chilenos,
          garantizando frescura, calidad y precios justos tanto para quienes cultivan como para quienes compran.
        </p>

        <p className="secondary-text" style={{ marginTop: '1rem' }}>
          Trabajamos en colaboración con agricultores, apicultores y productores de diversas regiones del país,
          priorizando siempre los cultivos de temporada y las prácticas sostenibles. Así logramos reducir la huella
          de transporte y mantener el sabor auténtico de cada producto.
        </p>

        <p className="secondary-text" style={{ marginTop: '1rem' }}>
          Más que un mercado, <strong>HuertoHogar</strong> es una comunidad. Una red de personas que valora
          la trazabilidad, la transparencia y la conexión directa con la tierra. Cada compra contribuye al
          fortalecimiento de la agricultura chilena y al bienestar de nuestras familias.
        </p>

        <div className="cta cta-verde-suave" style={{ marginTop: '2rem' }}>
          <h3>🌿 Nuestro compromiso</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
            <li>✅ Promover la producción local y sostenible</li>
            <li>✅ Garantizar productos frescos y de temporada</li>
            <li>✅ Apoyar a pequeños agricultores y cooperativas</li>
            <li>✅ Reducir intermediarios para un comercio justo</li>
          </ul>
        </div>

        <p className="secondary-text" style={{ marginTop: '2rem' }}>
          Gracias por confiar en nosotros y ser parte del cambio hacia una alimentación más consciente.
          <br />
          — El equipo de <strong>HuertoHogar</strong>
        </p>
      </section>
    </main>
  )
}
