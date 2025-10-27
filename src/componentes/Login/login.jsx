import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { Eye, EyeOff } from "lucide-react"; 
import api from "../../services/Api";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showModalMessage("Error", "Completa todos los campos", false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", username);

      showModalMessage("Bienvenido", "Login exitoso!", true);
    } catch (err) {
      console.error(err);
      showModalMessage("Error", "Usuario o contraseña incorrecta", false);
    } finally {
      setLoading(false);
    }
  };

  const showModalMessage = (title, message, success) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalSuccess(success);
    setShowModal(true);

    // Cierra automáticamente el modal después de 2 segundos
    setTimeout(() => {
      setShowModal(false);
      if (success) {
        navigate("/dashboard");
      }
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            disabled={loading}
            className="w-100 login-button"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </Form>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
