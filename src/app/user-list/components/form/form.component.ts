import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from '../../services/user-list.service';
import { User } from '../../models/user.model';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Output() close = new EventEmitter<boolean>();

  filteredOptions: Observable<string[]>;
  form: FormGroup = this._fb.group({
    cargo: ['', Validators.required],
    contratacao: ['', Validators.required],
    nome: ['', Validators.required],
    salario: ['', Validators.required],
    status: [null, Validators.required],
    id: ''
  });
  positions: string[];
  today: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userService: UserListService
  ){}

  ngOnInit(): void {
    this._userService.getCargos().subscribe(positions => this.positions = positions);
    this.filteredOptions = this.cargo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this._userService.closeSidenav.pipe(switchMap(() => this._userService.getCargos())).subscribe((positions: string[]) => {
      this.positions = positions;
      this.form.reset();
      this.user = undefined;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes['user'].currentValue as User;
    if (!!this.user) this.form.patchValue(this.user);
    else this.form.reset();
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('minlength')) {
      const { actualLength, requiredLength } = control.errors['minlength'];
      return `O campo deve ter no mínimo ${actualLength}/${requiredLength} caracteres`
    };
    return "Este campo é obrigatório"
  }

  onClick(): void {
    let request: Observable<User> = this._userService.createUser(this.form.value);
    if (this.user) request = this._userService.updateUser(this.form.value)
    request.subscribe(() => {
      this._snackBar.open('Operação realizada com sucesso!', 'OK', { duration: 5000 });
      this.onClose(true);
    });
  }

  onClose(refresh: boolean = false): void {
    this.form.reset();
    this.user = undefined;
    this.close.emit(refresh);
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
}
