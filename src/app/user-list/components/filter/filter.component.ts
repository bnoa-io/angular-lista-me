import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserListService } from '../../services/user-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  form: FormGroup = this._fb.group({
    cargos: [null],
    comparacao: ['menor'],
    contratacao: [''],
    status: [null],
    salario: ['']
  });
  getCargos: Observable<string[]> = this._userService.getCargos();
  today: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _userService: UserListService
  ){}

  ngOnInit(): void {
    this.form.patchValue(Object.assign({}, this._userService.filter.getValue()));
  }

  action(filter: boolean): void {
    if (!filter) return this.form.reset();
    this._userService.filter.next(this.form.value);
  }

  isButtonDisabled(): boolean {
    const formHasValue = Object.values(this.form.value).flat().some(Boolean);
    const stateHasValue = Object.values(this._userService.filter.getValue()).flat().some(Boolean);
    return !formHasValue && !stateHasValue;
  }

  get cargos(): AbstractControl | null {
    return this.form.get('cargos');
  }
}
