import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"; 
import api from "../services/Api"; 
import "../styles/panelSupervisores.css"

const PanelSupervisores = () => {
  const [supervisor, setSupervisor] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", password: "", role: "agente" });
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [usuarioEliminar, setUsuarioEliminar] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setSupervisor(username);
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      showErrorModal("Error", "No se pudieron obtener los usuarios");
    }
  };

  const showErrorModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      showErrorModal("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", nuevoUsuario, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showErrorModal("Éxito", res.data.message);
      setNuevoUsuario({ username: "", password: "", role: "agente" });
      fetchUsuarios();
    } catch (error) {
      showErrorModal("Error", error.response?.data?.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarUsuario = (usuario) => {
    setUsuarioEliminar(usuario);
    setConfirmDelete(true);
  };

  const confirmEliminarUsuario = async () => {
    if (!usuarioEliminar) return;
    try {
      await api.delete(`/api/auth/users/${usuarioEliminar._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showErrorModal("Éxito", "Usuario eliminado");
      fetchUsuarios();
    } catch (error) {
      showErrorModal("Error", error.response?.data?.message || "Error al eliminar usuario");
    } finally {
      setConfirmDelete(false);
      setUsuarioEliminar(null);
    }
  };

  return (
    <div className="panel-supervisores container mt-4">
      <h2>Panel de Supervisores</h2>
      <p>
        Supervisor logeado: <strong>{supervisor}</strong>
      </p>

      {/* Crear nuevo usuario */}
      <div className="mb-4">
        <h4>Crear nuevo usuario</h4>
        <Form onSubmit={handleCrearUsuario}>
          <Form.Group className="mb-2">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={nuevoUsuario.role}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}
            >
              <option value="agente">Agente</option>
              <option value="supervisor">Supervisor</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" disabled={loading} className="botonGestion">
            {loading ? "Creando..." : "Crear Usuario"}
          </Button>
        </Form>
      </div>

      {/* Lista de usuarios */}
      <div>
        <h5>Usuarios existentes</h5>
        <ul>
          {usuarios.map((u) => (
            <li key={u._id || u.username}>
              {u.username} - {u.role}{" "}
              <button onClick={() => handleEliminarUsuario(u)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de mensajes */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quieres eliminar el usuario "{usuarioEliminar?.username}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmEliminarUsuario}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PanelSupervisores;
