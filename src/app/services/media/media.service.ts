import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from 'src/app/models/media';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private baseUrl = 'http://localhost:3333/api/v1/media';

  constructor(private http: HttpClient) { }

  uploadMedia(file: File): Observable<Media> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Media>(this.baseUrl, formData);
  }

  getMediaById(id: number): Observable<Media> {
    return this.http.get<Media>(`${this.baseUrl}/${id}`);
  }

  updateMedia(file: File, id: number): Observable<Media> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.put<Media>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMediaById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
