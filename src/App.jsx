import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Vehiculos from './paginas/Vehiculos'
import Reservas from './paginas/Reservas'
import Clientes from './paginas/Clientes'
import CrearCliente from './paginas/CrearCliente'
import VisualizarCliente from './paginas/VisualizarCliente'
import ActualizarCliente from './paginas/ActualizarCliente'
import CrearVehiculos from './paginas/CrearVehiculos'
import VisualizarVehiculo from './paginas/VisualizarVehiculo'
import ActualizarVehiculo from './paginas/ActualizarVehiculo'
import CrearReservas from './paginas/CrearReservas'
import VisualizarReserva from './paginas/VisualizarReserva'
import ActualizaReserva from './paginas/ActualizaReserva'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <Routes>

              <Route index element={<LandinPage />} />

              <Route path='/' element={<Auth />}>
                <Route path='login' element={<Login />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='dashboard/*' element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Clientes />} />
                      <Route path='registrar_cliente' element={<CrearCliente />} />
                      <Route path='visualizar_cliente/:id' element={<VisualizarCliente />} />
                      <Route path='actualizar_cliente/:id' element={<ActualizarCliente />} />
                      <Route path='vehiculos' element={<Vehiculos />} />
                      <Route path='registrar_vehiculos' element={<CrearVehiculos />} />
                      <Route path='visualizar_vehiculo/:id' element={<VisualizarVehiculo />} />
                      <Route path='actualizar_vehiculo/:id' element={<ActualizarVehiculo />} />
                      <Route path='reservas' element={<Reservas />} />
                      <Route path='registrar_reservas' element={<CrearReservas />} />
                      <Route path='visualizar_reserva/:id' element={<VisualizarReserva />} />
                      <Route path='actualizar_reserva/:id' element={<ActualizaReserva />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
              } />
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
