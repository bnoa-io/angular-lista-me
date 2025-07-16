import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup = this._formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  visibility: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router
  ){}

  login(): void {
    this._router.navigate(['/listagem']);
  }
}
