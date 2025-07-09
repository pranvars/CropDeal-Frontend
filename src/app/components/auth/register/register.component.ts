import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';// Import AuthService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false; // Added to handle loading state
  errorMessage: string = ''; // For error handling

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required], // Farmer or Dealer selection
      location: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]], // 9 to 18 digits
      bankIfscCode: ['', [Validators.required, Validators.maxLength(20)]] // Ensure it matches template
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true; // Show loading state

    this.authService.register(this.registerForm.value).subscribe({
      next: (response : any) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']); // Navigate to login page after successful registration
      },
      error: (error: any) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      },
      complete: () => {
        this.loading = false; // Hide loading state
        this.submitted = false;
        this.registerForm.reset();
      }
    });
  }

  // Helper method to access form controls in the template
  get f() {
    return this.registerForm.controls as { [key: string]: any };
  }
}
