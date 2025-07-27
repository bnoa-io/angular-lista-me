import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListService } from '../../services/user-list.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Output() close = new EventEmitter<boolean>();

  form: FormGroup = this._fb.group({
    cargo: ['', Validators.required],
    contratacao: ['', Validators.required],
    nome: ['', Validators.required],
    salario: ['', Validators.required],
    status: [null, Validators.required],
    id: ''
  });
  today: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _userService: UserListService
  ){}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes['user'].currentValue as User;
    if (!!this.user) this.form.patchValue(this.user);
    else this.form.reset();
  }

  onClick(): void {
    let request: Observable<User> = this._userService.createUser(this.form.value);
    if (this.user) request = this._userService.updateUser(this.form.value)
    request.subscribe(() => this.onClose(true));
  }

  onClose(refresh: boolean = false): void {
    this.form.reset();
    this.user = undefined;
    this.close.emit(refresh);
  }
}
