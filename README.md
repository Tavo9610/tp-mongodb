# TP Conexion MONGODB-EXPRESS

API REST construida con **Express** y **MongoDB** que implementa autenticación con **JWT** y sigue el patrón de arquitectura **MVC**. Permite gestionar prendas/textiles asociados a un usuario autenticado.

---

## Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- dotenv
- cors
- express-rate-limit

---

## Estructura del proyecto



```
├── config/
│   └── mongoDbConnection.js
├── controllers/
│   ├── authControllers.js
│   └── wearControllers.js
├── middlewares/
│   ├── authMiddleware.js
│   └── limiterMiddleware.js
├── models/
│   ├── UserModel.js
│   └── WearModel.js
├── routes/
│   ├── authRouter.js
│   └── wearRouter.js
├── .env
├── .env.example
├── app.js
└── README.md
```

---

## Rate Limiting

El endpoint `POST /api/auth/login` tiene protección contra fuerza bruta: máximo **5 intentos cada 15 minutos** por IP. Si se supera ese límite, la API responde con `429 Too Many Requests`.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone 
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env
```

Editá el `.env` con tus datos:

```
PORT=3000
URI_DB=mongodb+srv://depaologustavo_db_user:devdev@cluster0.jmkxwe7.mongodb.net/tpmongo
JWT_SECRET=clave_secreta
```

### 4. Iniciar el servidor

```bash
node app.js
```

El servidor queda disponible en `http://localhost:3000`.

---

## Endpoints

### Autenticación (públicos)

#### `POST /api/auth/register`

Registra un nuevo usuario.

**Body:**
```json
"data": {
  "id": "664f1a2b3c4d5e6f7a8b9c0d",
  "username": "gustavo",
  "email": "gustavo@example.com",
  "createdAt": "...",
  "updatedAt": "...",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta exitosa `201`:**
```json
{
  "success": true,
  "data": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "username": "gustavo",
    "email": "gus@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "User registered successfully"
}
```

> La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial.

---

#### `POST /api/auth/login`

Inicia sesión y devuelve un token JWT.

> Este endpoint tiene rate limiting: máximo 5 intentos cada 15 minutos por IP.

**Body:**
```json
{
  "email": "gus@example.com",
  "password": "Passw0rd!"
}
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

---

### Wearos (privados)

Todos los endpoints de Prendas requieren el header:

```
Authorization: Bearer <token>
```

---

#### `GET /api/wears`

Lista todos las Prendas del usuario autenticado.

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0e",
      "name": "Pantalones",
      "price": 1200,
      "size": "L",
      "stock": 5,
      "available": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "message": "Wears fetched successfully"
}
```

---

#### `GET /api/wears/:id`

Obtiene una Prenda por ID, solo si pertenece al usuario autenticado.

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0e",
    "name": "Pantalones",
    "price": 1200,
    "size": "L",
    "stock": 5,
    "available": true
  },
  "message": "Wear fetched successfully"
}
```

---

#### `POST /api/wears`

Crea una nueva prenda asociada al usuario autenticado.

**Body:**
```json
{
  "name": "Pantalones",
  "price": 1200,
  "size": "Large",
  "stock": 5
}
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0e",
    "name": "Pantalones",
    "price": 1200,
    "size": "Large",
    "stock": 5,
    "available": true
  },
  "message": "Wear created successfully"
}
```

---

#### `PATCH /api/wears/:id`

Actualiza parcialmente una prenda, solo si pertenece al usuario autenticado.

**Body (todos los campos son opcionales):**
```json
{
  "price": 999,
  "stock": 0
}
```

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0e",
    "name": "Pantalones",
    "price": 999,
    "size": "Large",
    "stock": 0,
    "available": false
  },
  "message": "Wear updated successfully"
}
```

---

#### `DELETE /api/wears/:id`

Elimina una prenda, solo si pertenece al usuario autenticado.

**Respuesta exitosa `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0e",
    "name": "Pantalones",
    "price": 1200,
    "size": "Large",
    "stock": 5,
    "available": true
  },
  "message": "Wear deleted successfully"
}
```

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `URI_DB` | URI de conexión a MongoDB | `mongodb://localhost:27017/mi-db` |
| `JWT_SECRET` | Clave secreta para firmar tokens | `mi_clave_secreta` |