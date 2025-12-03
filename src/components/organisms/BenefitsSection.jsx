export default function BenefitsSection(){
  return (
    <section className="benefits" id="beneficios">
      <h2>Nuestros beneficios</h2>
      <div className="benefits-grid">
        <article className="card">
          <h3>🫑 Recién cosechado</h3>
          <p>
            Trabajamos directo con agricultores para reducir tiempos de espera entre la cosecha y tu entrega.
            Así los productos llegan crujientes, con mejor sabor y más vida útil.
          </p>
        </article>
        <article className="card">
          <h3>🥬 Temporada & origen</h3>
          <p>
            Mostramos variedad, zona y fecha de cosecha en cada producto. Elegir de temporada es mejor:
            más sabor y menos transporte.
          </p>
        </article>
        <article className="card">
          <h3>🥕 Precios justos</h3>
          <p>
            Directo del productor a tu mesa: menos intermediarios, mejor precio y calidad recién cosechada.
          </p>
        </article>
      </div>
    </section>
  )
}
