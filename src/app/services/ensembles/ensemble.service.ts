import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnsembleResponse } from 'src/app/models/ensemble-response';
import { Page } from 'src/app/models/page';
import { EnsembleRequest } from 'src/app/models/ensemble-request';


@Injectable({
  providedIn: 'root'
})
export class EnsembleService {
  private baseUrl = 'http://localhost:3333/api/v1/ensembles';

  constructor(private http: HttpClient) { }

  ajouterVetementAEnsemble(ensembleId: number, vetementId: number): Observable<EnsembleResponse> {
    return this.http.post<EnsembleResponse>(`${this.baseUrl}/${ensembleId}/vetements/${vetementId}`, null);
  }

  supprimerVetementDunEnsemble(ensembleId: number, vetementId: number): Observable<EnsembleResponse> {
    return this.http.delete<EnsembleResponse>(`${this.baseUrl}/${ensembleId}/vetements/${vetementId}`);
  }

  obtenirEnsemblesCreerParUser(idUtilisateur: number, page: number = 0, size: number = 10): Observable<Page<EnsembleResponse>> {
    return this.http.get<Page<EnsembleResponse>>(`${this.baseUrl}/utilisateur/${idUtilisateur}/ensembles?page=${page}&size=${size}`);
  }

  obtenirToutEnsembles(page: number = 0, size: number = 10): Observable<Page<EnsembleResponse>> {
    return this.http.get<Page<EnsembleResponse>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  creerUnEnsemble(ensemble: EnsembleRequest): Observable<EnsembleResponse> {
    return this.http.post<EnsembleResponse>(this.baseUrl, ensemble);
  }

  obtenirEnsemblesFavorisParUtilisateur(userId: number, page: number = 0, size: number = 10): Observable<Page<EnsembleResponse>> {
    return this.http.get<Page<EnsembleResponse>>(`${this.baseUrl}/favoris/utilisateur/${userId}?page=${page}&size=${size}`);
  }

  supprimerEnsemble(ensembleId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ensembleId}`);
  }

  marquerEnsembleCommeFavori(ensembleId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${ensembleId}/favori`, null);
  }

  modifierEnsemble(id: number, ensemble: EnsembleRequest): Observable<EnsembleResponse> {
    return this.http.put<EnsembleResponse>(`${this.baseUrl}/${id}`, ensemble);
  }

  getEnsembleById(id: number): Observable<EnsembleResponse> {
    return this.http.get<EnsembleResponse>(`${this.baseUrl}/${id}`);
  }
}
