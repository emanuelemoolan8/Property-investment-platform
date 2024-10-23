import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, AddBalanceResponse } from '../models/user.model';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUserDetails(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/users/me`)
      .pipe(catchError(this.handleError));
  }

  addBalance(amount: number): Observable<AddBalanceResponse> {
    return this.http
      .post<AddBalanceResponse>(`${this.apiUrl}/users/add-balance`, { amount })
      .pipe(catchError(this.handleError));
  }
}
