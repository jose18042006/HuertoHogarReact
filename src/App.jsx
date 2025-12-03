import { Routes, Route } from 'react-router-dom'
import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import CrearCuenta from './pages/CrearCuenta'
import IniciarSesion from './pages/IniciarSesion'
import Cambios from './pages/Cambios'
import Carrito from './pages/Carrito'
import Nosotros from './pages/Nosotros' 

export default function App(){
  return (
    <div className="paper-texture">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/cambios" element={<Cambios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}
