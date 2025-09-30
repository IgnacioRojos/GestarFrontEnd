import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import api from "../../services/Api"; // instancia de axios

const DatosClientes = () => {
  const [dni, setDni] = useState("");
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });
  const [nota, setNota] = useState(""); // estado para la nota

  const handleBuscar = async () => {
    try {
      const res = await api.get(`/api/clientes/${dni}`);
      setCliente(res.data);
      // Guardar ID opcional para usar en otros componentes
      localStorage.setItem("clienteId", res.data._id);
    } catch (error) {
      console.error(error);
      alert("Cliente no encontrado");
      setCliente({ nombre: "", apellido: "", telefono: "", email: "" });
    }
  };

  return (
    <>
      {/* DNI */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={handleBuscar}
          disabled={!dni}
        >
          Buscar
        </Button>
      </InputGroup>

      {/* Datos del cliente */}
      <InputGroup className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control value={cliente.nombre} readOnly />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Label>Apellido</Form.Label>
        <Form.Control value={cliente.apellido} readOnly />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control value={cliente.telefono} readOnly />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control value={cliente.email} readOnly />
      </InputGroup>

      {/* Nota */}
      <Form.Group className="mb-3">
        <Form.Label>Nota</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </Form.Group>
    </>
  );
};

export default DatosClientes;