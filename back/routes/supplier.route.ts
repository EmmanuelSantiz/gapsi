import { Router } from 'express';
import { 
    getAllSuppliers, 
    createSupplier, 
    getSupplierById, 
    deleteSupplierById
 } from '../controller/supplier.controller';
import { Constantes } from '../utils/constantes';

const router = Router();

// Rutas de home
router.get(Constantes.NOT_ROUTE, getAllSuppliers);
router.post(Constantes.NOT_ROUTE, createSupplier);
router.get(Constantes.BY_ID, getSupplierById);
//router.put(Constantes.BY_ID, getAllSuppliers);
router.delete(Constantes.BY_ID, deleteSupplierById);

export default router;