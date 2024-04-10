import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature, Comment } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getFeatures(magType: string, page: number, perPage: number): Observable<{data: Feature[]}> {
    return this.http.get<{data: Feature[]}>(`${this.BASE_URL}/features?mag_type=${magType}&page=${page}&per_page=${perPage}`);
  }
  createComment(featureId: number, body: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/features/${featureId}/comments`, { comment: { body } });
  }
}
