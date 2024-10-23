import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'real-estate-platform';

  isCollapsed = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
