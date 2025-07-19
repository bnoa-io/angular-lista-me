import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  name: string;
  position: string;
  hiringDate: string;
  status: boolean;
  salary: number;
}

const ELEMENT_DATA: User[] = [
  { name: 'Brayan Apeles', position: 'Administrador', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'João da Silva', position: 'Front-end Developer', status: false, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Simão Nunes', position: 'Back-end Developer', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Pedro Oliveira', position: 'Product Owner', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'André Silva', position: 'Quality Assurance', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Tiago Costa', position: 'Quality Assurance', status: false, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Felipe Ferreira', position: 'Quality Assurance', status: false, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Bartolomeu Dias', position: 'Tech lead', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Tomé Duarte', position: 'Marketing', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Mateus Souza', position: 'Marketing', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Tiago Esperança', position: 'Marketing', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Tadeu Messias', position: 'Financial', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Judas Priest', position: 'Financial', status: false, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Ozzy Osborn', position: 'Designer', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Corey Taylor', position: 'Front-end Developer', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Patrícia Carla', position: 'Back-end Developer', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
  { name: 'Ana Nunes', position: 'Back-end Developer', status: true, hiringDate: '2025-07-16T15:30:00', salary: 5500 },
];

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['name', 'position', 'hiringDate', 'status', 'salary', 'action'];
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _paginatorService: MatPaginatorIntl
  ){}

  ngOnInit(): void {
    this.dataSource.filterPredicate = function(data: User, filter: string): boolean {
      return data.name.trim().toLowerCase().includes(filter);
    };
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

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  private _initPaginator(): void {
    this._paginatorService.itemsPerPageLabel = 'Usuários por página:';
    this._paginatorService.firstPageLabel = "Primeira página";
    this._paginatorService.lastPageLabel = "Ultima página"
    this._paginatorService.nextPageLabel = "Próxima página"
    this._paginatorService.previousPageLabel = "Página anterior";
  }
}
