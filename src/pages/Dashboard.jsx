import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import DatosClientes from "../componentes/Datos/datosclient";
import Tipi from "../componentes/Tipificacion/tipi";
import Solucion from "../componentes/Solucion/solucion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
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

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAutoClose, setModalAutoClose] = useState(false);

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

  const handleNavigate = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 500);
  };

  const showModalMessage = (title, message, autoClose = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalAutoClose(autoClose);
    setShowModal(true);

    if (autoClose) {
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const handleCrearContacto = async (estado) => {
    if (!cliente.dni) {
      showModalMessage("Error", "Debes buscar un cliente antes de continuar");
      return;
    }

    if (estado === "solucionado" && comentario.trim() === "") {
      showModalMessage("Error", "Debes escribir un comentario antes de solucionar el contacto");
      return;
    }

    if (!tipi.codigo) {
      showModalMessage("Error", "Debes buscar una tipificación válida antes de continuar");
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

      // Mostrar éxito en modal con número de gestión y auto-close
      showModalMessage(
        "Contacto creado",
        `El contacto fue registrado correctamente.\nNúmero de gestión: ${res.data.gestionId}`,
        true
      );

      setCliente({ nombre: "", apellido: "", telefono: "", email: "", dni: "" });
      setNota("");
      setTipi({ descripcion: "", codigo: "", id: "" });
      setTipiId("");
      setComentario("");
      setLimpiar(true);
    } catch (error) {
      console.error("Error al crear contacto:", error.response?.data || error);
      showModalMessage(
        "Error",
        error.response?.data?.message || "No se pudo crear el contacto"
      );
    } finally {
      setLoading(false);
    }
  };

  const isBusqueda =
    location.pathname.includes("/dashboard/gestiones/buscar") ||
    location.pathname.includes("/dashboard/gestiones/filtro") ||
    location.pathname.includes("/dashboard/gestiones/panel") ||
    location.pathname.includes("/dashboard/gestiones/crear-cliente") ||
    location.pathname.includes("/dashboard/gestiones/detalle");

  return (
    <div className="dashboard mt-0">
      {/* Barra superior */}
      <div className="d-flex justify-content-between align-items-center mb-3 principal">
        <h2>Gestión de Contactos</h2>
        <div>
          <span className="me-3">
            Usuario: <strong>{user.username}</strong> ({user.role})
          </span>
          <Button className="sesion" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Contenedor horizontal */}
      <div className="dashboard-content">
        <div className="sidebar-buttons">
          <Button className="botonbusqueda" onClick={() => handleNavigate("/dashboard/gestiones/buscar")}>
            Buscar gestión
          </Button>

          <Button className="botonbusqueda" onClick={() => handleNavigate("/dashboard/gestiones/filtro")}>
            Buscar por DNI y estado
          </Button>

          {user.role === "supervisor" && (
            <Button className="botonbusqueda" onClick={() => handleNavigate("/dashboard/gestiones/panel")}>
              Panel supervisores
            </Button>
          )}

          <Button className="botonbusqueda" onClick={() => handleNavigate("/dashboard/gestiones/crear-cliente")}>
            Crear nuevo cliente
          </Button>

          <Button className="botonbusqueda" onClick={() => handleNavigate("/dashboard")}>
            Crear contacto
          </Button>
        </div>

        <div className="main-content">
          {isNavigating ? (
            <div className="spinner-overlay">
              <div className="spinner-container">
                <Spinner
                  animation="border"
                  role="status"
                  className="spinner-personalizado"
                  style={{ width: "5rem", height: "5rem" }}
                />
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

              <ButtonGroup size="md" className="mt-3">
                <Button
                  className="botonAccion"
                  disabled={loading}
                  onClick={() => handleCrearContacto("solucionado")}
                >
                  {loading ? "Cargando..." : "Solucionar"}
                </Button>
                <Button
                  className="botonAccion"
                  disabled={loading}
                  onClick={() => handleCrearContacto("derivado")}
                >
                  {loading ? "Cargando..." : "Derivar"}
                </Button>
              </ButtonGroup>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{modalMessage}</p>
        </Modal.Body>
        {!modalAutoClose && (
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Aceptar</Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
