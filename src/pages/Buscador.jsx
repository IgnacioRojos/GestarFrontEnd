import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import api from "../services/Api";
import "../styles/buscador.css"

const Buscador = () => {
  const [gestionId, setGestionId] = useState("");
  const [gestiones, setGestiones] = useState([]);
  const [buscado, setBuscado] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleBuscar = async () => {

    if (!gestionId.trim()) {
      setModalMessage("Ingresá un número de gestión"); 
      setShowModal(true); 
      return;
    }

    try {
      const res = await api.get(`/api/contactos/${gestionId}`);

      const data = Array.isArray(res.data) ? res.data : [res.data];
      setGestiones(data);
    } catch (error) {
      setGestiones([]);

    } finally {
      setBuscado(true); 
    }
  };

  return (
    <div className="buscador-container">
      <Form className="d-flex mb-3" onSubmit={e => e.preventDefault()}>
        <Form.Control
          placeholder="Número de gestión"
          value={gestionId}
          onChange={e => setGestionId(e.target.value)}
          className="me-2"
        />
        <Button onClick={handleBuscar} className="botonBuscar">Buscar</Button>
      </Form>

      {buscado && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th># Gestión</th>
              <th>DNI Cliente</th>
              <th>Agente</th>
              <th>Motivo</th>
              <th>Notas</th>
              <th>Comentario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {gestiones.length ? (
              gestiones.map(g => (
                <tr key={g._id}>
                  <td>{g.gestionId}</td>
                  <td>{g.cliente?.dni || "-"}</td>
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
                <td colSpan={7} className="text-center">
                  No hay gestiones
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

export default Buscador;