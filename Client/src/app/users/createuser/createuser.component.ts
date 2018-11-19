import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { createUser } from '../users'
import { RoleService } from '../../_services/role.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  constructor(private UserService : UserService, private rolService : RoleService) {}
  model = new createUser();
  errors = [];


  addUser(){
    console.log(this.model);
    
    this.UserService.createWithObjectUser(this.model).subscribe(
      data => {
          console.log("POST Request is successful ", data);
      },
        error => {
          this.errors = error.error.notifications;
     } 
  );;
  }

  getAllRoles(){
    this.rolService.getAll().subscribe(
      rol => this.model.rolesUser = rol
    );
  }
  onSubmit(){
    this.addUser();
  }
  
  ngOnInit() {
    this.getAllRoles();
  }

}
