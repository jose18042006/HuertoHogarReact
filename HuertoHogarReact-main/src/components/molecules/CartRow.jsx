import Button from '../atoms/Button'
import { removeFromCart } from '../../utils/cart'
export default function CartRow({ item, onChange }){
  const { code, image, name, description, price } = item
  return (
    <tr>
      <td>{code}</td>
      <td>{image ? <img src={image} alt={name} style={{width:60}}/> : '—'}</td>
      <td>{name}</td>
      <td className="secondary-text">{description}</td>
      <td>${Number(price).toLocaleString('es-CL')}</td>
      <td>
        <Button variant="light" onClick={(e)=>{ e.preventDefault(); removeFromCart(code); onChange?.() }}>Eliminar</Button>
      </td>
    </tr>
  )
}
