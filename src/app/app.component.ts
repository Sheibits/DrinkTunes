import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DinkTunes';
  permissions: Record<string, boolean> = {}; // Permisos dinámicos basados en el rol

  constructor(
    public router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPermissions(); // Carga los permisos al iniciar el componente
  }

  // Carga los permisos en base al rol del usuario
  private loadPermissions(): void {
    const role = this.authService.getRole();
    console.log('Rol del usuario:', role); // Para depuración
    this.permissions = this.authService.getPermissions();

    // Marca la vista para que Angular detecte los cambios
    this.cdr.detectChanges();
  }

  // Cierra la sesión y redirige al login
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Verifica si el usuario tiene un permiso específico
  hasPermission(permission: string): boolean {
    return !!this.permissions[permission]; // Retorna true si el permiso está activo, false si no
  }
}
