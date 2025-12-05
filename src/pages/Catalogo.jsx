// src/pages/Catalogo.jsx

import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/molecules/ProductCard';

const Catalogo = () => {
  // Estado para la lista COMPLETA de productos del backend
  const [allProducts, setAllProducts] = useState([]);
  // --- ¡NUEVO ESTADO! --- Para guardar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setAllProducts(response.data); // Guardamos la lista completa
      } catch (err) {
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- ¡NUEVA LÓGICA DE FILTRADO! ---
  // Antes de renderizar, calculamos qué productos mostrar.
  const filteredProducts = selectedCategory === 'all'
    ? allProducts // Si la categoría es 'all', mostramos todos los productos
    : allProducts.filter(p => p.categoria.toLowerCase() === selectedCategory.toLowerCase()); // Si no, filtramos

  if (loading) {
    return <p>Cargando nuestro catálogo...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="catalogo-container">
      <h1 className="page-title">Nuestro Catálogo</h1>
      
      {/* --- ¡NUEVOS BOTONES DE FILTRO! --- */}
      <div className="filter-buttons">
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        >
          Todas
        </button>
        <button 
          onClick={() => setSelectedCategory('frutas')}
          className={`filter-btn ${selectedCategory === 'frutas' ? 'active' : ''}`}
        >
          Frutas
        </button>
        <button 
          onClick={() => setSelectedCategory('verduras')}
          className={`filter-btn ${selectedCategory === 'verduras' ? 'active' : ''}`}
        >
          Verduras
        </button>
        <button 
          onClick={() => setSelectedCategory('otros')}
          className={`filter-btn ${selectedCategory === 'otros' ? 'active' : ''}`}
        >
          Otros
        </button>
      </div>

      {/* --- RENDERIZADO DE PRODUCTOS FILTRADOS --- */}
      <div className="product-grid">
        {/* Ahora mapeamos sobre la lista FILTRADA */}
        {filteredProducts.map(product => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;