import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VerComponent } from './pages/proveedores/ver/ver.component';

const routes: Routes = [
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'proveedores/ver/:id', component: VerComponent },
  // Otras rutas existentes...
  { path: '', redirectTo: '/proveedores', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }