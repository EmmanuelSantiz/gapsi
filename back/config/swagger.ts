import swaggerJSDoc from 'swagger-jsdoc';
import { Constantes } from '../utils/constantes';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: Constantes.SWAGGER.VERSION,
    info: Constantes.SWAGGER.INFO,
    contact: Constantes.SWAGGER.CONTACT,
    servers: Constantes.SWAGGER.SERVERS,
    tags: Constantes.SWAGGER.TAGS,
    paths: {
      "/api/v1/proveedores": {
        get: {
            summary: "Obtiene una lista de productos",
            description: "Regresa una lista de productos consultados por filtros",
            tags: [
                "Proveedores"
            ],
            operationId: "GetAllSuppliers",
          consumes: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          produces: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          parameters: [
            {
              in: "query",
              name: "nombre",
              schema: {
                type: "string",
                example: "2340294"
              }
            }
          ],
          responses: {
            200: Constantes.SWAGGER.OK,
            400: Constantes.SWAGGER.NOT_FOUND,
            500: Constantes.SWAGGER.ERROR_SERVER,
            }
        },
        post: {
          summary: "Creá un nuevo producto",
          description: "Registra un nuevo producto en el sistema, todos los campos son requeridos",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: '#/definitions/ProveedorDTO'
                }
              }
            }
          },
          tags: [
            "Proveedores"
          ],
          operationId: "saveSupplier",
          consumes: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          produces: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          responses: {
            201: Constantes.SWAGGER.SAVE_SUCCESS,
            400: Constantes.SWAGGER.NOT_FOUND,
            500: Constantes.SWAGGER.ERROR_SERVER,
          }
        },
      },
      "/api/v1/proveedores/{id}": {
        get: {
            summary: "Obtiene producto por id",
            description: "Regresa un producto por identificador si no existe regresa una excepcion",
            tags: [
                "Proveedores"
            ],
            operationId: "GetSupplierById",
          consumes: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          produces: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                id: {
                    type: "integer",
                    format: "int64"
                }
              }
            },
          ],
          responses: {
            200: Constantes.SWAGGER.OK,
            400: Constantes.SWAGGER.NOT_FOUND,
            500: Constantes.SWAGGER.ERROR_SERVER,
            }
        },
        put: {
          summary: "Actualiza un producto",
          description: "Actualiza un los datos de un producto, si no existe regresa una excepcion",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: '#/definitions/ProveedorDTO'
                }
              }
            }
          },
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                id: {
                    type: "integer",
                    format: "int64"
                }
              }
            },
          ],
          tags: [
            "Proveedores"
          ],
          operationId: "updateSupplier",
          consumes: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          produces: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          responses: {
            201: Constantes.SWAGGER.SAVE_SUCCESS,
            400: Constantes.SWAGGER.NOT_FOUND,
            500: Constantes.SWAGGER.ERROR_SERVER,
          }
        },
        delete: {
            summary: "Elimina proveedor por id",
            description: "Regresa un proveedor por identificador si no existe regresa una excepcion",
            tags: [
                "Proveedores"
            ],
            operationId: "DeleteSupplierById",
          consumes: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          produces: [
            Constantes.SWAGGER.CONTENTTYPE
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                id: {
                    type: "integer",
                    format: "int64"
                }
              }
            },
          ],
          responses: {
            200: Constantes.SWAGGER.OK,
            400: Constantes.SWAGGER.NOT_FOUND,
            500: Constantes.SWAGGER.ERROR_SERVER,
            }
        },
      }
    },
    definitions: {
        ProveedorDTO: {
            type: "object",
            properties: {
                nombre: {
                    type: "string",
                    example: "Cementos"
                },
                razonSocial: {
                    type: "string",
                    example: "Cementos SA de CV"
                },
                rfc: {
                    type: "string",
                    example: "SAFE901123J56"
                },
                contacto: {
                    type: "string",
                    example: ""
                },
                correo: {
                    type: "string",
                    example: "test@test.com"
                },
                telefono: {
                    type: "string",
                    example: "+52 967 100 9090"
                },
                direccion: {
                    type: "string",
                    example: "Calle Aries #48"
                },
                categoria: {
                    type: "string",
                    example: "Construccion"
                },
                notas: {
                    type: "string",
                    example: "Esta es una nota"
                }
            }
        }
    },
    components: {
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              type: "object",
              additionalProperties: true,
            },
            message: {
              type: "string",
              example: "Success"
            }
          }
        }
      }
    }
  },
  apis: ['../routes/*.ts', '../dtos/*.ts'], // Rutas y DTOs con anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;