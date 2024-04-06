import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/Utilisateur';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:String="http://localhost:8088/api/v1/users";
  constructor(private http: HttpClient) {
    
   }
   login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      username,
      password
    }, httpOptions);
  }

  register(utilisateur:Utilisateur): Observable<any> {
    return this.http.post(`${this.url}/signup`,utilisateur, httpOptions);
  }
}
