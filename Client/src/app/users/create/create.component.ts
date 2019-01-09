import { DistributionService } from './../../_services/distribution.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { createUser } from '../users'
import { RoleService } from '../../_services/role.service';
import { DistributionBaseDto } from 'src/app/_models/distributions';
@Component({
  selector: 'app-createuser',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateuserComponent implements OnInit {

  model = new createUser();
  distribution : DistributionBaseDto[];
  errors : any;
  selecteddistributionId : number;

  constructor(private UserService : UserService, private rolService : RoleService,
    private distributionService : DistributionService) {}


  addUser(){    
    this.UserService.createWithObjectUser(this.model).subscribe(
      data => {
          console.log("POST Request is successful ", data);
      },
        error => {
          this.errors = error.error.notifications;
     } 
    );

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

    this.distributionService.allDistribution().subscribe(
      x => {
        this.distribution = x;
      }
    );
  }

}
