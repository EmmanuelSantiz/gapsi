# Gapsi e-Commerce - Sistema de Gestión de Proveedores

Este proyecto implementa un sistema completo para la gestión de proveedores de Gapsi e-Commerce, incluyendo tanto el frontend desarrollado en Angular como el backend en Node.js.

![Gapsi e-Commerce](https://via.placeholder.com/800x400?text=Gapsi+e-Commerce+Proveedores)

## Descripción del Proyecto

Gapsi e-Commerce requería mejorar su formulario de mantenimiento de proveedores en su tienda online, migrando a tecnologías modernas como Angular y Node.js. Este proyecto implementa dicha migración, proporcionando una solución completa que incluye:

- Listado de proveedores con paginación
- Creación de nuevos proveedores
- Edición de proveedores existentes
- Eliminación de proveedores
- Visualización detallada de información

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

```
/
├── back/           # Backend en Node.js
└── front/          # Frontend en Angular
```

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- Arquitectura en capas (Repositorio, Servicio, Controlador)

### Frontend
- Angular
- TypeScript
- Reactive Forms
- Angular Router
- CSS moderno

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Angular CLI (v14 o superior)

## Instalación y Configuración

### Backend

1. Navegar al directorio del backend:
   ```bash
   cd back
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

El servidor estará disponible en `http://localhost:3000`.

### Frontend

1. Navegar al directorio del frontend:
   ```bash
   cd front
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la URL de la API:
   ```bash
   # Editar src/environments/environment.ts
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

La aplicación estará disponible en `http://localhost:4200`.

## Características Principales

- **Diseño Responsivo**: Interfaz adaptable a diferentes dispositivos
- **Validación de Datos**: Validación en tiempo real de formularios
- **Paginación**: Navegación eficiente por grandes conjuntos de datos
- **Arquitectura Escalable**: Diseño modular para facilitar mantenimiento y extensión
- **API RESTful**: Comunicación estandarizada entre frontend y backend

## Documentación

Para más detalles sobre cada parte del proyecto, consulte los README específicos:

- [Documentación del Backend](/back/README.md)
- [Documentación del Frontend](/front/README.md)

## Capturas de Pantalla

### Listado de Proveedores
![Listado de Proveedores](https://via.placeholder.com/800x400?text=Listado+de+Proveedores)

### Formulario de Proveedor
![Formulario de Proveedor](https://via.placeholder.com/800x400?text=Formulario+de+Proveedor)

## Equipo de Desarrollo

Este proyecto fue desarrollado por el equipo de ingeniería de Gapsi e-Commerce.

## Licencia

Este proyecto es propiedad de Gapsi e-Commerce y su uso está restringido a los términos establecidos por la empresa.