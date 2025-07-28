import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  badgeHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  closeSidenav: Subject<void> = new Subject();
  filter: BehaviorSubject<Partial<Filter>> = new BehaviorSubject<Partial<Filter>>({});

  constructor(
    private _htpp: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this._htpp.post<User>('http://localhost:3333/usuarios', user);
  }

  getCargos(): Observable<string[]> {
    return this._htpp.get<string[]>('http://localhost:3333/usuarios/cargos');
  }

  getUsers(): Observable<User[]> {
    return this._htpp.get<User[]>('http://localhost:3333/usuarios');
  }

  getUser(id: number): Observable<User> {
    return this._htpp.get<User>(`http://localhost:3333/usuarios/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this._htpp.put<User>(`http://localhost:3333/usuarios/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this._htpp.delete<any>(`http://localhost:3333/usuarios/${id}`);
  }

}
