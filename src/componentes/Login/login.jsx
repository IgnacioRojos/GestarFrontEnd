// src/componentes/Login/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../services/Api"; // nuestra instancia de Axios configurada

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
      // Request al backend usando api.js
      const res = await api.post("/api/auth/login", { username, password });

      // Guardar token y datos del usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", username);

      alert("Login exitoso!");
      navigate("/dashboard"); // Redirigir al dashboard

    } catch (err) {
      console.error(err);
      alert("Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px", marginTop: "50px" }}>
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
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading} className="w-100">
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </Form>
  );
};

export default Login;