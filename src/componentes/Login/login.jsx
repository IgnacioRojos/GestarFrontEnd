import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from "../../services/Api"; // tu instancia de axios

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!username || !password) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { username, password });

      // Guardar token en localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", username);

      alert("Login exitoso!");

      // Redirigir a dashboard u otra página
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </Form>
  );
};

export default Login;