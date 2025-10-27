import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../styles/noAutorizado.css"

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="container text-center mt-5">
      <h2>Acceso no autorizado</h2>
      <p>No tenés permiso para ingresar a esta sección.</p>
      <Button variant="primary" onClick={() => navigate("/dashboard")}>
        Volver al panel
      </Button>
    </div>
  );
};
s
export default Unauthorized;
