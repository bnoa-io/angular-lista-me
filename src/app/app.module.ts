import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { UserListModule } from './user-list/user-list.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listagem', component: UserListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // rota padrão
  { path: '**', redirectTo: 'login' } // fallback
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
    UserListModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
