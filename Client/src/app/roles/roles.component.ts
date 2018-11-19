import { Component, OnInit } from '@angular/core';
import { Roles } from '../_models/roles';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    modelRoles : Roles;

    constructor(private rolesService : RoleService){}
    ngOnInit(){
      this.rolesService.getAllRoles().subscribe(x=>
        this.modelRoles = x
        );
    }
}
