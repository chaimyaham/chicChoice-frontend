import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VetementResponse } from 'src/app/models/vetement-response';
import { VetementRequest } from 'src/app/models/vetement-request';
import { Category } from 'src/app/models/category';
import { Page } from 'src/app/models/page';


@Injectable({
  providedIn: 'root'
})
export class VetementService {

  private baseUrl = 'http://localhost:3333/api/v1/vetements';

  constructor(private http: HttpClient) { }

  getAllVetements(page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }

  getVetementById(id: number): Observable<VetementResponse> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<VetementResponse>(url);
  }

  createVetement(vetement: VetementRequest): Observable<VetementResponse> {
    return this.http.post<VetementResponse>(this.baseUrl, vetement);
  }

  deleteVetementById(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  marquerVetementCommeFavori(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/favori`;
    return this.http.post<void>(url, {});
  }

  getVetementsByCategory(category: Category, page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}/categorie/${category}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }

  getVetementsByCategoryAndUser(category: Category, userId: number, page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}/categorie/${category}/utilisateur/${userId}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }

  getVetementsFavorisByUserId(userId: number, page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}/favoris/utilisateur/${userId}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }

  modifierVetement(id: number, vetement: VetementRequest): Observable<VetementResponse> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<VetementResponse>(url, vetement);
  }

  getVetementsByCouleurAndUser(couleurId: string, userId: number, page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}/couleur/${couleurId}/utilisateur/${userId}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }
  getAllVetementsByUserId(utilisateurId : number, page: number, size: number): Observable<Page<VetementResponse>> {
    const url = `${this.baseUrl}/utilisateur/${utilisateurId}?page=${page}&size=${size}`;
    return this.http.get<Page<VetementResponse>>(url);
  }
}