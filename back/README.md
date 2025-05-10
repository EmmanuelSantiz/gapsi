# Gapsi e-Commerce - Backend de Gestión de Proveedores

Este proyecto implementa el backend para el sistema de gestión de proveedores de Gapsi e-Commerce, desarrollado con Node.js y Express.

## Descripción

El backend proporciona una API RESTful para la gestión completa de proveedores, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y funcionalidades avanzadas como paginación.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript
- **Express**: Framework web para Node.js
- **TypeScript**: Superset tipado de JavaScript
- **Arquitectura en Capas**: Implementación de patrón repositorio y servicios

## Estructura del Proyecto

```
/back
├── config/             # Configuración de la aplicación y conexión a BD
├── controllers/        # Controladores de la API
├── domain/
│   ├── dto/            # Objetos de transferencia de datos
│   └── models/         # Modelos de dominio
├── middleware/         # Middleware de Express
├── repository/
│   └── interfaces/     # Interfaces de repositorios
├── routes/             # Definición de rutas de la API
├── services/           # Servicios de negocio
└── utils/              # Utilidades y helpers
```

## Características Principales

- **API RESTful**: Endpoints para gestión completa de proveedores
- **Paginación**: Soporte para paginación en consultas de listado
- **Validación de Datos**: Validación de entrada para garantizar integridad
- **Manejo de Errores**: Sistema robusto de manejo de excepciones
- **Arquitectura Escalable**: Diseño en capas para facilitar mantenimiento y extensión

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/gapsi/ecommerce-proveedores.git
   cd ecommerce-proveedores/back
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con la configuración adecuada
   ```

4. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## API Endpoints

### Proveedores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proveedores` | Obtener lista de proveedores (con paginación) |
| GET | `/api/proveedores/:id` | Obtener un proveedor por ID |
| POST | `/api/proveedores` | Crear un nuevo proveedor |
| PUT | `/api/proveedores/:id` | Actualizar un proveedor existente |
| DELETE | `/api/proveedores/:id` | Eliminar un proveedor |

### Parámetros de Paginación

Para el endpoint `GET /api/proveedores`, se pueden utilizar los siguientes parámetros de consulta:

- `page`: Número de página (por defecto: 1)
- `limit`: Elementos por página (por defecto: 10)

Ejemplo: `/api/proveedores?page=2&limit=15`

## Modelo de Datos

### Proveedor

```typescript
{
  id: number;
  nombre: string;
  razonSocial: string;
  rfc: string;
  direccion: string;
  contacto: string;
  correo: string;
  telefono: string;
  categoria: string;
  estado: boolean;
  notas?: string;
  fechaRegistro: Date;
}
```

## Respuesta Paginada

```typescript
{
  result: boolean;
  data: {
    items: Proveedor[];
    meta: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
    }
  }
}
```

## Desarrollo

### Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con hot-reload
- `npm run build`: Compila el proyecto TypeScript
- `npm start`: Inicia el servidor en modo producción
- `npm test`: Ejecuta las pruebas
- `npm run lint`: Ejecuta el linter

## Contribución

1. Crear una rama para la nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
2. Realizar cambios y pruebas
3. Enviar un Pull Request a la rama principal

## Licencia

Este proyecto es propiedad de Gapsi e-Commerce y su uso está restringido a los términos establecidos por la empresa.