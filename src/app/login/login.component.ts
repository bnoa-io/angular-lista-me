import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  visibility: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  login(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.form.value;

    this._authService.login(email, password).subscribe({
      next: () => {
        this._router.navigate(['/listagem']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.status === 401
          ? 'Credenciais inválidas'
          : 'Erro ao fazer login. Tente novamente.';
      }
    });
  }

  onKeyUp(key: string): void {
    if (key === 'Enter' && this.form.valid) this.login();
  }
}
