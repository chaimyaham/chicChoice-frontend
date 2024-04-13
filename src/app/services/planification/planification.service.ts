import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Planification } from 'src/app/models/planification';


@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  private baseUrl = 'http://localhost:3333/api/v1/planfications';

  constructor(private http: HttpClient) { }

  ajouterPlanification(planification: Planification): Observable<Planification> {
    return this.http.post<Planification>(this.baseUrl, planification);
  }

  ajouterUnEnsembleAUnePlanification(idPlanification: number, idEnsemble: number): Observable<Planification> {
    const params = new HttpParams()
      .set('idPlanification', idPlanification.toString())
      .set('idEnsemble', idEnsemble.toString());
    return this.http.post<Planification>(`${this.baseUrl}/ajouter-ensemble-planification`, params);
  }

  getAllPlanififcationByUserId(userId: number, page: number, size: number): Observable<Page<Planification>> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Planification>>(this.baseUrl, { params });
  }

  getAll(page: number, size: number): Observable<Page<Planification>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Planification>>(`${this.baseUrl}/all`, { params });
  }

  updatePlanification(planification: Planification, id: number): Observable<Planification> {
    return this.http.put<Planification>(`${this.baseUrl}/${id}`, planification);
  }

  supprimerEnsembleDePlanification(idPlanification: number, idEnsemble: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPlanification}/ensembles/${idEnsemble}`);
  }

  supprimerPlanification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  getPlanificationByDateAndUtilisateurId(date: Date, userId: number): Observable<Planification> {
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return this.http.get<Planification>(`${this.baseUrl}/utilisateur/${userId}/date/${formattedDate}`);
  }

  getPlanificationsWithEnsembleId(ensembleId: number): Observable<Planification[]> {
    return this.http.get<Planification[]>(`${this.baseUrl}/all/ensemble/${ensembleId}`);
  }
  getPlanificationById(id: number): Observable<Planification>{
    return this.http.get<Planification>(`${this.baseUrl}/${id}`);
  }
}
