# Alpha-Ingenuity - Aplicación de Gestión de Tareas

Una aplicación full-stack para gestionar tareas construida con la pila MERN (MongoDB, Express, React, Node.js).

## 📋 Descripción del Proyecto

Alpha-Ingenuity es una aplicación web que permite a los usuarios crear, visualizar, actualizar y eliminar tareas de manera eficiente. Utiliza una arquitectura moderna con un backend robusto y un frontend responsive.

---

## 🏗️ Arquitectura

### Backend
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Runtime**: Node.js
- **Características**:
  - API RESTful
  - Validación de datos
  - Control de errores
  - CORS habilitado

**Estructura Backend**:
```
Backend/
├── config/db.js           # Configuración de conexión a MongoDB
├── controller/            # Lógica de negocio
│   └── task.controller.js
├── models/                # Modelos de datos
│   └── task.model.js
├── routes/                # Rutas de API
│   └── task.route.js
├── server.js              # Punto de entrada
├── .env                   # Variables de entorno
└── package.json
```

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Características**:
  - Interfaz moderna y responsive
  - React Icons para iconografía
  - Hot Module Replacement (HMR)

**Estructura Frontend**:
```
Frontend/
├── public/                # Archivos estáticos
├── src/
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   ├── index.css         # Estilos globales
│   └── assets/
├── index.html            # HTML principal
├── vite.config.js        # Configuración de Vite
├── eslint.config.js      # Configuración de ESLint
└── package.json
```

---

## 🚀 Guía de Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- MongoDB (local o Atlas)

### Paso 1: Clonar y Preparar el Proyecto

```bash
# Navega al directorio del proyecto
cd Alpha-Ingenuity
```

### Paso 2: Configurar el Backend

```bash
# Entra a la carpeta del backend
cd Backend

# Instala las dependencias
npm install
```

**Configura el archivo `.env`**:
```
MONGODB_URI=mongodb://localhost:27017/alpha-ingenuity
PORT=5000
NODE_ENV=development
```

### Paso 3: Configurar el Frontend

```bash
# Desde la raíz del proyecto, entra a Frontend
cd Frontend

# Instala las dependencias
npm install
```

### Paso 4: Ejecutar la Aplicación

#### Opción A: Ejecutar en Modo Desarrollo (Terminales Separadas)

**Terminal 1 - Backend**:
```bash
cd Backend
npm run dev
```
El backend estará disponible en `http://localhost:5000`

**Terminal 2 - Frontend**:
```bash
cd Frontend
npm run dev
```
El frontend estará disponible en `http://localhost:5173`

#### Opción B: Ejecutar en Modo Producción

```bash
# Desde la raíz del proyecto
npm run build
npm start
```

---

## 📦 Dependencias Principales

### Backend
| Dependencia | Versión | Propósito |
|-----------|---------|----------|
| express | ^4.19.2 | Framework web |
| mongoose | ^8.13.2 | ODM para MongoDB |
| cors | ^2.8.5 | Control de CORS |
| dotenv | ^16.4.7 | Variables de entorno |
| nodemon | ^3.1.9 | Recarga automática (dev) |

### Frontend
| Dependencia | Versión | Propósito |
|-----------|---------|----------|
| react | ^19.2.0 | Librería de UI |
| react-dom | ^19.2.0 | Renderizado en DOM |
| tailwindcss | ^4.1.17 | Utilidades CSS |
| vite | ^7.2.4 | Build tool |
| react-icons | ^5.5.0 | Librería de iconos |

---

## 🛠️ Scripts Disponibles

### Backend
```bash
npm run dev      # Ejecutar en modo desarrollo con nodemon
npm start        # Ejecutar en modo producción
npm run build    # Compilar el proyecto completo
```

### Frontend
```bash
npm run dev      # Ejecutar Vite en modo desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecutar ESLint
```

---

## 📡 Endpoints de API

### Tasks (Tareas)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| POST | `/api/tasks` | Crear una nueva tarea |
| GET | `/api/tasks/:id` | Obtener una tarea por ID |
| PUT | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |

---

## 🔧 Troubleshooting

### El backend no conecta a MongoDB
- Verifica que MongoDB esté corriendo
- Comprueba la URI en el archivo `.env`
- Si usas Atlas, asegúrate de que tu IP esté en la whitelist

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en el puerto correcto
- Comprueba que CORS esté habilitado en Express
- Revisa la consola del navegador para errores

### Puerto ya en uso
```bash
# Cambiar puerto del backend en .env
PORT=5001

# Cambiar puerto del frontend en vite.config.js
export default {
  server: {
    port: 5174
  }
}
```

---

## 📝 Notas Adicionales

- El proyecto utiliza ES6 modules (`"type": "module"`)
- Tailwind CSS está configurado para producción
- ESLint está configurado con reglas de React

---

## 👨‍💻 Autor
Felipe Franco

## 📄 Licencia
ISC