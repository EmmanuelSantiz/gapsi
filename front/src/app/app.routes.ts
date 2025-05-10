import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'proveedores', 
    loadComponent: () => import('./pages/proveedores/proveedores.component').then(m => m.ProveedoresComponent) 
  },
  { 
    path: 'proveedores/agregar', 
    loadComponent: () => import('./pages/proveedores/proveedor-form/proveedor-form.component').then(m => m.ProveedorFormComponent) 
  },
  { 
    path: 'proveedores/editar/:id', 
    loadComponent: () => import('./pages/proveedores/proveedor-form/proveedor-form.component').then(m => m.ProveedorFormComponent) 
  },
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];
