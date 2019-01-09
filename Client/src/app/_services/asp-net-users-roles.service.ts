import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRoles } from '../_models/userRoles';

@Injectable({
  providedIn: 'root'
})
export class AspNetUsersRolesService {

  constructor(private http : HttpClient) { }

  getAllUsersRoles(){
    return this.http.get<UserRoles[]>("http://localhost:63098/api/AspNetUserRoles/AllRoles");
  }
}
