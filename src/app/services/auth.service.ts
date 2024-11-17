import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.base}/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.router.navigate(['/home']).then(() => {
        window.location.reload(); // Recarga la página solo después de navegar a /home
      });
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); // Recarga la página solo después de navegar a /login
      });
    }
  }

  // Decodifica el token y obtiene el rol del usuario
  getRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token); // Decodifica el token
      return decodedToken?.role || 'UNDEFINED'; // Devuelve el rol o 'UNDEFINED' si no se encuentra
    }
    return 'UNDEFINED';
  }  

  getPermissions(): Record<string, boolean> {
    const role = this.getRole();
  
    const permissionsByRole = {
      ADMIN: {
        users: true,
        roles: true,
        restaurants: true,
        restaurant_ads: true,
        notifications: true,
        messages: true,
        artist_profiles: true,
        artist_applications: true,
        role_distribution: true, // Permiso exclusivo para el reporte de distribución de roles
        activity_summary: true,  // Permiso exclusivo para el reporte de resumen de actividades
        messages_by_user: true,  // Permiso para reporte de mensajes por usuario
        ads_by_restaurant: true, // Permiso para reporte de anuncios por restaurante
    },
    ARTISTA: {
        users: false,
        roles: false,
        restaurants: true,
        restaurant_ads: true,
        notifications: true,
        messages: true,
        artist_profiles: true,
        artist_applications: true,
        role_distribution: false, // No tiene acceso a este reporte
        activity_summary: false,  // No tiene acceso a este reporte
        messages_by_user: true,   // Permiso para reporte de mensajes por usuario
        ads_by_restaurant: true,  // Permiso para reporte de anuncios por restaurante
    },
    RESTAURANTE: {
        users: false,
        roles: false,
        restaurants: true,
        restaurant_ads: true,
        notifications: true,
        messages: true,
        artist_profiles: true,
        artist_applications: true,
        role_distribution: false, // No tiene acceso a este reporte
        activity_summary: false,  // No tiene acceso a este reporte
        messages_by_user: true,   // Permiso para reporte de mensajes por usuario
        ads_by_restaurant: true,  // Permiso para reporte de anuncios por restaurante
      },
    };
  
    // Valida si el rol es una clave válida en permissionsByRole
    if (role && role in permissionsByRole) {
      return permissionsByRole[role as keyof typeof permissionsByRole];
    }
  
    // Retorna permisos vacíos si el rol no es válido
    return {};
  }
}
