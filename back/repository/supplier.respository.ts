import { ISupplierRepository } from '../repository/interfaces/supplier.repository';
import { Suppliers } from '../domain/models/supplier.model';
import { DataBase } from '../config/conexion';
import { PaginatedResult } from '../domain/models/paginated-result.model';

export class SupplierRepository implements ISupplierRepository {
    constructor(private database: DataBase) {}
  
    // Funcion para obtener registro por ID
    async findById(id: number): Promise<Suppliers | null> {
        const all = this.database.obtenerTodos(); // suponiendo que tienes este método
        const result = all.find((s: Suppliers) => s.id === id);
        return result || null;
    }
  
    // Funcion para obtener todos los registros con paginación
    async findAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<Suppliers>> {
        const allSuppliers = this.database.obtenerTodos() || [];
        
        // Calcular el total de páginas
        const totalItems = allSuppliers.length;
        const totalPages = Math.ceil(totalItems / limit);
        
        // Validar que la página solicitada sea válida
        const currentPage = page < 1 ? 1 : page > totalPages && totalPages > 0 ? totalPages : page;
        
        // Calcular índices para el slice
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        
        // Obtener los elementos de la página actual
        const items = allSuppliers.slice(startIndex, endIndex);
        
        // Retornar resultado paginado
        return {
            items,
            meta: {
                totalItems,
                itemsPerPage: limit,
                currentPage,
                totalPages
            }
        };
    }

    // Funcion para obener un registro por nombre
    async findByName(name: string): Promise<Suppliers[]> {
        return this.database.obtenerPorNombre(name);
    }
  
    // Funcion para crear un nuevo registro
    async create(supplier: Suppliers): Promise<Suppliers | null> {
        const newId = this.database.obtenerUltimoId() + 1;
        supplier.id = newId;
        this.database.guardarProveedor(supplier);
        return supplier;
    }
  
    // Funcion para actualizar un registro existente
    async update(id: number, supplier: Suppliers): Promise<Suppliers | null> {
        const existing = await this.findById(id);
        if (!existing) return null;
        supplier.id = Number(id);
        this.database.guardarProveedor(supplier);
        return supplier;
    }
  
    // Funcion para eliminar un registro existente
    async delete(id: number): Promise<boolean> {
        return this.database.eliminarPorId(Number(id));
    }
  }
