// src/components/molecules/CartRow.jsx

import Button from '../atoms/Button';

// Este componente ahora es muy simple. Solo recibe el 'item' y la función 'onRemove'.
export default function CartRow({ item, onRemove }) {
  const { code, image, name, description, price } = item;

  return (
    <tr>
      <td>{code}</td>
      <td>{image ? <img src={image} alt={name} style={{ width: 60 }} /> : '—'}</td>
      <td>{name}</td>
      <td className="secondary-text">{description}</td>
      <td>${Number(price).toLocaleString('es-CL')}</td>
      <td>
        {/* Al hacer clic, llama a la función 'onRemove' que le pasó el padre */}
        <Button variant="light" onClick={() => onRemove(code)}>Eliminar</Button>
      </td>
    </tr>
  );
}