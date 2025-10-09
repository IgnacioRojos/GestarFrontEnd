import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login/login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/privateRoutes"; // Ruta protegida
import Buscador from './pages/Buscador';
import BuscadorFiltro from './pages/BuscadorFiltro';
import PanelSupervisores from './pages/PanelSupervisores';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Ruta protegida */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          {/* Rutas hijas de Dashboard */}
          <Route path="gestiones">
            <Route path="buscar" element={<Buscador />} />
            <Route path="filtro" element={<BuscadorFiltro />} />
            <Route path="panel" element={<PanelSupervisores />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;