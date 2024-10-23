import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401) {
          errorMessage = 'Unauthorized access. Please log in again.';
        } else if (error.status === 403) {
          errorMessage = 'Access forbidden. You do not have permission.';
        } else if (error.status === 404) {
          errorMessage = 'Resource not found.';
        } else if (error.status === 500) {
          errorMessage = 'An internal server error occurred.';
        } else {
          errorMessage = 'An unexpected error occurred. Please try again.';
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
