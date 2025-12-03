import { useState } from 'react'
import { productos } from '../data/productos'
import ProductCard from '../components/molecules/ProductCard'

const filtros = [
  { key: 'all', label: 'Todos los Productos' },
  { key: 'frutas', label: 'Frutas' },
  { key: 'verduras', label: 'Verduras' },
  { key: 'otros', label: 'Otros' }
]

export default function Catalogo(){
  const [filtro, setFiltro] = useState('all')
  const lista = filtro === 'all' ? productos : productos.filter(p => p.categoria === filtro)
  return (
    <main className="catalogo-container">
      <header className="page-header"><h1 className="page-title">PRODUCTOS</h1></header>
      <div className="filter-container" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        {filtros.map(f => (
          <button key={f.key} className={`filter-btn ${filtro===f.key?'active':''}`} onClick={()=>setFiltro(f.key)}>{f.label}</button>
        ))}
      </div>
      <div className="product-grid">
        {lista.map(p => (<ProductCard key={p.id} p={p} />))}
      </div>
    </main>
  )
}
