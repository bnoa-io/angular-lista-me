import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { UserListService } from '../../services/user-list.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  user: User = this._userService.userView.getValue();
  form: FormGroup = this._fb.group({
    cargo: [this.user.cargo, Validators.required],
    contratacao: [this.user.contratacao, Validators.required],
    nome: [this.user.nome, Validators.required],
    salario: [this.user.salario, Validators.required],
    status: [this.user.status, Validators.required],
    id: this.user.id
  });
  positions: string[];
  today: Date = new Date();

  previewUrl: string | null = null;
  isUploading = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _userService: UserListService
  ){}

  ngOnInit(): void {
    this._userService.getCargos().subscribe(positions => this.positions = positions);
    this.filteredOptions = this.cargo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('minlength')) {
      const { actualLength, requiredLength } = control.errors['minlength'];
      return `O campo deve ter no mínimo ${actualLength}/${requiredLength} caracteres`
    };
    return "Este campo é obrigatório"
  }

  onClick(): void {
    this._userService.updateUser(this.form.value).subscribe((updatedUser) => {
      this.user = { ...this.user, ...updatedUser };
      this._snackBar.open('Operação realizada com sucesso!', 'OK', { duration: 5000 });
    });
  }

  return(): void {
    this._router.navigateByUrl('listagem');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.positions?.filter(position => position.toLowerCase().includes(filterValue));
  }

  get cargo(): AbstractControl {
    return this.form.get('cargo');
  }

  get nome(): AbstractControl {
    return this.form.get('nome');
  }

  get fotoUrl(): string {
    if (this.previewUrl) return this.previewUrl;
    if (this.user.foto_url) return `http://localhost:3333${this.user.foto_url}`;
    return 'assets/undraw-profile-default.svg';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.isUploading = true;
      this._userService.uploadFoto(this.user.id, file).subscribe({
        next: (response) => {
          this.user.foto_url = response.foto_url;
          this._snackBar.open('Foto atualizada com sucesso!', 'OK', { duration: 3000 });
          this.isUploading = false;
        },
        error: () => {
          this._snackBar.open('Erro ao enviar foto', 'OK', { duration: 3000 });
          this.isUploading = false;
          this.previewUrl = null;
        }
      });
    }
  }
}
