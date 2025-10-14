import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import api from "../../services/Api";
import "./datosclient.css"

const DatosClientes = ({ cliente, setCliente, nota, setNota, limpiar, setLimpiar }) => {
  const [dni, setDni] = useState("");

  useEffect(() => {
    if (limpiar) {
      setDni(""); // 🔹 Limpiar input DNI
      setNota("");
      setLimpiar(false); // avisar al padre que ya se limpió
    }
  }, [limpiar, setCliente, setNota, setLimpiar]);


  const handleBuscar = async () => {
    if (!dni.trim()) return;
    try {
      const res = await api.get(`/api/clientes/${dni.trim()}`);
      setCliente(res.data);
      localStorage.setItem("clienteId", res.data._id);
    } catch (error) {
      console.error(error);
      alert("Cliente no encontrado");
      setCliente({ nombre: "", apellido: "", telefono: "", email: "", dni: "" });
    }
  };

  return (
    <div className="datos-clientes">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <Button variant="primary" onClick={handleBuscar} disabled={!dni}>
          Buscar
        </Button>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control value={cliente.nombre} readOnly className="formulario" />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label>Apellido:</Form.Label>
        <Form.Control value={cliente.apellido} readOnly className="formulario" />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label>Teléfono:</Form.Label>
        <Form.Control value={cliente.telefono} readOnly className="formulario" />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control value={cliente.email} readOnly className="formulario" />
      </InputGroup>

      <Form.Group className="mb-3">
        <Form.Label>Nota</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </Form.Group>
    </div>
  );
};

export default DatosClientes;
