import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Couleur } from 'src/app/models/Couleur';

@Injectable({
  providedIn: 'root'
})
export class CouleurService {

  private baseUrl = 'http://localhost:3333/api/v1/couleurs';

  constructor(private http: HttpClient) { }

  getAllColors(page: number = 0, size: number = 10): Observable<Page<Couleur>> {
    const url = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http.get<Page<Couleur>>(url);
  }

  getColorById(id: string): Observable<Couleur> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Couleur>(url);
  }
}
