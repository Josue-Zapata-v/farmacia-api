# 💊 Farmacia API REST

API REST para la gestión de operaciones de una empresa farmacéutica. Permite administrar medicamentos, laboratorios, órdenes de compra y venta, con autenticación JWT y control de acceso basado en roles.

---

## 🚀 Demo en producción

| Recurso | URL |
|---|---|
| **API Pública** | [https://farmacia-api-6nhv.onrender.com](https://farmacia-api-6nhv.onrender.com) |

> ⚠️ El servicio está desplegado en Render (plan gratuito). La primera petición puede tardar hasta 60 segundos si el servidor estuvo inactivo.

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| ORM | Sequelize v6 |
| Base de datos | MySQL |
| Autenticación | JSON Web Tokens (JWT) |
| Encriptación | bcryptjs |
| Despliegue API | Render |
| Despliegue DB | Railway |

---

## ☁️ Infraestructura de Despliegue

```
┌─────────────────────┐        ┌──────────────────────┐
│      RENDER         │        │      RAILWAY         │
│  (Node.js API)      │◄──────►│   (MySQL Database)   │
│  farmacia-api       │        │   turntable.proxy    │
│  .onrender.com      │        │   .rlwy.net:55060    │
└─────────────────────┘        └──────────────────────┘
```

- **Render** aloja el servidor Node.js/Express
- **Railway** aloja la base de datos MySQL en la nube
- La comunicación entre ambos usa el host público de Railway

---

## 📁 Estructura del Proyecto

```
farmacia-api/
├── index.js
├── nodemon.json
├── package.json
├── .env
└── src/
    ├── app.js
    ├── config/
    │   └── database.js
    ├── models/
    │   ├── index.js
    │   ├── Usuario.js
    │   ├── Medicamento.js
    │   ├── Especialidad.js
    │   ├── TipoMedicamento.js
    │   ├── Laboratorio.js
    │   ├── OrdenCompra.js
    │   ├── DetalleOrdenCompra.js
    │   ├── OrdenVenta.js
    │   └── DetalleOrdenVenta.js
    ├── controllers/
    │   ├── authController.js
    │   ├── medicamentoController.js
    │   ├── laboratorioController.js
    │   ├── ordenCompraController.js
    │   ├── ordenVentaController.js
    │   ├── especialidadController.js
    │   └── tipoMedicamentoController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── medicamentoRoutes.js
    │   ├── laboratorioRoutes.js
    │   ├── ordenCompraRoutes.js
    │   ├── ordenVentaRoutes.js
    │   ├── especialidadRoutes.js
    │   └── tipoMedicamentoRoutes.js
    └── middlewares/
        ├── auth.js
        └── roles.js
```

---

## ⚙️ Instalación y Configuración Local

### Prerrequisitos

- Node.js v18+
- MySQL corriendo localmente (XAMPP o similar)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/farmacia-api.git
cd farmacia-api

# 2. Instalar dependencias
npm install

# 3. Crear base de datos en MySQL
# Ejecutar en tu cliente MySQL:
# CREATE DATABASE farmacia_db;

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 5. Iniciar en modo desarrollo
npm run dev
```

### Variables de entorno (.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=farmacia_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=mi_clave_secreta_muy_segura_2024
JWT_EXPIRES_IN=24h
```

---

## 🔐 Seguridad y Roles

### Roles disponibles

| Rol | Permisos |
|---|---|
| `ADMIN` | Acceso total a todos los endpoints |
| `VENDEDOR` | Acceso a ventas y consulta de medicamentos |
| `ALMACEN` | Acceso a compras, laboratorios y consulta de medicamentos |

### Flujo de autenticación

```
1. POST /api/auth/register  →  Crear cuenta
2. POST /api/auth/login     →  Obtener token JWT
3. Enviar token en header:  →  Authorization: Bearer <token>
```

---

## 📡 Endpoints Disponibles

| Módulo | Método | Ruta | Rol requerido |
|---|---|---|---|
| Auth | POST | `/api/auth/register` | Público |
| Auth | POST | `/api/auth/login` | Público |
| Medicamentos | GET | `/api/medicamentos` | Cualquier rol |
| Medicamentos | GET | `/api/medicamentos/:id` | Cualquier rol |
| Medicamentos | POST | `/api/medicamentos` | ADMIN, ALMACEN |
| Medicamentos | PUT | `/api/medicamentos/:id` | ADMIN, ALMACEN |
| Medicamentos | DELETE | `/api/medicamentos/:id` | ADMIN |
| Laboratorios | GET | `/api/laboratorios` | Cualquier rol |
| Laboratorios | POST | `/api/laboratorios` | ADMIN, ALMACEN |
| Laboratorios | PUT | `/api/laboratorios/:id` | ADMIN, ALMACEN |
| Laboratorios | DELETE | `/api/laboratorios/:id` | ADMIN |
| Compras | GET | `/api/compras` | ADMIN, ALMACEN |
| Compras | GET | `/api/compras/:id` | ADMIN, ALMACEN |
| Compras | POST | `/api/compras` | ADMIN, ALMACEN |
| Ventas | GET | `/api/ventas` | ADMIN, VENDEDOR |
| Ventas | GET | `/api/ventas/:id` | ADMIN, VENDEDOR |
| Ventas | POST | `/api/ventas` | ADMIN, VENDEDOR |
| Ventas | PUT | `/api/ventas/:id` | ADMIN, VENDEDOR |
| Especialidades | GET | `/api/especialidades` | Cualquier rol |
| Especialidades | POST | `/api/especialidades` | ADMIN |
| Especialidades | PUT | `/api/especialidades/:id` | ADMIN |
| Especialidades | DELETE | `/api/especialidades/:id` | ADMIN |
| Tipos | GET | `/api/tipos` | Cualquier rol |
| Tipos | POST | `/api/tipos` | ADMIN |
| Tipos | PUT | `/api/tipos/:id` | ADMIN |
| Tipos | DELETE | `/api/tipos/:id` | ADMIN |

---

## 🧪 Casos de Prueba — Postman

> Base URL local: `http://localhost:3000`
> Base URL producción: `https://farmacia-api-6nhv.onrender.com`

---

### 🔑 AUTENTICACIÓN

---

#### Caso 01 — Registrar usuario

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/auth/register` |
| **Descripción** | Registra un nuevo usuario en el sistema. El campo `rol` acepta: `ADMIN`, `VENDEDOR`, `ALMACEN`. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
    "nombre": "Administrador josue",
    "email": "adminjosue@farmacia.com",
    "password": "admin123",
    "rol": "ADMIN"
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Usuario registrado correctamente.",
    "usuario": {
        "id": 1,
        "nombre": "Administrador josue",
        "email": "adminjosue@farmacia.com",
        "rol": "ADMIN"
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="450" alt="Registro de usuario" src="https://github.com/user-attachments/assets/48034789-1cf3-4f12-a9b6-114d943a1638" />
</p>

---

#### Caso 02 — Iniciar sesión y obtener token JWT

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/auth/login` |
| **Descripción** | Autentica al usuario con email y contraseña. Retorna un token JWT que debe usarse en los headers de las rutas protegidas. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
    "email": "adminjosue@farmacia.com",
    "password": "admin123"
}
```

**Respuesta esperada — `200 OK`:**
```json
{
    "message": "Login exitoso.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
        "id": 1,
        "nombre": "Administrador josue",
        "email": "adminjosue@farmacia.com",
        "rol": "ADMIN"
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="437" alt="Login exitoso" src="https://github.com/user-attachments/assets/3defdeb5-37b5-4415-8edd-c83afa82ad6c" />
</p>

---

#### Caso 03 — Acceder sin token (debe fallar)

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/medicamentos` |
| **Descripción** | Intento de acceso a una ruta protegida sin proporcionar el token JWT. El sistema debe rechazar la petición. |
| **Autenticación** | Ninguna (sin header Authorization) |

**Body (JSON):**
```json
{
    "descripcionMed": "Paracetamol 500mg",
    "stock": 100,
    "precioVentaUni": 0.50
}
```

**Respuesta esperada — `401 Unauthorized`:**
```json
{
    "message": "Acceso denegado. Token no proporcionado."
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="322" alt="Acceso sin token" src="https://github.com/user-attachments/assets/6b98b8d0-24c9-4ab3-98e3-ed41b30433d5" />
</p>

---

### 🛡️ AUTORIZACIÓN POR ROLES

---

#### Caso 04 — Acceder con rol correcto

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/compras` |
| **Descripción** | Un usuario con rol `ALMACEN` accede a una ruta de compras que le corresponde. El sistema debe permitir el acceso. |
| **Autenticación** | `Bearer <token_ALMACEN>` |

**Body (JSON):**
```json
{
    "fechaEmision": "2025-05-06",
    "Situacion": "PENDIENTE",
    "CodLab": 1,
    "detalles": [
        {
            "CodMedicamento": 1,
            "descripcion": "Paracetamol 500mg x50",
            "cantidad": 50,
            "precio": 0.30
        }
    ]
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Orden de compra registrada correctamente.",
    "orden": { ... }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="480" alt="Acceso con rol correcto" src="https://github.com/user-attachments/assets/3eb84d33-300c-48b1-ae95-9159b65b3412" />
</p>

---

#### Caso 05 — Acceder con rol incorrecto (debe fallar)

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/compras` |
| **Descripción** | Un usuario con rol `VENDEDOR` intenta registrar una orden de compra, acción que está restringida solo a `ADMIN` y `ALMACEN`. El sistema debe rechazar la petición. |
| **Autenticación** | `Bearer <token_VENDEDOR>` |

**Body (JSON):**
```json
{
    "fechaEmision": "2025-05-06",
    "CodLab": 1,
    "detalles": [
        {
            "CodMedicamento": 1,
            "cantidad": 10,
            "precio": 0.30
        }
    ]
}
```

**Respuesta esperada — `403 Forbidden`:**
```json
{
    "message": "Acceso denegado. Se requiere uno de estos roles: ADMIN, ALMACEN"
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="370" alt="Acceso con rol incorrecto" src="https://github.com/user-attachments/assets/f5009242-90c6-4306-8938-6b2d7bf8fee2" />
</p>

---

### 💊 MEDICAMENTOS

---

#### Caso 06 — Crear medicamento

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/medicamentos` |
| **Descripción** | Registra un nuevo medicamento en el sistema con todos sus datos. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "descripcionMed": "Paracetamol 500mg",
    "fechaFabricacion": "2024-01-01",
    "fechaVencimiento": "2026-01-01",
    "Presentacion": "Tabletas",
    "stock": 100,
    "precioVentaUni": 0.50,
    "precioVentaPres": 5.00,
    "Marca": "Genérico"
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Medicamento creado correctamente.",
    "medicamento": {
        "CodMedicamento": 1,
        "descripcionMed": "Paracetamol 500mg",
        "stock": 100,
        ...
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="576" height="435" alt="Crear medicamento" src="https://github.com/user-attachments/assets/c964a52c-670c-4a44-bd46-256f1d839e3b" />
</p>

---

#### Caso 07 — Listar medicamentos

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/medicamentos` |
| **Descripción** | Retorna la lista completa de medicamentos registrados, incluyendo tipo y especialidad asociada. |
| **Autenticación** | `Bearer <token>` |

**Body:** No aplica

**Respuesta esperada — `200 OK`:**
```json
{
    "total": 2,
    "medicamentos": [
        {
            "CodMedicamento": 1,
            "descripcionMed": "Paracetamol 500mg",
            "stock": 100,
            ...
        }
    ]
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="494" alt="Listar medicamentos" src="https://github.com/user-attachments/assets/672f3c94-6667-4dd2-b3fd-db3113ef1994" />
</p>

---

#### Caso 08 — Actualizar medicamento

| Campo | Detalle |
|---|---|
| **Método** | `PUT` |
| **Ruta** | `/api/medicamentos/:id` |
| **Descripción** | Actualiza los datos de un medicamento existente por su ID. Solo se actualizan los campos enviados en el body. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "precioVentaUni": 0.75,
    "stock": 150
}
```

**Respuesta esperada — `200 OK`:**
```json
{
    "message": "Medicamento actualizado correctamente.",
    "medicamento": {
        "CodMedicamento": 1,
        "precioVentaUni": "0.75",
        "stock": 150,
        ...
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="505" alt="Actualizar medicamento" src="https://github.com/user-attachments/assets/6ddebae9-e50c-44fb-bf9c-e9f23101c75f" />
</p>

---

#### Caso 09 — Eliminar medicamento (solo ADMIN)

| Campo | Detalle |
|---|---|
| **Método** | `DELETE` |
| **Ruta** | `/api/medicamentos/:id` |
| **Descripción** | Elimina un medicamento del sistema. Solo disponible para el rol `ADMIN`. No se puede eliminar si tiene órdenes asociadas. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body:** No aplica

**Respuesta esperada — `200 OK`:**
```json
{
    "message": "Medicamento eliminado correctamente."
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="347" alt="Eliminar medicamento" src="https://github.com/user-attachments/assets/600b002c-7040-48f8-8cc4-16820f299170" />
</p>

---

### 🛒 COMPRAS

---

#### Caso 10 — Registrar orden de compra

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/compras` |
| **Descripción** | Registra una orden de compra a un laboratorio con su detalle. Al registrarse, el stock de cada medicamento incluido se incrementa automáticamente con la cantidad comprada. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "fechaEmision": "2025-05-06",
    "Situacion": "PENDIENTE",
    "CodLab": 1,
    "detalles": [
        {
            "CodMedicamento": 1,
            "descripcion": "Paracetamol 500mg x100",
            "cantidad": 50,
            "precio": 0.30
        }
    ]
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Orden de compra registrada correctamente.",
    "orden": {
        "NroOrdenC": 1,
        "fechaEmision": "2025-05-06",
        "Total": "15.00",
        ...
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="519" alt="Registrar orden de compra" src="https://github.com/user-attachments/assets/72ab9443-1e01-45a2-8c10-c5c8ff2096be" />
</p>

---

#### Caso 11 — Verificar que el stock aumentó tras la compra

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/medicamentos/:id` |
| **Descripción** | Consulta el medicamento para verificar que su stock se incrementó automáticamente luego de registrar la orden de compra. |
| **Autenticación** | `Bearer <token>` |

**Body:** No aplica

**Respuesta esperada — `200 OK`:**
```json
{
    "medicamento": {
        "CodMedicamento": 1,
        "descripcionMed": "Paracetamol 500mg",
        "stock": 200,
        ...
    }
}
```

> Stock anterior: `150` → Stock después de compra (+50): `200`

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="479" alt="Stock aumentó tras compra" src="https://github.com/user-attachments/assets/af6ff087-3b9e-4c10-94dd-af0cbb0f94cd" />
</p>

---

### 💰 VENTAS

---

#### Caso 12 — Registrar venta con stock suficiente

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/ventas` |
| **Descripción** | Registra una orden de venta. El sistema valida que haya stock disponible antes de confirmar. Al registrarse, el stock del medicamento se descuenta automáticamente. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "fechaEmision": "2025-05-06",
    "Motivo": "Venta mostrador",
    "Situacion": "COMPLETADA",
    "detalles": [
        {
            "CodMedicamento": 1,
            "cantidadRequerida": 10
        }
    ]
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Orden de venta registrada correctamente.",
    "orden": {
        "NroOrdenVta": 1,
        "fechaEmision": "2025-05-06",
        "Motivo": "Venta mostrador",
        ...
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="492" alt="Registrar venta" src="https://github.com/user-attachments/assets/a11d2fee-f10c-4ed9-be69-cb87443283fb" />
</p>

---

#### Caso 13 — Registrar venta sin stock (debe fallar)

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/ventas` |
| **Descripción** | Intento de registrar una venta con una cantidad mayor al stock disponible. El sistema debe rechazar la operación con un mensaje descriptivo. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "fechaEmision": "2025-05-06",
    "Motivo": "Venta mayorista",
    "detalles": [
        {
            "CodMedicamento": 1,
            "cantidadRequerida": 99999
        }
    ]
}
```

**Respuesta esperada — `400 Bad Request`:**
```json
{
    "message": "Stock insuficiente para \"Paracetamol 500mg\". Stock disponible: 150, cantidad solicitada: 99999."
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="339" alt="Venta sin stock suficiente" src="https://github.com/user-attachments/assets/f6dc7bbc-64d4-41fe-9359-cf28e1233d8d" />
</p>

---

#### Caso 14 — Verificar que el stock disminuyó tras la venta

| Campo | Detalle |
|---|---|
| **Método** | `GET` |
| **Ruta** | `/api/medicamentos/:id` |
| **Descripción** | Consulta el medicamento para verificar que su stock se decrementó automáticamente luego de registrar la orden de venta. |
| **Autenticación** | `Bearer <token>` |

**Body:** No aplica

**Respuesta esperada — `200 OK`:**
```json
{
    "medicamento": {
        "CodMedicamento": 1,
        "descripcionMed": "Paracetamol 500mg",
        "stock": 190,
        ...
    }
}
```

> Stock anterior: `200` → Stock después de venta (-10): `190`

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="465" alt="Stock disminuyó tras venta" src="https://github.com/user-attachments/assets/647511a1-a861-4030-9498-a941628864c7" />
</p>

---

### 🏥 ESPECIALIDADES Y TIPOS

---

#### Caso 15 — Crear especialidad

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/especialidades` |
| **Descripción** | Registra una nueva especialidad médica en el sistema. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "descripcionEsp": "Cardiología"
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Especialidad creada correctamente.",
    "especialidad": {
        "CodEspec": 1,
        "descripcionEsp": "Cardiología"
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="373" alt="Crear especialidad" src="https://github.com/user-attachments/assets/55952e9f-e615-420d-b895-940e2e742dfe" />
</p>

---

#### Caso 16 — Crear tipo de medicamento

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/tipos` |
| **Descripción** | Registra un nuevo tipo de medicamento en el sistema. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "descripcion": "Analgésico"
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Tipo de medicamento creado correctamente.",
    "tipo": {
        "CodTipoMed": 1,
        "descripcion": "Analgésico"
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="385" alt="Crear tipo de medicamento" src="https://github.com/user-attachments/assets/b5390366-5b5f-4ffd-9c41-ba50f4bccd1e" />
</p>

---

#### Caso 17 — Crear medicamento con tipo y especialidad

| Campo | Detalle |
|---|---|
| **Método** | `POST` |
| **Ruta** | `/api/medicamentos` |
| **Descripción** | Registra un medicamento asociándolo a un tipo de medicamento y una especialidad médica existentes. |
| **Autenticación** | `Bearer <token_ADMIN>` |

**Body (JSON):**
```json
{
    "descripcionMed": "Ibuprofeno 400mg",
    "stock": 200,
    "precioVentaUni": 0.80,
    "Marca": "Genérico",
    "CodTipoMed": 1,
    "CodEspec": 1
}
```

**Respuesta esperada — `201 Created`:**
```json
{
    "message": "Medicamento creado correctamente.",
    "medicamento": {
        "CodMedicamento": 2,
        "descripcionMed": "Ibuprofeno 400mg",
        "stock": 200,
        "TipoMedicamento": { "descripcion": "Analgésico" },
        "Especialidad": { "descripcionEsp": "Cardiología" },
        ...
    }
}
```

📸 _Captura de Postman:_

<p align="center">
  <img width="643" height="444" alt="Medicamento con tipo y especialidad" src="https://github.com/user-attachments/assets/ca2bb682-a551-4cf9-9df7-2080aa49d978" />
</p>

---

## 📌 Notas adicionales

- Las contraseñas se almacenan encriptadas con **bcryptjs** (salt rounds: 10).
- Todas las operaciones de compra y venta usan **transacciones de base de datos** para garantizar consistencia.
- No se puede eliminar un medicamento que tenga órdenes de compra o venta asociadas.
- El token JWT expira en **24 horas**.

---

## 👨‍💻 Autor

Desarrollado como proyecto del curso **Desarrollo de Aplicaciones Web Avanzado** — Instituto Tecsup
