import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FilterComponent } from './components/filter/filter.component';
import { UserListService } from './services/user-list.service';
import { User } from './models/user.model';
import { UserFilterService } from './services/user-list-filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  currentUser?: User;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['nome', 'cargo', 'contratacao', 'status', 'salario', 'action'];
  isOpen: boolean = false;
  users?: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _paginatorService: MatPaginatorIntl,
    private _router: Router,
    private _userService: UserListService,
    private _userFilterService: UserFilterService
  ){}

  ngOnInit(): void {
    this._refreshTable();
    this.dataSource.filterPredicate = function(data: User, filter: string): boolean {
      return data.nome.trim().toLowerCase().includes(filter);
    };
    this._userService.filter.subscribe(filter => {
      if (!!this.users.length && Object.values(filter).flat().some(Boolean)) this.dataSource.data = this._userFilterService.filterUsers(this.users, filter);
    });
    this._initPaginator();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  badgeHidden(): boolean {
    return this._userService.badgeHidden.getValue();
  }

  filter(): void {
    this._dialog.open(FilterComponent, { width: '600px' });
  }

  onClose(refresh: boolean): void {
    if (refresh) this._refreshTable();
    this.isOpen = false;
    this.currentUser = undefined;
    this._userService.closeSidenav.next();
  }

  onDelete(id: number): void {
    this._userService.deleteUser(id).subscribe(() => {
      this._snackBar.open('Operação realizada com sucesso!', 'OK', { duration: 5000 });
      this._refreshTable();
    });
  }

  onEdit(id: number): void {
    this._userService.getUser(id).subscribe((user: User) => {
      this.currentUser = user;
      this.isOpen = true;
    })
  }

  onView(user: User): void {
    this._userService.userView.next(user);
    this._router.navigateByUrl('listagem/perfil');
  }

  private _initPaginator(): void {
    this._paginatorService.itemsPerPageLabel = 'Usuários por página:';
    this._paginatorService.firstPageLabel = "Primeira página";
    this._paginatorService.lastPageLabel = "Ultima página"
    this._paginatorService.nextPageLabel = "Próxima página"
    this._paginatorService.previousPageLabel = "Página anterior";
  }

  private _refreshTable(): void {
    this._userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      if (!this._userService.badgeHidden.getValue()) {
        this.dataSource.data = this._userFilterService.filterUsers(this.users, this._userService.filter.getValue());
      } else {
        this.dataSource.data = users;
      }
    });
  }
}
