import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { PaginatedResult } from '../../models/paginated-result.model';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {
  // Datos de proveedores
  proveedores: Proveedor[] = [];
  
  // Configuración de paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  
  // Estado de carga y errores
  loading: boolean = false;
  error: string = '';

  constructor(
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  /**
   * Carga los proveedores con paginación
   */
  loadProveedores(): void {
    this.loading = true;
    this.proveedorService.getAll(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (proveedor: any) => {
          if (proveedor.success) {
            this.proveedores = proveedor.data.items;
            this.totalItems = proveedor.data.meta.totalItems;
            this.totalPages = proveedor.data.meta.totalPages;
            this.currentPage = proveedor.data.meta.currentPage;
            this.itemsPerPage = proveedor.data.meta.itemsPerPage;
          } else {
            this.proveedores = [];
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar proveedores', err);
          this.error = 'Error al cargar los proveedores. Por favor, intente nuevamente.';
          this.loading = false;
        }
      });
  }

  /**
   * Navega a la primera página
   */
  goToFirstPage(): void {
    if (this.currentPage !== 1 && !this.loading) {
      this.currentPage = 1;
      this.loadProveedores();
    }
  }

  /**
   * Navega a la página anterior
   */
  goToPreviousPage(): void {
    if (this.currentPage > 1 && !this.loading) {
      this.currentPage--;
      this.loadProveedores();
    }
  }

  /**
   * Navega a la página siguiente
   */
  goToNextPage(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.currentPage++;
      this.loadProveedores();
    }
  }

  /**
   * Navega a la última página
   */
  goToLastPage(): void {
    if (this.currentPage !== this.totalPages && !this.loading) {
      this.currentPage = this.totalPages;
      this.loadProveedores();
    }
  }

  /**
   * Navega a una página específica
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage && !this.loading) {
      this.currentPage = page;
      this.loadProveedores();
    }
  }

  /**
   * Genera un array de números de página para mostrar en la paginación
   * Muestra un máximo de 5 páginas, centradas en la página actual cuando es posible
   */
  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    let startPage: number;
    let endPage: number;

    if (this.totalPages <= maxPagesToShow) {
      // Si hay menos páginas que el máximo a mostrar, mostrar todas
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // Calcular páginas centrando la actual
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        // Cerca del inicio
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        // Cerca del final
        startPage = this.totalPages - maxPagesToShow + 1;
        endPage = this.totalPages;
      } else {
        // En medio
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Generar array de páginas
    return Array.from(Array((endPage + 1) - startPage).keys())
      .map(i => startPage + i);
  }

  /**
   * Navega al formulario para agregar un nuevo proveedor
   */
  agregarProveedor(): void {
    this.router.navigate(['/proveedores/agregar']);
  }

  /**
   * Navega al formulario para editar un proveedor
   */
  editarProveedor(id: number| null): void {
    if(id == null) return;
    this.router.navigate(['/proveedores/editar', id]);
  }

  /**
   * Muestra los detalles de un proveedor
   */
  verProveedor(id: number | null): void {
    if(id == null) return;
    this.router.navigate(['/proveedores/ver', id]);
  }

  /**
   * Elimina un proveedor
   */
  eliminarProveedor(id: number| null): void {
    if(id == null) return;
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
      this.proveedorService.delete(id).subscribe({
        next: () => {
          this.loadProveedores();
        },
        error: (err: any) => {
          console.error('Error al eliminar proveedor', err);
          this.error = 'Error al eliminar el proveedor. Por favor, intente nuevamente.';
        }
      });
    }
  }
}
