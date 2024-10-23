import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.authService.setAuthToken(response.access_token);
          this.authService.setAuthState(true);
          this.router.navigate(['/home']);
          this.loading = false;
          // this.snackBarService.openSnackbar('Login successful!');
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.loading = false;
          this.snackBarService.openSnackbar(this.errorMessage, 'error');
        }
      );
    }
  }
}
