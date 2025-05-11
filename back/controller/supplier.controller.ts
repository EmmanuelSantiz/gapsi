import { Request, Response } from 'express';
import { Constantes } from '../utils/constantes';
import { CustomResponse } from '../domain/models/custom-response.model';

import { DataBase } from '../config/conexion';
import { SupplierRepository } from '../repository/supplier.respository';
import SupplierService from '../service/supplier.service';
import { ProveedorDTO } from '../domain/dto/proveedor.dto';

const createResponse = (): CustomResponse => ({
  success: true,
  message: "",
  data: null
});
/**
 * Mensaje de bienvenida
 * @param req Express request object
 * @param res Express response object
 * @returns { success: boolean, message: string, data: any }
 * @description Esta funcion regresa un mensaje de bienvenida en formato JSON.
 * @throws { Error } Si un error ocurre al consultar mensaje
 */
export const getAllSuppliers = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {
        const db = new DataBase();
        const supplierRepo = new SupplierRepository(db);
        const supplierService = new SupplierService(supplierRepo);

        const response = await supplierService.findAll();
        console.log(response);
        if (response.result) {
            rsp.success = true;
            rsp.message = '';
            rsp.data = response.data || null;
            res.status(Constantes.STATUS_CODES.OK).json(rsp);
        } else {
            rsp.success = false;
            rsp.message = 'Error al consultar mensaje de bienvenida!';
            rsp.data = null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
        }
    } catch (error: any) {
        console.error('Error en el controlador home.welcomne:', error);
      
        rsp.success = false;
        rsp.message = Constantes.MESSAGES.INTERNAL_SERVER_ERROR;
        res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
    }
};

/**
 * Crea un nuevo proveedor
 * @param req Express request object
 * @param res Express response object
 * @returns { success: boolean, message: string, data: any }
 * @description This function creates a new product in the database and returns the result in JSON format.
 * @throws { Error } If an error occurs while creating the product
 */
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {
        // Validate required fields
        if (!req.body || Object.keys(req.body).length === 0) {
            console.info(req.body)
            console.warn('ALERTA: req.query está vacío o undefined');
            rsp.success = false;
            rsp.message = 'El query de la petición está vacío';
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }
        
        const requiredFields = ['nombre', 'rfc', 'razonSocial', 'correo', 'telefono', 'direccion'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            console.warn('Validación fallida: campos requeridos faltantes');
            rsp.success = false;
            rsp.message = Constantes.ERROR_CUSTOM_MESSAGES.REQUERIDOS;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const db = new DataBase();
        const supplierRepo = new SupplierRepository(db);
        const supplierService = new SupplierService(supplierRepo);

        console.log('ingresar');
        console.log(req.body);

        const verificar = await supplierService.findByName(req.body.nombre);
        if(verificar.data.length > 0) {
            rsp.success = true;
            rsp.message = 'Este proveedor ya existe en la base de datos';
            rsp.data = verificar.data || null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const dto: ProveedorDTO = { ...req.body };
        const serviceResponse = await supplierService.create(dto);
        
        if (serviceResponse.result) {
            rsp.success = true;
            rsp.message = 'Proveedor creado Exitosamente';
            rsp.data = serviceResponse.data || null;
            res.status(Constantes.STATUS_CODES.CREATED).json(rsp);
        } else {
            rsp.success = false;
            rsp.message = 'Error al crear la proveedor';
            rsp.data = null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
        }
    } catch (error: any) {
        console.error('Error en el controlador supplier.createSupplier:', error);
      
        rsp.success = false;
        rsp.message = Constantes.MESSAGES.INTERNAL_SERVER_ERROR;
        res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
    }
};

/**
 * Retrieves a product by ID
 * @param req Express request object
 * @param res Express response object
 */
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {
        // Verificar si el body está vacío
        if (!req.params || Object.keys(req.params).length === 0) {
            console.warn('ALERTA: req.query está vacío o undefined');
            rsp.success = false;
            rsp.message = 'El query de la petición está vacío';
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            console.warn('Validación fallida: id requerido faltante');
            rsp.success = false;
            rsp.message = Constantes.ERROR_CUSTOM_MESSAGES.REQUERIDOS;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const db = new DataBase();
        const supplierRepo = new SupplierRepository(db);
        const supplierService = new SupplierService(supplierRepo);
        
        const result = await supplierService.getById(id);
        if (!result.result) {
            rsp.success = false;
            rsp.message = 'Error al obtener el proveedor';
            rsp.data = null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        rsp.success = true;
        rsp.message = 'Proveedor encontrado';
        rsp.data = result.data || null;
        res.status(Constantes.STATUS_CODES.OK).json(rsp);
    } catch (error: any) {
        console.error('Error en el controlador supplier.getSupplierById:', error);

        rsp.success = false;
        rsp.message = Constantes.MESSAGES.INTERNAL_SERVER_ERROR;
        res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
    }
};

export const deleteSupplierById = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {
        // Verificar si el body está vacío
        if (!req.params || Object.keys(req.params).length === 0) {
            console.warn('ALERTA: req.query está vacío o undefined');
            rsp.success = false;
            rsp.message = 'El query de la petición está vacío';
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            console.warn('Validación fallida: id requerido faltante');
            rsp.success = false;
            rsp.message = Constantes.ERROR_CUSTOM_MESSAGES.REQUERIDOS;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const db = new DataBase();
        const supplierRepo = new SupplierRepository(db);
        const supplierService = new SupplierService(supplierRepo);
        
        const result = await supplierService.delete(id);
        if (result.result) {
            rsp.success = true;
            rsp.message = 'Proveedor borrado!';
            rsp.data = result.data || null;
            res.status(Constantes.STATUS_CODES.OK).json(rsp);
        } else {
            rsp.success = false;
            rsp.message = 'Error al borrar proveedor';
            rsp.data = null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
        }
    } catch (error: any) {
        console.error('Error en el controlador supplier.deleteSupplierById:', error);

        rsp.success = false;
        rsp.message = Constantes.MESSAGES.INTERNAL_SERVER_ERROR;
        res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
    }
};

    /**
     * Actualiza un proveedor existente
     */
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {
        // Verificar si el body está vacío
        if (!req.params || Object.keys(req.params).length === 0) {
            console.warn('ALERTA: req.query está vacío o undefined');
            rsp.success = false;
            rsp.message = 'El query de la petición está vacío';
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            console.warn('Validación fallida: id requerido faltante');
            rsp.success = false;
            rsp.message = Constantes.ERROR_CUSTOM_MESSAGES.REQUERIDOS;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }

        const db = new DataBase();
        const supplierRepo = new SupplierRepository(db);
        const supplierService = new SupplierService(supplierRepo);

        const proveedorDTO: ProveedorDTO = req.body;
        const result = await supplierService.update(id, proveedorDTO);
        
        if (!result.result) {
            rsp.success = false;
            rsp.message = 'Error al obtener el proveedor';
            rsp.data = null;
            res.status(Constantes.STATUS_CODES.BAD_REQUEST).json(rsp);
            return;
        }
        
        rsp.success = true;
        rsp.message = 'Proveedor encontrado';
        rsp.data = result.data || null;
        res.status(Constantes.STATUS_CODES.OK).json(rsp);
    } catch (error) {
        console.error('Error en update controller:', error);
        rsp.success = false;
        rsp.message = Constantes.MESSAGES.INTERNAL_SERVER_ERROR;
        res.status(Constantes.STATUS_CODES.INTERNAL_SERVER_ERROR).json(rsp);
    }
}

// Exportar todas las funciones del controlador
export default {
    getAllSuppliers,
    createSupplier,
    getSupplierById,
    deleteSupplierById,
    updateSupplier
};
