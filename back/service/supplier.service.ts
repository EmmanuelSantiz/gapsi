import { ProveedorDTO } from "../domain/dto/proveedor.dto";
import { Suppliers } from "../domain/models/supplier.model";
import { ISupplierRepository } from "../repository/interfaces/supplier.repository";
class SupplierService {
    private supplierRepository: ISupplierRepository;

    /**
     * Inyeccion de dependencias
     * @param repository { ISupplierRepository }
     */
    constructor(repository: ISupplierRepository) {
        this.supplierRepository = repository;
    }

    /**
     * Lista todos los proveedores de la base de datos
     * @returns Objeto con estatus del resultado y data: any
     */
    async findAll(page?: number, limit?: number) {
        try {
            // Obtener datos paginados del repositorio
            const paginatedData = await this.supplierRepository.findAll(page, limit);
            
            // Si no hay elementos, devolver el resultado vacío con la estructura de paginación
            if (paginatedData.items.length === 0) {
                return {
                    result: true,
                    data: {
                        items: [],
                        meta: paginatedData.meta
                    }
                };
            }

            // Mapear los elementos a DTOs
            const supplierDTOs: ProveedorDTO[] = paginatedData.items.map(
                (supplier: Suppliers) => this.mapToResponseDTO(supplier)
            );

            // Devolver el resultado paginado
            return {
                result: true,
                data: {
                    items: supplierDTOs,
                    meta: paginatedData.meta
                }
            };
        } catch (error) {
            console.error('Error en findAll:', error);
            return {
                result: false,
                error: 'Error al obtener los proveedores'
            };
        }
    }

    /**
     * Crea un nuevo proveedor de la base de datos
     * @returns Objeto con estatus del resultado y data: any
     */
    async create(dto: ProveedorDTO) {
        try {
            const actual = await this.findByName(dto.nombre);
            if(actual.result) {
                return {
                    result: false,
                    data: null
                };
            }

            const proveedor = new Suppliers(dto);
            const created = await this.supplierRepository.create(proveedor);

            return {
                result: true,
                data: this.mapToResponseDTO(created!)
            };
        } catch (error: any) {
            return { result: false, data: error.message };
        }
    }

    /**
     * Obtiene un proveedor de la base de datos por ID
     * @returns Objeto con estatus del resultado y data: any
     */
    async getById(id: number) {
        try {
            const supplier = await this.supplierRepository.findById(id);
            if (!supplier) {
                return { 
                    result: false, 
                    message: 'Proveedor no encontrado'
                };
            }

            return { 
                result: true, 
                data: this.mapToResponseDTO(supplier)
            };
        } catch (error: any) {
            return { result: false, data: error.message };
        }
    }

    /**
     * Obtiene un proveedor de la base de datos por nombre
     * @returns Objeto con estatus del resultado y data: any
     */
    async findByName(name: string) {
        try {
          const matches = await this.supplierRepository.findByName(name);
          const result = matches.map(m => this.mapToResponseDTO(m));
          return { 
            result: result.length > 0 ? true : false, 
            data: result
        };
        } catch (error: any) {
          return { result: false, data: error.message };
        }
    }

    /**
     * Actualiza un proveedor existente en la base de datos
     * @param id ID del proveedor a actualizar
     * @param dto Datos actualizados del proveedor
     * @returns Objeto con estatus del resultado y data del proveedor actualizado
     */
    async update(id: number, dto: ProveedorDTO) {
        try {
            // Verificar si el proveedor existe
            const existingSupplier = await this.supplierRepository.findById(id);
            if (!existingSupplier) {
                return { 
                    result: false, 
                    message: 'Proveedor no encontrado' 
                };
            }

            // Si se está cambiando el nombre, verificar que no exista otro proveedor con ese nombre
            if (dto.nombre !== existingSupplier.name) {
                const nameExists = await this.findByName(dto.nombre);
                if (nameExists.result && nameExists.data.length > 0 && 
                    nameExists.data.some((p: ProveedorDTO) => p.id !== id)) {
                    return {
                        result: false,
                        message: 'Ya existe un proveedor con ese nombre'
                    };
                }
            }

            // Crear objeto Suppliers con los datos actualizados
            const supplier = new Suppliers(dto);
            supplier.id = id; // Asegurar que el ID se mantiene

            // Actualizar en el repositorio
            const updated = await this.supplierRepository.update(id, supplier);
            if (!updated) {
                return { 
                    result: false, 
                    message: 'Error al actualizar el proveedor' 
                };
            }

            return { 
                result: true, 
                data: this.mapToResponseDTO(updated) 
            };
        } catch (error: any) {
            console.error('Error en update:', error);
            return { 
                result: false, 
                message: error.message || 'Error al actualizar el proveedor' 
            };
        }
    }
    
    async delete(id: number) {
        try {
          const deleted = await this.supplierRepository.delete(id);
          if (!deleted) {
            return { result: false, message: 'Proveedor no encontrado o no se pudo eliminar' };
          }
          return { result: true, message: 'Proveedor eliminado' };
        } catch (error: any) {
          return { result: false, data: error.message };
        }
    }
    

    /**
     * Maps a database provider record to a ProveedorDTO
     * @param { Suppliers } model The data from the database
     * @description This function transforms the database Suppliers record into a ProveedorDTO object.
     * @returns { ProveedorDTO }
     */
    private mapToResponseDTO(model: Suppliers): ProveedorDTO {
        return {
            id: model.id,
            nombre: model.name || '',
            razonSocial: model.companyName,
            contacto: model.contact,
            correo: model.email,
            telefono: model.phone,
            direccion: model.address,
            categoria: model.category,
            rfc: model.rfc,
            estado: model.status,
            notas: model.notes ?? undefined,
            fechaRegistro: model.createdAt
        };
    }

}

export default SupplierService;