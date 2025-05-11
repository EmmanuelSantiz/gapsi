import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent implements OnInit {
  proveedor: Proveedor | null = null;
  loading: boolean = false;
  error: string = '';
  proveedorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.proveedorId = +id;
        this.loadProveedor(this.proveedorId);
      } else {
        this.error = 'ID de proveedor no proporcionado';
      }
    });
  }

  /**
   * Carga los datos del proveedor
   * @param id ID del proveedor a cargar
   */
  loadProveedor(id: number): void {
    this.loading = true;
    this.proveedorService.getById(id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.proveedor = response.data;
        } else {
          this.error = 'No se pudo cargar la información del proveedor';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el proveedor', err);
        this.error = 'Error al cargar la información del proveedor. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  /**
   * Navega de vuelta a la lista de proveedores
   */
  volver(): void {
    this.router.navigate(['/proveedores']);
  }

  /**
   * Navega al formulario para editar el proveedor actual
   */
  editar(): void {
    if (this.proveedorId) {
      this.router.navigate(['/proveedores/editar', this.proveedorId]);
    }
  }

  /**
   * Elimina el proveedor actual
   */
  eliminar(): void {
    if (!this.proveedorId) return;
    
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
      this.proveedorService.delete(this.proveedorId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.router.navigate(['/proveedores']);
          } else {
            this.error = 'No se pudo eliminar el proveedor';
          }
        },
        error: (err) => {
          console.error('Error al eliminar el proveedor', err);
          this.error = 'Error al eliminar el proveedor. Por favor, intente nuevamente.';
        }
      });
    }
  }
}