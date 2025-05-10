import { Router } from 'express';
import { welcomne } from '../controller/home.controller';
import { Constantes } from '../utils/constantes';

const router = Router();

// Rutas de home
router.get(Constantes.NOT_ROUTE, welcomne);

export default router;