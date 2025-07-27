import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  form: FormGroup = this._fb.group({
    name: [''],
    position: [''],
    hiringDate: [''],
    status: [null],
    salary: ['']
  });

  constructor(
    private _fb: FormBuilder
  ){}
}
