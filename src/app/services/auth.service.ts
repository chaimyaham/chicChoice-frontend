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
  }
}
