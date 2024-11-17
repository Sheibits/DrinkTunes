import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArtistProfile } from '../models/ArtistProfile';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ArtistProfileService {
  private url = `${base_url}/artist_profiles`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  list(): Observable<ArtistProfile[]> {
    return this.http.get<ArtistProfile[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  getArtistProfileById(id: number): Observable<ArtistProfile> {
    return this.http.get<ArtistProfile>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  create(artistProfile: ArtistProfile): Observable<ArtistProfile> {
    return this.http.post<ArtistProfile>(this.url, artistProfile, { headers: this.createAuthorizationHeader() });
  }

  update(artistProfile: ArtistProfile): Observable<ArtistProfile> {
    return this.http.put<ArtistProfile>(`${this.url}/${artistProfile.artistId}`, artistProfile, { headers: this.createAuthorizationHeader() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
