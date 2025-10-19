import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginPayload } from '../models/login-payload.model';
import { APIResponse } from '../models/common/APIResponse.model';
import { AdminUserDTO } from '../models/AdminUser/AdminUserDTO';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  private _token = signal<string | null>(localStorage.getItem(this.tokenKey));
  readonly isLoggedIn = computed(() => !!this._token());
  public userProfile = signal<AdminUserDTO | null>(null);
  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload) {
    return this.http
      .post<APIResponse>(`${environment.apiUrl}/admin/auth/login`, payload)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.data?.accessToken);
          this._token.set(res.data?.accessToken);
        })
      );
  }

  getUserProfile() {
    return this.http
      .get<APIResponse>(`${environment.apiUrl}/admin/user/profile`)
      .pipe(
        tap((res) => {
          this.userProfile.set(res.data);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return this._token();
  }
}
