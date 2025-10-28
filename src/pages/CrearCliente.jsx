import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import api from "../services/Api"
import "../styles/crearCliente.css"

const CrearCliente = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(""); 
  const [modalTitle, setModalTitle] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.apellido || !cliente.dni) {
      setModalTitle("Error")
      setModalMessage("El nombre, apellido y DNI son obligatiorios")
      setShowModal(true)
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/clientes", cliente);
      setModalTitle("Éxito");
      setModalMessage(`Cliente creado con éxito: ${res.data.nombre} ${res.data.apellido}`);
      setShowModal(true);
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(error.response?.data?.error || "Error al crear cliente");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Redirigir al dashboard si fue creación exitosa
    if (modalTitle === "Éxito") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Crear nuevo cliente</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={cliente.nombre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control name="apellido" value={cliente.apellido} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control name="dni" value={cliente.dni} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control name="telefono" value={cliente.telefono} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" disabled={loading} className="botonGestion">
          {loading ? "Creando..." : "Crear cliente"}
        </Button>
        <Button  className="ms-2 botonCancelar" onClick={() => navigate("/dashboard")}>
          Cancelar
        </Button>
      </Form>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CrearCliente;