import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  roles = [
    { value: 'INVESTOR', viewValue: 'Investor' },
    { value: 'PROPERTY_MANAGER', viewValue: 'Property Manager' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['INVESTOR', [Validators.required]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.snackBarService.openSnackbar('Registration successful!');
          this.router.navigate(['/login']);
          this.loading = false;
        },
        (error) => {
          console.error('Registration failed:', error);
          this.errorMessage =
            'Registration failed. Please try again. ' +
            (error.error?.message || error.message || 'Unknown error');
          this.snackBarService.openSnackbar(this.errorMessage, 'error');
          this.loading = false;
          this.registerForm.reset();
        }
      );
    } else {
      this.snackBarService.openSnackbar(
        'Please fix the errors in the form.',
        'error'
      );
    }
  }
}
