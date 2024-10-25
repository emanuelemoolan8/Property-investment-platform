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
import { SnackBarService } from '../services/snackbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService) {}

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

        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized access. Please log in again.';
            break;
          case 403:
            errorMessage = 'Access forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'An internal server error occurred.';
            break;
          default:
            errorMessage =
              error.error?.message || 'An unexpected error occurred.';
            break;
        }
        console.log(errorMessage);
        this.snackBarService.openSnackbar(errorMessage, 'error');

        // Optionally, do not throw an error, just return an observable
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
