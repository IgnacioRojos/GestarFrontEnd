import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal"; 
import api from "../services/Api";
import "../styles/buscadorFiltro.css"

const BuscadorFiltro = () => {
  const [dni, setDni] = useState("");
  const [estado, setEstado] = useState("");
  const [gestiones, setGestiones] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(""); 

  const navigate = useNavigate();

  const handleBuscar = async () => {
    if (!dni.trim() || !estado.trim()) {
      setModalMessage("Completá el DNI y el estado"); 
      setShowModal(true); 
      return;
    }

    try {
      const res = await api.get(`/api/contactos/estado/${estado}/dni/${dni}`);
      setGestiones(res.data);
    } catch (error) {
      console.error("Error al buscar gestiones:", error);
      setGestiones([]);
    } finally {
      setBuscado(true);
    }
  };

  return (
    <div className="buscador-filtro-container">
      <Form className="d-flex mb-3" onSubmit={e => e.preventDefault()}>
        <Form.Control
          placeholder="DNI"
          value={dni}
          onChange={e => setDni(e.target.value)}
          className="me-2"
        />
        <Form.Select
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="me-2 botonBus" 
        >
          <option value="">Seleccionar estado...</option>
          <option value="solucionado">Solucionado</option>
          <option value="derivado">Derivado</option>
        </Form.Select>
        <Button onClick={handleBuscar} className="botonFiltro">Buscar</Button>
      </Form>

      {buscado && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th># Gestión</th>
              <th>DNI Cliente</th>
              <th>Cliente</th>
              <th>Agente</th>
              <th>Motivo</th>
              <th>Notas</th>
              <th>Comentario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gestiones.length ? (
              gestiones.map(g => (
                <tr key={g._id}>
                  <td>{g.gestionId}</td>
                  <td>{g.cliente?.dni || "-"}</td>
                  <td>{`${g.cliente?.nombre || ""} ${g.cliente?.apellido || ""}`}</td>
                  <td>{g.agente || "-"}</td>
                  <td>{g.motivo?.descripcion || "-"}</td>
                  <td>{g.notas || "-"}</td>
                  <td>{g.comentario || "-"}</td>
                  <td>{g.estado || "-"}</td>
                  <td>
                    <Button
                      className="botonGestion"
                      size="sm"
                      onClick={() => navigate(`/dashboard/gestiones/detalle/${g.gestionId}`)}
                    >
                      Ver gestión
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  No hay gestiones que coincidan
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
          <Modal.Title>Atención</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BuscadorFiltro;