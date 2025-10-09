import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import api from "../services/Api";

const BuscadorFiltro = () => {
  const [dni, setDni] = useState("");
  const [estado, setEstado] = useState("");
  const [gestiones, setGestiones] = useState([]);
  const [buscado, setBuscado] = useState(false);

  const handleBuscar = async () => {
    if (!dni.trim() || !estado.trim()) {
      alert("Completá el DNI y el estado");
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
    <>
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
          className="me-2"
        >
          <option value="">Seleccionar estado...</option>
          <option value="solucionado">Solucionado</option>
          <option value="derivado">Derivado</option>
        </Form.Select>
        <Button onClick={handleBuscar}>Buscar</Button>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  No hay gestiones que coincidan
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BuscadorFiltro;