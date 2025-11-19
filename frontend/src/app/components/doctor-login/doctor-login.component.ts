import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.scss'
})
export class DoctorLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Check if already logged in
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(['/doctor/patients']);
    }
  }

  onSubmit(): void {
    this.error = null;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.apiService.loginDoctor(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('doctorToken', response.token);
        this.router.navigate(['/doctor/patients']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid email or password';
        console.error(err);
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
