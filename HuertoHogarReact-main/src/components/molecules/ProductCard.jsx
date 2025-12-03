import Button from '../atoms/Button'
import { addToCart } from '../../utils/cart'
export default function ProductCard({ p }){
  return (
    <article className="card product-card" data-category={p.categoria}>
      {p.promo && <span className="promo-badge">¡Oferta!</span>}
      <img src={p.imagen} alt={p.nombre} className="product-image" />
      <div className="product-info">
        <h2>{p.id} - {p.nombre}</h2>
        <p className="product-price">
          ${p.precio.toLocaleString('es-CL')} CLP <span className="currency">/{p.unidad}</span>
          {p.oldPrice && (<span className="old-price">${p.oldPrice.toLocaleString('es-CL')}</span>)}
        </p>
        <p className="product-description secondary-text">{p.descripcion}</p>
        <ul className="product-details-list">
          <li><strong>Origen:</strong> {p.origen}</li>
          <li><strong>Disponibilidad:</strong> {p.stock}</li>
        </ul>
        <Button onClick={(e)=>{ e.preventDefault(); addToCart({
          code: p.id, image: p.imagen, name: p.nombre, description: p.descripcion, price: p.precio
        })}}>Añadir al Carrito</Button>
      </div>
    </article>
  )
}
