import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Gestiones = () => {
  return (
    <Container className="mt-4">
      <h2>Gestiones</h2>
      <Outlet /> {/* Aquí se renderizan las páginas hijas */}
    </Container>
  );
};

export default Gestiones;