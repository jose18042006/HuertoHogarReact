import React from 'react'
import CartRow from '../molecules/CartRow'
import Button from '../atoms/Button'
import { getCart, clearCart } from '../../utils/cart'

export default function CartTable(){
  const [items, setItems] = React.useState(getCart())
  const refresh = () => setItems(getCart())

  const total = items.reduce((acc, it)=> acc + Number(it.price||0), 0)

  return (
    <div className="card" style={{overflowX:'auto'}}>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length===0 ? (
            <tr><td colSpan={6} style={{textAlign:'center', padding:'1rem'}}>Tu carrito está vacío</td></tr>
          ) : items.map(it => <CartRow key={it.code} item={it} onChange={refresh} />)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{textAlign:'right', fontWeight:600}}>Total</td>
            <td colSpan={2} style={{fontWeight:700}}>${total.toLocaleString('es-CL')}</td>
          </tr>
        </tfoot>
      </table>
      <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:12}}>
        <Button variant="light" onClick={()=>{ clearCart(); refresh(); }}>Limpiar carrito</Button>
        <Button href="#" onClick={(e)=>e.preventDefault()}>Pagar</Button>
      </div>
    </div>
  )
}
