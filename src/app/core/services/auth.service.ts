import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  admin: {
    id: number;
    nome: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3333';
  private readonly TOKEN_KEY = 'auth_token';

  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.API_URL}/auth/login`, { email, senha }).pipe(
      tap(response => {
        this.setToken(response.token);
        this._isAuthenticated.next(true);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this._isAuthenticated.next(false);
    this._router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
