import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  filterUsers(users: User[], filter: Partial<Filter>): User[] {
    const { contratacao, comparacao, periodo, salario, status, cargos } = filter;

    const listFiltered = users.filter(user => {
      const matchCargo = !cargos.length || cargos.includes(user.cargo);
      const matchStatus = status === 'ambos' || (user.status ? (status === 'ativo') : (status === 'desativado'));
      const matchContratacao = !contratacao || this._compareDate(user.contratacao, contratacao, periodo);
      const matchSalario = !salario || this._compareNumber(user.salario, salario, comparacao);

      return matchCargo && matchStatus && matchContratacao && matchSalario;
    });
    return listFiltered;
  }

  private _compareDate(dateA: Date, dateB: Date, comparacao: string): boolean {
    const a = new Date(dateA).getTime();
    const b = new Date(dateB).getTime();
    switch (comparacao) {
      case '>': return a > b;
      case '<': return a < b;
      case '=': return a == b;
      default: return true;
    }
  }

  private _compareNumber(a: number, b: number, comparacao: string): boolean {
    switch (comparacao) {
      case '>': return a > b;
      case '<': return a < b;
      case '=': return a == b;
      default: return true;
    }
  }
}
