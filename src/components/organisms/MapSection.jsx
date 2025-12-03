export default function MapSection(){
  return (
    <section className="map-section container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '0.75rem' }}>📍 Nuestra ubicación</h2>
      <iframe
        title="Mapa HuertoHogar"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.175460438446!2d-70.64826912509513!3d-33.443294697299785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c59d8ae2cc77%3A0x19b3a9cb9752b6ea!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2scl!4v1730000000000!5m2!1ses-419!2scl"
        width="100%"
        height="360"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}
