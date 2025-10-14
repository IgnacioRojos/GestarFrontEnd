import { useState, useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import api from "../../services/Api";
import "./tipi.css"

const Tipi = ({ tipi, setTipi, tipiId, setTipiId, limpiar }) => {
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!tipiId.trim()) return;

    setLoading(true);
    try {
      const res = await api.get(`/api/tipificacion/${tipiId.trim()}`);
      setTipi({
        descripcion: res.data.descripcion,
        codigo: res.data.codigo,
      });
    } catch (error) {
      console.error(error);
      alert("Tipificación no encontrada");
      setTipi({ descripcion: "", codigo: "" });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Limpiar input y tipificación cuando se genere contacto exitoso
  useEffect(() => {
    if (limpiar) {
      setTipi({ descripcion: "", codigo: "" });
      setTipiId("");
    }
  }, [limpiar, setTipi, setTipiId]);

  return (
    <Card className="mt-3 shadow-sm border-0">
      <Card.Header
        style={{
          backgroundColor: "var(--color-principal)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Tipificación
      </Card.Header>

      <Card.Body style={{ maxHeight: "160px", overflowY: "auto" }}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="formTipiId">
              <Form.Label>ID Tipificación</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={tipiId}
                  onChange={(e) => setTipiId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                />
                <Button
                  variant="primary"
                  className="ms-2"
                  onClick={handleBuscar}
                  disabled={!tipiId || loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
            </Form.Group>

            <Form.Group as={Col} md="7" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={tipi.descripcion} readOnly />
            </Form.Group>

          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Tipi;