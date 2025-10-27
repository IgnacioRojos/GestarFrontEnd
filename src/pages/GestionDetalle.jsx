// GestionDetalle.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import api from "../services/Api";
import "../styles/gestionDetalle.css";

const GestionDetalle = () => {
  const { id } = useParams();
  const [gestion, setGestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Campos editables
  const [notas, setNotas] = useState("");
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Usuario actual 
  const [usuario, setUsuario] = useState({ _id: "", nombre: "", rol: "" });

  useEffect(() => {
    const usuarioNombre = localStorage.getItem("username") || "";
    const usuarioRol = localStorage.getItem("role") || "";
    setUsuario({ _id: "dummyId", nombre: usuarioNombre, rol: usuarioRol }); 
  }, []);

  // Cargar gestión
  useEffect(() => {
    const fetchGestion = async () => {
      try {
        const res = await api.get(`/api/contactos/${id}`);
        setGestion(res.data);
        setEstado(res.data.estado || "");
      } catch (err) {
        console.error("Error al obtener gestión:", err);
        setError("No se pudo cargar la gestión.");
      } finally {
        setLoading(false);
      }
    };
    fetchGestion();
  }, [id]);

  // Guardar cambios
  const handleGuardar = async () => {
    if (!notas && !comentario && !estado) {
      setModalMessage("Debe ingresar al menos una nota, comentario o cambiar el estado.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
      return;
    }

    try {
      setSaving(true);

      const body = {
        notas,
        comentario,
        estado,
        usuarioId: usuario._id,
        usuarioNombre: usuario.nombre,
        rol: usuario.rol,
      };

      const res = await api.put(`/api/contactos/${id}`, body);
      setGestion(res.data); // refresca con el historial actualizado
      setNotas("");
      setComentario("");

      setModalMessage("Cambios guardados correctamente");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      setModalMessage("Error al guardar cambios");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando gestión...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  if (!gestion) return null;

  return (
    <div className="gestion-detalle-container">
      <h3>Gestión #{gestion.gestionId}</h3>

      <div className="gestion-datos mb-3">
        <p>
          <strong>Cliente:</strong> {gestion.cliente?.nombre}{" "}
          {gestion.cliente?.apellido}
        </p>
        <p><strong>DNI:</strong> {gestion.cliente?.dni}</p>
        <p><strong>Agente:</strong> {gestion.agente}</p>
        <p><strong>Motivo:</strong> {gestion.motivo?.descripcion}</p>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            <option value="derivado">Derivado</option>
            <option value="solucionado">Solucionado</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" onClick={handleGuardar} disabled={saving} className="botonGestion">
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Form>

      {/* Historial completo */}
      <div className="gestion-historial mt-5">
        <h5>Historial</h5>
        {gestion.historial?.length ? (
          gestion.historial.map((h, i) => (
            <div key={i} className="historial-item border rounded p-3 mb-3 bg-light shadow-sm">
              <p><strong>Fecha:</strong> {new Date(h.fecha).toLocaleString("es-AR")}</p>
              <p><strong>Usuario:</strong> {h.usuarioNombre} ({h.rol})</p>
              <p><strong>Notas anteriores:</strong> {h.notasAnteriores || "—"}</p>
              <p><strong>Comentario anterior:</strong> {h.comentarioAnterior || "—"}</p>
              <p><strong>Estado anterior:</strong> {h.estadoAnterior || "—"}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">Sin historial previo.</p>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atención</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{modalMessage}</Modal.Body>
      </Modal>
    </div>
  );
};

export default GestionDetalle;
