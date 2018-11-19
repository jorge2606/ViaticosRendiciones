import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateRoleClaimPermission } from '../_models/update-role-claim-permission';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {

  constructor(private http: HttpClient) { }

  getAllRoleClaims(id: string) {
    return this.http.get<any[]>('http://localhost:63098/api/Role/getallClaims?id=' + id);
  }

  saveRoleClaims(model: UpdateRoleClaimPermission) {
    this.http.put('http://localhost:63098/api/Role/UpdateClaims/', model).subscribe(
      data => {

      },
      error => {
        console.log("Error", error);
      }
    );
  }
}
