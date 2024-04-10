import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/Utilisateur';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:String="http://localhost:3333/api/v1/users";
  constructor(private http: HttpClient) {
    
   }
   login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { username, password })
       .pipe(tap(response => {
         localStorage.setItem('access_token', response.access_token);
         localStorage.setItem('refresh_token', response.refresh_token);
         localStorage.setItem('expires_in', response.expires_in);
       }));
   }

  register(utilisateur:Utilisateur): Observable<any> {
    return this.http.post<String>(`${this.url}/signup`,utilisateur);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token'); 
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  isTokenExpired(): boolean {
    const expiresIn = localStorage.getItem('expires_in');
    if (expiresIn) {
      const expirationTime = parseInt(expiresIn, 10) * 1000; 
      return expirationTime < Date.now(); 
    }
    return true; 
  }
  
}
