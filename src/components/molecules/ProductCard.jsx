// src/components/molecules/ProductCard.jsx

import Button from '../atoms/Button';
import { useApp } from '../../contexts/AppContext';

export default function ProductCard({ p }) {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      code: p.id,
      image: p.imagen,
      name: p.nombre,
      description: p.descripcion,
      price: p.precio
    });
  };

  return (
    <article className="card product-card" data-category={p.categoria}>
      <img src={p.imagen} alt={p.nombre} className="product-image" />
      <div className="product-info">
        <h2>{p.id} - {p.nombre}</h2>
        <p className="product-price">${p.precio.toLocaleString('es-CL')} CLP <span className="currency">/{p.unidad}</span></p>
        <p className="product-description secondary-text">{p.descripcion}</p>
        <ul className="product-details-list">
          <li><strong>Origen:</strong> {p.origen}</li>
          <li><strong>Disponibilidad:</strong> {p.stock}</li>
        </ul>
        <Button onClick={handleAddToCart}>Añadir al Carrito</Button>
      </div>
    </article>
  );
}