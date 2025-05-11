import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Proveedor } from '../models/proveedor.model';
import { PaginatedResult } from '../models/paginated-result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
    private readonly http: HttpClient = inject(HttpClient);
    private URI: string = "http://localhost:3000/api/v1";
    private apiUrl = `${this.URI}/proveedores`;
    
    private httpOptions = {
        headers: new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json',
        })
    };
  
    constructor() { }

    /**
     * Obtiene una lista paginada de proveedores
     * @param page Número de página (comienza en 1)
     * @param limit Cantidad de elementos por página
     * @returns Observable con el resultado paginado
     */
    getAll(page: number = 1, limit: number = 10): Observable<PaginatedResult<Proveedor>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        
        return this.http.get<PaginatedResult<Proveedor>>(this.apiUrl+'/?', { 
            ...this.httpOptions, 
            params 
        });
    }
    
    /**
     * Obtiene un proveedor por su ID
     * @param id ID del proveedor
     * @returns Observable con los datos del proveedor
     */
    getById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, this.httpOptions);
    }
    
    /**
     * Crea un nuevo proveedor
     * @param proveedor Datos del proveedor a crear
     * @returns Observable con el proveedor creado
     */
    create(proveedor: Proveedor): Observable<any> {
        return this.http.post<any>(this.apiUrl, proveedor, this.httpOptions);
    }
    
    /**
     * Actualiza un proveedor existente
     * @param id ID del proveedor a actualizar
     * @param proveedor Datos actualizados del proveedor
     * @returns Observable con el proveedor actualizado
     */
    update(id: number, proveedor: Proveedor): Observable<Proveedor> {
        return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor, this.httpOptions);
    }
    
    /**
     * Elimina un proveedor
     * @param id ID del proveedor a eliminar
     * @returns Observable con la respuesta de eliminación
     */
    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
    }
}
