import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private url = `${base_url}/reports`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getRoleDistribution(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.url}/role-distribution`, { headers });
  }

  getActivitySummary(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.url}/activity-summary`, { headers });
  }

  getMessagesByUser(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.url}/messages-by-user`, { headers });
  }

  getAdsByRestaurant(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.url}/ads-by-restaurant`, { headers });
  }
}
