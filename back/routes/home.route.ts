import { Router } from 'express';
import { Welcomne } from '../controller/home.controller';
import { Constantes } from '../utils/constantes';

const router = Router();

// Rutas de home
router.get(Constantes.NOT_ROUTE, Welcomne);

export default router;