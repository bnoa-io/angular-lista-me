import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    UserViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxMaskDirective,
    MatTabsModule
  ],
  exports: [
    UserViewComponent
  ],
  providers: [
    provideNgxMask()
  ]
})
export class UserViewModule { }
