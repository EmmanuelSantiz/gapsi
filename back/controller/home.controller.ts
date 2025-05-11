import { Request, Response } from 'express';
import { Constantes } from '../utils/constantes';
import { CustomResponse } from '../domain/models/custom-response.model';
import HomeService from '../service/home.service';

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
export const Welcomne = async (req: Request, res: Response): Promise<void> => {
    const rsp = createResponse();
    try {

        const response = await HomeService.welcome();
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

// Exportar todas las funciones del controlador
export default {
    Welcomne,
};
