import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../services/Api"; // Axios configurado

const PanelSupervisores = () => {
  const [supervisor, setSupervisor] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", password: "", role: "agente" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setSupervisor(username);
    fetchUsuarios();
  }, []);

    const fetchUsuarios = async () => {
        try {
            const res = await api.get("/api/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Usuarios:", res.data);
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.username || !nuevoUsuario.password) {
      alert("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", nuevoUsuario, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      setNuevoUsuario({ username: "", password: "", role: "agente" });
      fetchUsuarios();
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

    
  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
        await api.delete(`/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        alert("Usuario eliminado");
        fetchUsuarios(); // refrescar la lista
    } catch (error) {
        alert(error.response?.data?.message || "Error al eliminar usuario");
    }
   };

  return (
    <div className="panel-supervisores container mt-4">
      <h2>Panel de Supervisores</h2>
      <p>
        Supervisor logeado: <strong>{supervisor}</strong>
      </p>

      {/* Crear nuevo usuario */}
      <div className="mb-4">
        <h4>Crear nuevo usuario</h4>
        <Form onSubmit={handleCrearUsuario}>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={nuevoUsuario.role}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}
            >
              <option value="agente">Agente</option>
              <option value="supervisor">Supervisor</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Usuario"}
          </Button>
        </Form>
      </div>

      {/* Lista de usuarios */}
      <div>
        <h5>Usuarios existentes</h5>
        <ul>
            {usuarios.map((u) => (
                <li key={u._id || u.username}>
                {u.username} - {u.role} 
                <button onClick={() => handleEliminarUsuario(u._id || u.username)}>
                    Eliminar
                </button>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PanelSupervisores;