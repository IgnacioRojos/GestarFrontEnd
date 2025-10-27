
# 🚀 GDC Front End

**GDC Front End** es la interfaz web desarrollada en **React JS** para el sistema de gestión de reclamos, consultas y solicitudes de clientes.  
Forma parte del ecosistema **Gestar**, compuesto por un backend en Node.js y MongoDB ([Gestar Back End](https://github.com/IgnacioRojos/GestarBackEnd.git)).

---

## 📋 Descripción del proyecto

El sistema **Gestar** permite registrar, administrar y dar seguimiento a los distintos contactos realizados con los clientes (reclamos, solicitudes y consultas).  
Desde el portal principal, los usuarios pueden autenticarse mediante un **login** y acceder a diferentes funcionalidades según su rol.

Dependiendo del tipo de usuario logueado, se habilitan distintas vistas y acciones, como:

- 🧾 **Registro de reclamos, consultas y solicitudes**.  
- ⚙️ **Derivación de casos** a sectores internos para su resolución.  
- ✅ **Gestión y seguimiento** de los contactos generados.  
- 🔍 **Resolución inmediata** de consultas según la categoría del caso.

La aplicación se comunica directamente con el backend mediante peticiones **HTTP** usando **Axios**, interactuando con la API alojada en:  
👉 [https://gestarbackend-production.up.railway.app/](https://gestarbackend-production.up.railway.app/)

---

## 🧠 Tecnologías utilizadas

- ⚛️ **React JS** – Biblioteca principal para la interfaz.  
- ⚡ **Vite** – Entorno de desarrollo rápido y optimizado.  
- 🎨 **Bootstrap** – Framework CSS para un diseño responsive.  
- 🌐 **Axios** – Cliente HTTP para la comunicación con la API.  
- 🧭 **React Router DOM** – Navegación entre vistas.  

---

## 🧩 Estructura principal del proyecto

```
GestarFrontEnd/
│
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Páginas principales (Login, Dashboard, etc.)
│   ├── services/        # Configuración de Axios y llamadas a la API
│   ├── router/          # Rutas protegidas y públicas
│   ├── App.jsx          # Componente raíz
│   └── main.jsx         # Punto de entrada
│
├── public/
│
├── package.json
└── vite.config.js
```

---

## 🔐 Usuario de prueba

Puedes iniciar sesión con el siguiente usuario de prueba:

```
como supervisor:

USUARIO: ignacio  
CONTRASEÑA: 123456

como agente:

USUARIO: martin
contraseña: Ignacio1920


```



---
## 🏷️ Tipificaciones disponibles

Las **tipificaciones** son los códigos que identifican el motivo de la consulta de un cliente.  
A continuación se listan las tipificaciones actualmente registradas en la base de datos:

| Código | Descripción                              |
|:-------:|-------------------------------------------|
| 507     | Consulta sobre pago de la tarjeta de crédito |
| 838     | Reclamo por servicio mal cobrado          |
| 1999    | Solicitud de baja                         |
| 1223    | Solicitud de stop debit por fraude         |
| 480     | Consulta por resumen                      |
| 100     | Consulta general del producto             |

## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/IgnacioRojos/GestarFrontEnd.git
   cd GestarFrontEnd
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:
   ```env
   VITE_API_URL=https://gestarbackend-production.up.railway.app
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación se abrirá en:  
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🔗 Conexión con el Back End

Este front end consume la API desarrollada en el proyecto [**GDC Back End**](https://github.com/IgnacioRojos/GestarBackEnd.git), donde se encuentran definidas las rutas para:

- Autenticación de usuarios  
- Gestión de reclamos, solicitudes y consultas  
- Derivaciones internas  
- Resolución de casos  

---

## 📸 Capturas 

Login:
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/42f37ff0-bf75-4abb-8211-a3dca7241144" />

dasboard agente:
<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/c59f3240-f6e0-4e09-b84b-29e78d5c501a" />

buscador de gestiones:
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/a9d62e3b-01f1-4108-b7c6-6c8716122337" />

crear cliente:
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/2fd052bc-4426-45d2-9a6f-5446afe7b565" />



dashboard supervisor:
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/40c2e0ba-fab4-47ba-9fd8-cd3f983e04fc" />


> *(Podés agregar imágenes del login, dashboard o gestión de reclamos aquí para mejorar la presentación del repositorio.)*

---

## 👨‍💻 Autor

Desarrollado por **Ignacio Rojos**  
📧 [nachorojos99@gmail.com](mailto:nachorojos99@gmail.com)  
💼 [GitHub](https://github.com/IgnacioRojos)
