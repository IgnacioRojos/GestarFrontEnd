import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login/login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/privateRoutes";
import RoleRoute from './routes/roleRoutes';
import Buscador from './pages/Buscador';
import BuscadorFiltro from './pages/BuscadorFiltro';
import PanelSupervisores from './pages/PanelSupervisores';
import CrearCliente from './pages/CrearCliente';
import GestionDetalle from "./pages/GestionDetalle";
import Unauthorized from "./pages/NoAutorizado"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Ruta protegida */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="gestiones">
            <Route path="buscar" element={<Buscador />} />
            <Route path="filtro" element={<BuscadorFiltro />} />

            {/*Protegido por rol */}
            <Route
              path="panel"
              element={
                <RoleRoute requiredRole="supervisor">
                  <PanelSupervisores />
                </RoleRoute>
              }
            />

            <Route path="crear-cliente" element={<CrearCliente />} />
            <Route path="detalle/:id" element={<GestionDetalle />} />
          </Route>
        </Route>

        {/*Ruta para acceso denegado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/*Ruta por defecto para cualquier otra URL */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
