import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../users.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { modifyUser } from '../users';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-settingofuser',
  templateUrl: './settingofuser.component.html',
  styleUrls: ['./settingofuser.component.css']
})
export class SettingofuserComponent implements OnInit {

  

  constructor(private router : Router,
    private route: ActivatedRoute, 
    private userService: UserService) {
  }
  model = new modifyUser;
  id: number=0;


  onChange(rol){
    console.log(rol.rolBelongUser);
  }

   onSubmit() {
    this.model.id = this.id;
    this.userService.updateProfileUsers(this.model).subscribe(
      result => {
        this.router.navigate(['/users']);
      },
        error => {
         console.log(error);
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
