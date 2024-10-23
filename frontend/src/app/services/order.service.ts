import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  placeOrder(order: Order): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/orders`, order)
      .pipe(catchError(this.handleError));
  }
}
