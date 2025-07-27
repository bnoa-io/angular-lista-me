import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { UserListModule } from './user-list/user-list.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listagem', component: UserListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    UserListModule,
    NgxMaskDirective
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' }
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        display: {
        dateA11yLabel: 'LL',
        dateInput: 'L',
        monthYearA11yLabel: 'MMMM YYYY',
        monthYearLabel: 'MMMM / YYYY'
        },
        parse: {
          dateInput: 'LL'
        }
      }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
