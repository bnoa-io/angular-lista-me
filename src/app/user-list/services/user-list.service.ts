import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  // state

  constructor(
    private _htpp: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this._htpp.post<User>('http://localhost:3333/usuarios', user);
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
