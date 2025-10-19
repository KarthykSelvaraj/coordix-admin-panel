import { Component, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginPayload } from '../../../core/models/login-payload.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.initializeForm();
  }
  loginForm!: FormGroup;
  year = new Date().getFullYear();
  fieldTextType = signal(false);
  loading = signal(false);

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      loginId: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      isLogged: this.fb.control(false, { nonNullable: true }),
    });
  }

  toggleFieldTextType() {
    this.fieldTextType.set(!this.fieldTextType());
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload: LoginPayload = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password,
      isLogged: this.loginForm.value.isLogged,
    };

    this.authService.login(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        alert('Login failed: ' + err.message);
      },
    });
  }
}
