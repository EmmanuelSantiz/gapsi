import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private readonly http: HttpClient = inject(HttpClient);

    private URI: string = "http://localhost:3000/api/v1";
    private apiUrl = `${this.URI}/home`;
  
    constructor() { }

    getWelcome(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    
        console.log(`${this.apiUrl}`)
        return this.http.get<any[]>(`${this.apiUrl}`, httpOptions);
    }
}