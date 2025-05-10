import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import swaggerSpec from './config/swagger';
import { Constantes } from './utils/constantes';
import { CustomResponse } from './domain/models/custom-response.model';

//Rutas endpoints
import HomeRouter from './routes/home.route';
import SupplierRouter from './routes/supplier.route';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANTE: Middleware para parsear JSON - DEBE estar antes de las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
  
// Logging middleware
app.use(morgan('dev'));

// Initial default route
app.get('/', (req: Request, res: Response) => {
    res.send('<a href="./api-docs">Click para ir a la documentacion Swagger</a>');
});

// Health check route
app.get('/health', (_req: Request, res: Response) => {
    res.status(Constantes.STATUS_CODES.OK).json({
      status: 'UP',
      timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/api/test', (req: Request, res: Response) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    res.status(Constantes.STATUS_CODES.OK).json({
      success: true,
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      receivedBody: req.body
    });
});

// Rutas seteo ruta base /api/v1/{moduloPlural}
app.use(Constantes.HOME.BASE, HomeRouter);
app.use(Constantes.PROVEEDORES.BASE, SupplierRouter);

// Documentation
app.use(Constantes.API_DOC, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 route
app.use((_req: Request, res: Response) => {
    console.warn('ALERTA: Ruta no encontrada');
    console.warn('Ruta no encontrada:', _req.originalUrl);
    console.warn('Método no permitido:', _req.method);
    console.warn('Headers:', _req.headers);
    console.warn('Body:', _req.body);
    console.warn('Query:', _req.query);
    console.warn('Params:', _req.params);
    console.warn('Timestamp:', new Date().toISOString());
    const rsp: CustomResponse = {
        success: false,
        message: Constantes.MESSAGES.NOT_FOUND,
        data: null
    };
    res.status(Constantes.STATUS_CODES.NOT_FOUND).json(rsp);
});

// Manejador de errores global
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error no manejado:', err);

    const rsp: CustomResponse = {
        success: false,
        message: Constantes.MESSAGES.INTERNAL_SERVER_ERROR,
        data: null
    };
    res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`📑 Health check disponible en http://localhost:${PORT}/health`);
    console.log(`🔍 Ruta de prueba disponible en http://localhost:${PORT}/api/test`);
  });
}

export default app;
