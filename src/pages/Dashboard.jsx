import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DatosClientes from "../componentes/Datos/datosclient";
import Tipi from "../componentes/Tipificacion/tipi";
import Solucion from "../componentes/Solucion/solucion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal"; // ✅ nuevo import
import api from "../services/Api";
import "../styles/dasboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({ username: "", role: "" });
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
  });
  const [nota, setNota] = useState("");
  const [tipi, setTipi] = useState({ descripcion: "", codigo: "", id: "" });
  const [comentario, setComentario] = useState("");
  const [tipiId, setTipiId] = useState("");
  const [limpiar, setLimpiar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // ✅ Estado del modal
  const [showModal, setShowModal] = useState(false);
  const [gestionId, setGestionId] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (!username || !role) {
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

  const handleCrearContacto = async (estado) => {
    if (!cliente.dni) {
      alert("Debes buscar un cliente antes de continuar");
      return;
    }

    if (estado === "solucionado" && comentario.trim() === "") {
      alert("Debes escribir un comentario antes de solucionar el contacto");
      return;
    }

    if (!tipi.codigo) {
      alert("Debes buscar una tipificación válida antes de continuar");
      return;
    }

    setLoading(true);
    try {
      const contactoCompleto = {
        cliente: cliente.dni,
        agente: user.username,
        motivo: tipi.codigo,
        notas: nota,
        comentario,
        estado,
      };

      const res = await api.post("/api/contactos", contactoCompleto);

      // ✅ Mostrar el número de gestión en un modal
      setGestionId(res.data.gestionId);
      setShowModal(true);

      setCliente({ nombre: "", apellido: "", telefono: "", email: "", dni: "" });
      setNota("");
      setTipi({ descripcion: "", codigo: "", id: "" });
      setTipiId("");
      setComentario("");
      setLimpiar(true);
    } catch (error) {
      console.error("Error al crear contacto:", error.response?.data || error);
      alert(error.response?.data?.message || "No se pudo crear el contacto");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 500);
  };

  const isBusqueda =
    location.pathname.includes("/dashboard/gestiones/buscar") ||
    location.pathname.includes("/dashboard/gestiones/filtro") ||
    location.pathname.includes("/dashboard/gestiones/panel");

  return (
    <div className="dashboard mt-0">
      {/* Barra superior */}
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

      {/* Contenedor horizontal */}
      <div className="dashboard-content">
        <div className="sidebar-buttons">
          <Button onClick={() => handleNavigate("/dashboard/gestiones/buscar")} variant="primary">
            Buscar gestión
          </Button>
          <Button onClick={() => handleNavigate("/dashboard/gestiones/filtro")} variant="secondary">
            Buscar por DNI y estado
          </Button>
          <Button onClick={() => handleNavigate("/dashboard/gestiones/panel")} variant="success">
            Panel supervisores
          </Button>
          <Button onClick={() => handleNavigate("/dashboard")} variant="outline-primary">
            Crear contacto
          </Button>
        </div>

        <div className="main-content">
          {isNavigating ? (
            <div className="spinner-overlay">
              <div className="spinner-container">
                <Spinner animation="border" variant="primary" role="status" style={{ width: "5rem", height: "5rem" }} />
                <p className="mt-3">Cargando...</p>
              </div>
            </div>
          ) : location.pathname.includes("/dashboard/gestiones") ? (
            <Outlet />
          ) : (
            <>
              <DatosClientes
                cliente={cliente}
                setCliente={setCliente}
                nota={nota}
                setNota={setNota}
                limpiar={limpiar}
                setLimpiar={setLimpiar}
              />
              <Tipi
                tipi={tipi}
                setTipi={setTipi}
                tipiId={tipiId}
                setTipiId={setTipiId}
                limpiar={limpiar}
                setLimpiar={setLimpiar}
              />
              <Solucion comentario={comentario} setComentario={setComentario} />

              <ButtonGroup size="md" className="mt-3"> {/* 🔹 botones más chicos */}
                <Button disabled={loading} onClick={() => handleCrearContacto("solucionado")}>
                  {loading ? "Cargando..." : "Solucionar"}
                </Button>
                <Button disabled={loading} onClick={() => handleCrearContacto("derivado")}>
                  {loading ? "Cargando..." : "Derivar"}
                </Button>
              </ButtonGroup>
            </>
          )}
        </div>
      </div>

      {/* ✅ Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contacto creado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>El contacto fue registrado correctamente.</p>
          <h5 className="mt-2">Número de gestión:</h5>
          <h3 className="text-primary fw-bold">{gestionId}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
