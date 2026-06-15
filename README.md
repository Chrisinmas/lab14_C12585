# Lab14 — DiscoStore API

API REST para administrar el catálogo de álbumes de una tienda de música.

## Tecnologías

- Node.js (ES Modules)
- Express
- SQLite (`better-sqlite3`)
- Zod
- dotenv

## Cómo ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/Chrisinmas/Lab14_DiscoStore_C12585.git
cd Lab14_C12585
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

### 4. Poblar la base de datos

```bash
npm run seed
```

### 5. Iniciar el servidor

```bash
npm run dev
```

Disponible en `http://localhost:3000`.

## Rutas

| Método   | Ruta              | Descripción                        | Código        |
|----------|-------------------|------------------------------------|---------------|
| GET      | `/`               | Información del API                | 200           |
| GET      | `/albumes`        | Slugs de todos los álbumes         | 200           |
| GET      | `/album/:slug`    | Álbum completo por slug            | 200 / 404     |
| GET      | `/genero/:genero` | Slugs de álbumes de ese género     | 200           |
| GET      | `/search/:text`   | Busca por título o artista         | 200 / 400     |
| POST     | `/albumes`        | Crea un álbum                      | 201 / 400 / 409 |
| PUT      | `/album/:slug`    | Actualiza un álbum                 | 200 / 400 / 404 |
| DELETE   | `/album/:slug`    | Elimina un álbum                   | 204 / 404     |
| GET      | `/imagenes/*`     | Archivos estáticos                 | 200           |
