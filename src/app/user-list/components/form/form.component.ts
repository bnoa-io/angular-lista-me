import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup = this._fb.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    hiringDate: ['', Validators.required],
    status: [null, Validators.required],
    salary: ['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder
  ){}

  ngOnInit(): void {

  }

  onClick(): void {
    console.log(this.form.value)
  }
}
