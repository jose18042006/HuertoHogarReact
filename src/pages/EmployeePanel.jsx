// src/pages/EmployeePanel.jsx

import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import Button from '../components/atoms/Button';

const EmployeePanel = () => {
  // Estados para la lista de productos y mensajes
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Estados para manejar el formulario de creación/edición
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    categoria: '',
    nombre: '',
    precio: 0,
    unidad: '',
    descripcion: '',
    origen: '',
    stock: '',
    imagen: ''
  });

  // Función para obtener todos los productos
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    }
  };

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- MANEJADORES DE EVENTOS ---

  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentProduct({ id: '', categoria: '', nombre: '', precio: 0, unidad: '', descripcion: '', origen: '', stock: '', imagen: '' });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setShowForm(true);
    setSuccess(null);
    setError(null);
  };

  const handleDeleteClick = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        setSuccess('Producto eliminado correctamente.');
        fetchProducts(); // Recargamos la lista de productos
      } catch (err) {
        setError('Error al eliminar el producto.');
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isEditing) {
        await updateProduct(currentProduct.id, currentProduct);
        setSuccess('Producto actualizado correctamente.');
      } else {
        await createProduct(currentProduct);
        setSuccess('Producto creado correctamente.');
      }
      setShowForm(false);
      fetchProducts(); // Recargamos la lista de productos
    } catch (err) {
      setError('Error al guardar el producto. Revisa los datos.');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Gestión de Productos</h1>
        <Button onClick={handleCreateClick}>Crear Nuevo Producto</Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* --- FORMULARIO DE CREACIÓN/EDICIÓN --- */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
            <form onSubmit={handleFormSubmit}>
              {/* Fila 1 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>ID (ej: VE008)</label>
                  <input type="text" name="id" value={currentProduct.id} onChange={handleFormChange} className="form-control" required disabled={isEditing} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Nombre</label>
                  <input type="text" name="nombre" value={currentProduct.nombre} onChange={handleFormChange} className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Categoría</label>
                  <input type="text" name="categoria" value={currentProduct.categoria} onChange={handleFormChange} className="form-control" required />
                </div>
              </div>
              {/* Fila 2 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Precio</label>
                  <input type="number" name="precio" value={currentProduct.precio} onChange={handleFormChange} className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Unidad (ej: kg, atado)</label>
                  <input type="text" name="unidad" value={currentProduct.unidad} onChange={handleFormChange} className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Stock (ej: 150 kilos)</label>
                  <input type="text" name="stock" value={currentProduct.stock} onChange={handleFormChange} className="form-control" required />
                </div>
              </div>
              {/* Fila 3 */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Origen</label>
                  <input type="text" name="origen" value={currentProduct.origen} onChange={handleFormChange} className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Ruta de Imagen (ej: /imagenes/nuevo.png)</label>
                  <input type="text" name="imagen" value={currentProduct.imagen} onChange={handleFormChange} className="form-control" />
                </div>
              </div>
              {/* Fila 4 */}
              <div className="mb-3">
                <label>Descripción</label>
                <textarea name="descripcion" value={currentProduct.descripcion} onChange={handleFormChange} className="form-control" rows="3"></textarea>
              </div>
              <Button type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</Button>
              <Button variant="light" onClick={() => setShowForm(false)} className="ms-2">Cancelar</Button>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLA DE PRODUCTOS --- */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>${product.precio.toLocaleString('es-CL')}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button variant="light" size="sm" onClick={() => handleEditClick(product)} className="me-2">Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePanel;