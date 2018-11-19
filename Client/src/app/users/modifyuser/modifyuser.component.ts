import { UsersComponent } from './../users.component';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { UserService } from './../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, modifyUser } from '../users';


@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.css']
})
export class ModifyuserComponent implements OnInit {

  id: number;

  constructor(private router : Router,private route: ActivatedRoute, private userService: UserService) {
  }
  model = new modifyUser;
  

  onChange(rol){
    console.log(rol.rolBelongUser);
  }
   onSubmit() {
    this.model.id = this.id;
    this.userService.updateUsers(this.model).subscribe(
      result => {
        this.router.navigate(['/users']);
      },
        error => {
         // this.errors = error.error.notifications;
        }      
    );
    this.router.navigate([UsersComponent]);
  }
  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.userService.getById(this.id).subscribe(i => {
        this.model.dni = i.dni,
        this.model.userName = i.userName,
        this.model.id = i.id,
        this.model.phoneNumber = i.phoneNumber,
        this.model.rolesUser = i.rolesUser;
    })

  }
}
