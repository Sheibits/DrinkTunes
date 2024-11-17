import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from '../models/Restaurants';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private url = `${base_url}/restaurants`;

  constructor(private http: HttpClient) {}

  // Crear encabezados de autorización
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Obtener todos los restaurantes
  list(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Obtener un restaurante por ID
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Crear un restaurante
  create(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.url, restaurant, { headers: this.createAuthorizationHeader() });
  }

  // Actualizar un restaurante
  update(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.url}/${restaurant.restaurantId}`, restaurant, { headers: this.createAuthorizationHeader() });
  }

  // Eliminar un restaurante
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
