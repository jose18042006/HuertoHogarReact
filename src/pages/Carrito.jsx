// src/pages/Carrito.jsx

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/estilos.css";

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
import { useApp } from "../contexts/AppContext";

export default function Carrito() {
  // Usamos el hook correcto
  const { cartItems, removeFromCart, clearCart } = useApp();

  const total = cartItems.reduce((acc, x) => acc + (x.price * x.quantity), 0);

  // El resto de tu JSX no cambia
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-success">🛒 Tu Carrito</h1>
        <div className="d-flex gap-2">
          <Link to="/catalogo" className="btn btn-outline-success fw-semibold">
            Seguir comprando
          </Link>
          <button onClick={clearCart} className="btn btn-outline-danger fw-semibold">
            Vaciar carrito
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">Tu carrito está vacío 🥕</h4>
          <Link to="/catalogo" className="btn btn-success mt-3">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-success">
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((p) => (
                    <tr key={p.code}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="img-thumbnail me-3"
                            style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                          />
                          <div>
                            <h6 className="mb-0 fw-semibold">{p.name}</h6>
                            <small className="text-muted">{p.description}</small>
                          </div>
                        </div>
                      </td>
                      <td className="fw-semibold text-success">${p.price.toLocaleString("es-CL")}</td>
                      <td className="fw-semibold">x {p.quantity}</td>
                      <td className="fw-semibold text-success">${(p.price * p.quantity).toLocaleString("es-CL")}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(p.code)}
                        >
                          ❌ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-success fw-bold">
              Total: ${total.toLocaleString("es-CL")}
            </h5>
            <button className="btn btn-success fw-semibold">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}