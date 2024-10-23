import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(`${this.apiUrl}/properties`)
      .pipe(catchError(this.handleError));
  }

  getPropertyById(id: string): Observable<Property> {
    return this.http
      .get<Property>(`${this.apiUrl}/properties/${id}`)
      .pipe(catchError(this.handleError));
  }

  addProperty(property: Property): Observable<Property> {
    return this.http
      .post<Property>(`${this.apiUrl}/properties`, property)
      .pipe(catchError(this.handleError));
  }

  deleteProperty(id: string): Observable<Property> {
    return this.http
      .delete<Property>(`${this.apiUrl}/properties/${id}`)
      .pipe(catchError(this.handleError));
  }
}
