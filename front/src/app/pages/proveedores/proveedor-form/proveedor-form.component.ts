import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrl: './proveedor-form.component.scss',
  //styleUrl: './proveedor-form.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProveedorFormComponent implements OnInit {
  proveedorForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  isEditMode = false;
  proveedorId: number | null = null;
  pageTitle = 'Agregar Nuevo Proveedor';
  proveedor: Proveedor = {
    id: null,
    nombre: '',
    razonSocial: null,
    contacto: '',
    correo: null,
    telefono: '',
    direccion: null,
    categoria: null,
    rfc: '',
    estado: true,
    notas: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.proveedorForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      razonSocial: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      categoria: ['', Validators.required],
      rfc: ['', Validators.required],
      estado: [true],
      notas: ['']
    });
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.proveedorId = +params['id'];
        this.pageTitle = 'Editar Proveedor';
        this.loadProveedorData();
      }
    });
  }

  // Cargar datos del proveedor para edición
  loadProveedorData(): void {
    if (!this.proveedorId) return;
    
    this.loading = true;
    this.proveedorService.getById(this.proveedorId).subscribe({
      next: (proveedor) => {
        console.log(proveedor)
        this.proveedor = proveedor.data;
        this.proveedorForm.patchValue({
          nombre: proveedor.data.nombre,
          razonSocial: proveedor.data.razonSocial,
          contacto: proveedor.data.contacto,
          correo: proveedor.data.correo,
          telefono: proveedor.data.telefono,
          direccion: proveedor.data.direccion,
          categoria: proveedor.data.categoria,
          rfc: proveedor.data.rfc,
          estado: proveedor.data.estado,
          notas: proveedor.data.notas
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del proveedor: ' + error.message;
        console.error('Error loading provider data:', error);
        this.loading = false;
      }
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.proveedorForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.proveedorForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.proveedorForm.controls).forEach(key => {
        const control = this.proveedorForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const proveedorData: Proveedor = this.proveedorForm.value;

    if (this.isEditMode && this.proveedorId) {
      // Actualizar proveedor existente
      this.proveedorService.update(this.proveedorId, proveedorData)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/proveedores']);
          },
          error: (error) => {
            this.error = 'Error al actualizar el proveedor: ' + error.message;
            console.error('Error updating provider:', error);
            this.loading = false;
          }
        });
    } else {
      // Crear nuevo proveedor
      this.proveedorService.create(proveedorData)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/proveedores']);
          },
          error: (error) => {
            this.error = 'Error al guardar el proveedor: ' + error.message;
            console.error('Error creating provider:', error);
            this.loading = false;
          }
        });
    }
  }

  onCancel(): void {
    this.router.navigate(['/proveedores']);
  }
}
