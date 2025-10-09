import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DatosClientes from "../componentes/Datos/datosclient";
import Tipi from "../componentes/Tipificacion/tipi";
import Solucion from "../componentes/Solucion/solucion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import api from "../services/Api"; // tu axios configurado

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", role: "" });

  // Estados de los hijos
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
  });
  const [nota, setNota] = useState("");
  const [tipi, setTipi] = useState({ descripcion: "", codigo: "", id: "" });
  const [comentario, setComentario] = useState("");
  const [tipiId, setTipiId] = useState(""); // input local de Tipificación
  const [limpiar, setLimpiar] = useState(false); // trigger para limpiar inputs hijos
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (!username || !role) {
      navigate("/");
    } else {
      setUser({ username, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleCrearContacto = async (estado) => {
    if (!cliente.dni) {
      alert("Debes buscar un cliente antes de continuar");
      return;
    }

    if (estado === "solucionado" && comentario.trim() === "") {
      alert("Debes escribir un comentario antes de solucionar el contacto");
      return;
    }

    if (!tipi.codigo) {
      alert("Debes buscar una tipificación válida antes de continuar");
      return;
    }

    setLoading(true);
    try {
      const contactoCompleto = {
        cliente: cliente.dni,
        agente: user.username,
        motivo: tipi.codigo,
        notas: nota,
        comentario,
        estado
      };

      const res = await api.post("/api/contactos", contactoCompleto);

      alert(`Contacto ${estado} correctamente\nNúmero de gestión: ${res.data.gestionId}`);

      // 🔹 Limpiar campos **después** de crear contacto
      setCliente(prev => ({ ...prev, nombre: "", apellido: "", telefono: "", email: "" }));
      setNota("");
      setTipi({ descripcion: "", codigo: "", id: "" });
      setTipiId("");
      setComentario("");
      setLimpiar(true); // trigger para limpiar input DNI

    } catch (error) {
      console.error("Error al crear contacto:", error.response?.data || error);
      alert(error.response?.data?.message || "No se pudo crear el contacto");
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const isBusqueda = location.pathname.includes("/dashboard/gestiones/buscar") || 
                   location.pathname.includes("/dashboard/gestiones/filtro") || 
                   location.pathname.includes("/dashboard/gestiones/panel");

  return (
    <div className="dashboard container mt-4">
      {/* Barra superior con usuario y botón */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Contactos</h2>
        <div>
          <span className="me-3">
            Usuario: <strong>{user.username}</strong> ({user.role})
          </span>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Menú de opciones */}
      <div className="mb-4 d-flex gap-2">
        <Button onClick={() => navigate("/dashboard/gestiones/buscar")} variant="primary">
          Buscar gestión
        </Button>
        <Button onClick={() => navigate("/dashboard/gestiones/filtro")} variant="secondary">
          Buscar por DNI y estado
        </Button>
        <Button onClick={() => navigate("/dashboard/gestiones/panel")} variant="success">
          Panel supervisores
        </Button>
        <Button onClick={() => navigate("/dashboard")} variant="outline-primary">
          Crear contacto
        </Button>
      </div>

      {/* Contenido principal */}
      {location.pathname.includes("/dashboard/gestiones") ? (
        // 🔹 Si estamos en alguna ruta de búsqueda o panel, mostrar solo Outlet
        <Outlet />
      ) : (
        // 🔹 Si estamos en el Dashboard principal, mostrar creación de contacto
        <>
          <DatosClientes 
            cliente={cliente} 
            setCliente={setCliente} 
            nota={nota} 
            setNota={setNota} 
            limpiar={limpiar}
            setLimpiar={setLimpiar}
          />
          <Tipi 
            tipi={tipi} 
            setTipi={setTipi} 
            tipiId={tipiId} 
            setTipiId={setTipiId} 
            limpiar={limpiar}
            setLimpiar={setLimpiar}
          />
          <Solucion comentario={comentario} setComentario={setComentario} />

          {/* Botones Solucionar / Derivar */}
          <ButtonGroup size="lg" className="mt-3">
            <Button
              disabled={loading}
              onClick={() => handleCrearContacto("solucionado")}
            >
              {loading ? "Cargando..." : "Solucionar"}
            </Button>
            <Button
              disabled={loading}
              onClick={() => handleCrearContacto("derivado")}
            >
              {loading ? "Cargando..." : "Derivar"}
            </Button>
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

export default Dashboard;


/*
 <div className="dashboard container mt-4">
      {/* Barra superior con usuario y botón */
/*      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Contactos</h2>
        <div>
          <span className="me-3">
            Usuario: <strong>{user.username}</strong> ({user.role})
          </span>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

       {/* Menú de opciones */
    
 /*     <div className="mb-4 d-flex gap-2">
        <Button onClick={() => navigate("/dashboard/gestiones/buscar")} variant="primary">Buscar gestión</Button>
        <Button onClick={() => navigate("/dashboard/gestiones/filtro")} variant="secondary">Buscar por DNI y estado</Button>
        <Button onClick={() => navigate("/dashboard/gestiones/panel")} variant="success">Panel supervisores</Button>
      </div>
      <Outlet/>

      {/* Componentes hijos */
 /*     <DatosClientes 
        cliente={cliente} 
        setCliente={setCliente} 
        nota={nota} 
        setNota={setNota} 
        limpiar={limpiar}
        setLimpiar={setLimpiar}
      />
      <Tipi 
        tipi={tipi} 
        setTipi={setTipi} 
        tipiId={tipiId} 
        setTipiId={setTipiId} 
        limpiar={limpiar}
      />
      <Solucion comentario={comentario} setComentario={setComentario} />

      {/* Botones Solucionar / Derivar */
/*      <ButtonGroup size="lg" className="mt-3">
        <Button
          disabled={loading}
          onClick={() => handleCrearContacto("solucionado")}
        >
          Solucionar
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleCrearContacto("derivado")}
        >
          Derivar
        </Button>
      </ButtonGroup>
    </div> */