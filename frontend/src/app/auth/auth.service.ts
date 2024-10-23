import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private readonly AUTH_KEY = 'isAuthenticated';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = this.getAuthState();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  register(credentials: {
    email: string;
    name: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  setAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setAuthState(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(isAuthenticated));
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  private getAuthState(): boolean {
    const storedState = localStorage.getItem(this.AUTH_KEY);
    return storedState ? JSON.parse(storedState) : false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setAuthState(false);
    this.router.navigate(['/login']);
  }
}
