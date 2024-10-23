import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environment';
import { Observable, throwError } from 'rxjs';

export class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected getToken(): string | null {
    return localStorage.getItem('token');
  }

  protected getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  protected handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
