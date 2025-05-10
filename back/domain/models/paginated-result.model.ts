/**
 * Interfaz que define los metadatos de paginación
 * Contiene información sobre la página actual, total de elementos, etc.
 */
export interface PaginationMeta {
    /**
     * Número total de elementos disponibles en todas las páginas
     */
    totalItems: number;
    
    /**
     * Número de elementos por página
     */
    itemsPerPage: number;
    
    /**
     * Número de página actual
     */
    currentPage: number;
    
    /**
     * Número total de páginas disponibles
     */
    totalPages: number;
}

/**
 * Interfaz genérica para resultados paginados
 * @template T - Tipo de los elementos en la colección paginada
 */
export interface PaginatedResult<T> {
    /**
     * Arreglo de elementos para la página actual
     */
    items: T[];
    
    /**
     * Metadatos de paginación
     */
    meta: PaginationMeta;
}
