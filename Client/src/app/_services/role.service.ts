import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../_models/roles';
import { rolesBelongUser } from '../users/users';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<rolesBelongUser[]>("http://localhost:63098/api/Role/getAll");
  }

  getAllRoles(){
    return this.http.get<Roles>("http://localhost:63098/api/Role/AllRoles");
  }
}