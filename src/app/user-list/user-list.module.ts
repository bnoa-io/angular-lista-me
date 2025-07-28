import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';

import { UserListComponent } from './user-list.component';
import { FormModule } from './components/form/form.module';
import { FilterModule } from './components/filter/filter.module';
import { UserListService } from './services/user-list.service';
import { UserFilterService } from './services/user-list-filter.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserListComponent },
];


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    FormModule,
    FilterModule,
    MatDialogModule,
    MatBadgeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UserListComponent
  ],
  providers: [
    UserListService,
    UserFilterService
  ]
})
export class UserListModule { }
