import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tipi from '../componentes/Tipificacion/tipi';
import Buscador from "../componentes/Buscador/buscador";
import DatosClientes from "../componentes/Datos/datosclient";
import Derivacion from "../componentes/Derivacion/derivacion";
import Solucion from "../componentes/Solucion/solucion";
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", role: "" });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (!username || !role) {
      // si no hay datos, redirigimos al login
      navigate("/");
    } else {
      setUser({ username, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="dashboard container mt-4">
      {/* Barra superior con usuario y botón */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Contactos</h2>
        <div>
          <span className="me-3">
            Usuario: <strong>{user.username}</strong> ({user.role})
          </span>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Módulos de gestión */}
      <Buscador />
      <DatosClientes />
      <Tipi />
      <Derivacion />
      <Solucion />
    </div>

  );
};

export default Dashboard;