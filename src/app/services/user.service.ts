import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from '../../environments/environment';  // Asegúrate de que la ruta sea correcta
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/users`;  // Ruta del backend para los usuarios

  // BehaviorSubject para almacenar y actualizar la lista de usuarios
  private userListSubject = new BehaviorSubject<User[]>([]);
  public userList$ = this.userListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear un encabezado con el token de autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Listar todos los usuarios y actualizar el BehaviorSubject
  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url, { headers: this.createAuthorizationHeader() }).pipe(
      tap(users => this.userListSubject.next(users)) // Actualiza la lista local
    );
  }

  // Registrar un usuario y actualizar la lista de usuarios localmente
  create(user: User): Observable<any> {
    return this.http.post(this.url, user, { headers: this.createAuthorizationHeader() }).pipe(
      tap(() => this.refreshUserList()) // Actualiza la lista después de crear un usuario
    );
  }

  // Actualizar un usuario y refrescar la lista de usuarios
  update(user: User): Observable<any> {
    return this.http.put(this.url, user, { headers: this.createAuthorizationHeader() }).pipe(
      tap(() => this.refreshUserList()) // Actualiza la lista después de modificar un usuario
    );
  }

  // Eliminar un usuario y actualizar la lista de usuarios localmente
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() }).pipe(
      tap(() => this.refreshUserList()) // Actualiza la lista después de eliminar un usuario
    );
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Método para actualizar manualmente la lista de usuarios
  setUserList(users: User[]): void {
    this.userListSubject.next(users);
  }

  // Obtener la lista actual de usuarios almacenada en el BehaviorSubject
  getUserList(): Observable<User[]> {
    return this.userList$;
  }

  // Método para refrescar la lista de usuarios desde el backend
  private refreshUserList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }
}
