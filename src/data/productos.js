import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api'; // <-- Importamos la función de nuestra API

function ProductCatalog() {
  // 1. Creamos estados para guardar los productos y saber si están cargando
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Usamos useEffect para hacer la petición a la API cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // ¡Aquí ocurre la magia!
        setProducts(response.data); // Guardamos los productos del backend en nuestro estado
      } catch (err) {
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false); // Dejamos de cargar, ya sea que haya funcionado o no
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // 3. Mostramos diferentes cosas dependiendo del estado
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // 4. Si todo salió bien, mostramos la lista de productos del backend
  return (
    <div>
      <h1>Nuestro Catálogo</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.nombre} - ${product.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}