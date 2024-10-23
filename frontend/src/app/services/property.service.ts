import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties`, {
      headers: this.getHeaders(),
    });
  }

  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/properties`, property, {
      headers: this.getHeaders(),
    });
  }

  deleteProperty(id: string): Observable<Property> {
    return this.http.delete<Property>(`${this.apiUrl}/properties/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
