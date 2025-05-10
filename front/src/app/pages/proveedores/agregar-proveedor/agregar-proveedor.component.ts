import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AgregarProveedorComponent implements OnInit {
  proveedorForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router
  ) {
    this.proveedorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      rfc: ['', Validators.required],
      razonSocial: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.proveedorForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.proveedorForm.invalid) {
      return;
    }

    this.loading = true;
    const nuevoProveedor: Proveedor = this.proveedorForm.value;

    this.proveedorService.create(nuevoProveedor)
      .subscribe({
        next: () => {
          this.loading = false;
          // Navegar de vuelta a la lista de proveedores después de guardar
          this.router.navigate(['/proveedores']);
        },
        error: (error) => {
          this.error = 'Error al guardar el proveedor: ' + error.message;
          this.loading = false;
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/proveedores']);
  }
}