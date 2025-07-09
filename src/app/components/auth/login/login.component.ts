import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ FIX: Explicitly return AbstractControl
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        const role = response.role.roleName; // ✅ Extract role dynamically
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('role', JSON.stringify(response.role)); 
        sessionStorage.setItem('token', response.token);
        
        // ✅ Redirect based on role
        if (role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'Farmer') {
          this.router.navigate(['/farmer-dashboard']);
        } else if (role === 'Dealer') {
          this.router.navigate(['/dealer-dashboard']);
        } else {
          this.router.navigate(['/']); // Default fallback
        }
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
