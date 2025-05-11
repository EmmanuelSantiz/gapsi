import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-Commerce Gapsi';
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    /*this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Actualizar el título de la página según la ruta
      const routePath = event.urlAfterRedirects;
      if (routePath.includes('/dashboard')) {
        this.pageTitle = 'Dashboard';
      } else if (routePath.includes('/proveedores')) {
        this.pageTitle = 'Proveedores';
      }
    });*/
  }

  // Método para navegar programáticamente (opcional)
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
