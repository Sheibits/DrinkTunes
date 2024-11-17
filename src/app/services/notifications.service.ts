// src/app/services/notifications.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notification } from '../models/Notifications';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private url = `${base_url}/notifications`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  list(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  create(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.url, notification, { headers: this.createAuthorizationHeader() });
  }

  update(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.url}/${notification.notificationId}`, notification, { headers: this.createAuthorizationHeader() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
