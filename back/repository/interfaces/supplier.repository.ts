import { Suppliers } from "../../domain/models/supplier.model";
import { PaginatedResult } from "../../domain/models/paginated-result.model";

/**
 * Interfaz para proveedores
 * @function findById Obtiene un registro existente por ID
 * @function findAll Obtinene todos los registros existentes
 * @function create Crea un nuevo registro y regresa el registro creado
 * @function update Actualiza un registro existente
 * @function delete Elmina un registro existente
 */
export interface ISupplierRepository {
    findById(id: number): Promise<Suppliers | null>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Suppliers>>;
    findByName(name: string): Promise<Suppliers[]>
    //Quitar en null cuando funciona
    create(supplier: Suppliers): Promise<Suppliers | null>;
    update(id: number, supplier: Suppliers): Promise<Suppliers | null>;
    delete(id: number): Promise<boolean>;
}
