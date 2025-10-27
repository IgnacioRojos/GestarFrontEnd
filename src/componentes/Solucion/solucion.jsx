import { Card, Form } from "react-bootstrap";
import "./solucion.css";

const Solucion = ({ comentario, setComentario }) => {
  return (
    <Card className="mt-3 shadow-sm border-0">
      <Card.Header
        style={{
          backgroundColor: "var(--color-principal)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Solución
      </Card.Header>

      <Card.Body style={{ maxHeight: "160px", overflowY: "auto" }}>
        <Form>
          <Form.Group controlId="solucionTextarea">
            <Form.Control
              as="textarea"
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Solucion;