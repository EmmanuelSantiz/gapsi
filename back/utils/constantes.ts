export class Constantes {
    
    // API version prefix
    static readonly API_VERSION = 'v1';
    
    // Base routes
    static readonly BASE_ROUTE = `/api/${Constantes.API_VERSION}`;
    static readonly NOT_ROUTE  = `/`;
    static readonly BY_ID  = `/:id`;

    // Home routes
    static readonly HOME = {
        BASE: `${Constantes.BASE_ROUTE}/dashboard`,
    };
    
    // Suppliers routes
    static readonly PROVEEDORES = {
        BASE: `${Constantes.BASE_ROUTE}/proveedores`,
    };

    // Security routes
    static readonly SEGURIDAD = {
        BASE: `${Constantes.BASE_ROUTE}/auth`,
        LOGIN: `/login`,
    };

    // Secret 
    static readonly  TOKEN_SECRET = process.env.TOKEN_SECRET || "gapsi-api";
    
    // Health check route
    static readonly HEALTH = '/health';

    // Documentation
    static readonly API_DOC = '/api-docs';

    //Verion app
    static readonly APP_VERSION = '1.0.0';
    
    // Status codes
    static readonly STATUS_CODES = {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    };

    // General messages
    static readonly MESSAGES = {
        SUCCESS: 'Operación exitosa',
        ERROR: 'Error en la operación',
        NOT_FOUND: 'Recurso no encontrado',
        BAD_REQUEST: 'Solicitud incorrecta',
        UNAUTHORIZED: 'No autorizado',
        FORBIDDEN: 'Acceso denegado',
        INTERNAL_SERVER_ERROR: 'Error interno del servidor'
    };

    // API documentation
    static readonly ERROR_CUSTOM_MESSAGES = {
        REQUERIDOS: 'Uno o mas campos son requeridos',
        BODY_VACIO: 'El cuerpo de la petición está vacío',
    };

    static readonly SWAGGER = {
        VERSION: "3.0.0",
        INFO: {
            title: 'API REST - E-commerce GAPSI',
            version: '1.0.0',
            description: 'API REST para la administración de proveedores del e-commerce GAPSI (Prueba tecnica)',
        },
        CONTACT: {
            name: "Emmanuel Santiz (Desarrollador)",
            url: "https://github.com/EmmanuelSantiz",
            email: "emmanuel.07.01@hotmail.com"
        },
        SERVERS: [
            {
              url: 'http://localhost:3000',
            }
        ],
        TAGS: [
            {
                name: "Proveedores",
                description: "Servicio para administrar proveedores del sistema"
            }
        ],
        CONTENTTYPE: "application/json",
        OK: {
            description: "Recurso encontrado correctamente",
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
        },
        SAVE_SUCCESS: {
            description: "Recurso registrado correctamente",
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
        },
        NOT_FOUND: {
            description: "Recurso no encontrado",
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
        },
        ERROR_SERVER: {
            description: "Error interno del servidor",
              schema: {
                $ref: "#/components/schemas/ApiResponse"
              }
        },
    };
    
    // Constructor is empty as all properties are static
    constructor() {}
}
