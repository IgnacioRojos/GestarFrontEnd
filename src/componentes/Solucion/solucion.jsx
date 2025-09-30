import Form from "react-bootstrap/Form";

const Solucion = ({ comentario, setComentario }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="solucionTextarea">
        <Form.Label>Solución</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Solucion;