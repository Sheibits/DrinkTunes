import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/roles`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  create(role: Role): Observable<any> {
    return this.http.post(this.url, role, { headers: this.createAuthorizationHeader() });
  }

  update(role: Role): Observable<any> {
    return this.http.put(this.url, role, { headers: this.createAuthorizationHeader() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
