import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import api from "../services/Api";
import "../styles/buscador.css"

const Buscador = () => {
  const [gestionId, setGestionId] = useState("");
  const [gestiones, setGestiones] = useState([]);
  const [buscado, setBuscado] = useState(false); // 🔹 nuevo estado

  const handleBuscar = async () => {
    if (!gestionId.trim()) return alert("Ingresá un número de gestión");

    try {
      const res = await api.get(`/api/contactos/${gestionId}`);
      // Si la API devuelve un solo objeto, lo pasamos a array para mapearlo
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setGestiones(data);
    } catch (error) {
      setGestiones([]);
      //alert("No se encontraron gestiones");
    } finally {
      setBuscado(true); // 🔹 marca que se realizó una búsqueda
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
        <Button onClick={handleBuscar}>Buscar</Button>
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
    </div>
  );
};

export default Buscador;