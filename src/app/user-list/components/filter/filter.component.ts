import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UserListService } from '../../services/user-list.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  form: FormGroup = this._fb.group({
    cargos: [[]],
    comparacao: ['>', Validators.required],
    contratacao: [''],
    periodo: ['<', Validators.required],
    status: ['ambos', Validators.required],
    salario: ['']
  });
  getCargos: Observable<string[]> = this._userService.getCargos();
  today: Date = new Date();

  constructor(
    private _dialog: MatDialogRef<FilterComponent>,
    private _fb: FormBuilder,
    private _userService: UserListService
  ){}

  ngOnInit(): void {
    this.form.patchValue(Object.assign({}, this._userService.filter.getValue()));
  }

  action(filter: boolean): void {
    this._userService.badgeHidden.next(!filter);
    if (!filter) this.form.reset({ cargos: [], comparacao: '>', contratacao: '', periodo: '<', status: 'ambos', salario: '' });
    this._userService.filter.next(this.form.value);
    this._dialog.close();
  }

  get cargos(): AbstractControl | null {
    return this.form.get('cargos');
  }
}
