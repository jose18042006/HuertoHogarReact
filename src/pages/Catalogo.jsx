// src/pages/CatalogoPage.jsx

import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/molecules/ProductCard';

const CatalogoPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando nuestro catálogo...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="catalogo">
      <h1>Catálogo de Productos</h1>
      <div className="product-grid">
        {products.map(product => (
          // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
          // Cambiamos la prop "product" por "p" para que coincida
          // con lo que espera el componente ProductCard.
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogoPage;