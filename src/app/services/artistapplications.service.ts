// src/app/services/artist-applications.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArtistApplication } from '../models/ArtistApplications';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ArtistApplicationsService {
  private url = `${base_url}/artist_applications`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  list(): Observable<ArtistApplication[]> {
    return this.http.get<ArtistApplication[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  getArtistApplicationById(id: number): Observable<ArtistApplication> {
    return this.http.get<ArtistApplication>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  create(artistApplication: ArtistApplication): Observable<ArtistApplication> {
    return this.http.post<ArtistApplication>(this.url, artistApplication, { headers: this.createAuthorizationHeader() });
  }

  update(artistApplication: ArtistApplication): Observable<ArtistApplication> {
    return this.http.put<ArtistApplication>(`${this.url}/${artistApplication.applicationId}`, artistApplication, { headers: this.createAuthorizationHeader() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
