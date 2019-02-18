import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
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

  

  constructor(
            private router : Router,
            private userService: UserService,
            private titleService : Title,
            private toastrService : ToastrService
            ){
              this.currentUrl = this.router.url;
  }
  model = new modifyUser;
  submitted : boolean;
  passwordsAreEquals : Boolean = true;
  passwordEmpty : boolean = true;
  currentUrl : string;
  validCuit : Boolean;


  onChange(rol){
    console.log(rol.rolBelongUser);
  }

   onSubmit() {
    this.validateCuil();
    /** this.submitted = true;

    if (this.model.password || this.model.repeatPassword){
        if (this.model.password !== this.model.repeatPassword){
          this.passwordsAreEquals = false;
            this.toastrService
            .error('Las contraseñas no coinciden','',{timeOut : 3000, positionClass : 'toast-top-center'})
          this.submitted = false;
        }else{
          this.passwordsAreEquals = true;
        }
    }

    if (!this.submitted){
      return;
    }

    this.userService.updateProfileUsers(this.model).subscribe(
      result => {
        this.toastrService
          .success('El perfil se actualizó correctamente','',{timeOut : 3000, positionClass : 'toast-top-center'})
          this.router.navigate([this.currentUrl]);
      },
        error => {
         console.log(error);
        }      
    );
    this.router.navigate([UsersComponent]);**/
  }
  
  ngOnInit() {
    this.titleService.setTitle('Mi Perfil');
    this.userService.getById().subscribe(i => {
        this.model.dni = i.dni,
        this.model.userName = i.userName,
        this.model.id = i.id,
        this.model.phoneNumber = i.phoneNumber,
        this.model.rolesUser = i.rolesUser,
        this.model.prefixCuil = i.prefixCuil,
        this.model.suffixCuil = i.suffixCuil,
        this.model.firstName = i.firstName,
        this.model.lastName = i.lastName
    })
  }

  setTitleTab(){
    this.titleService.setTitle('Mi Perfil');
  }

  comparePassword(){
    if (!this.model.password && !this.model.repeatPassword){
      this.passwordEmpty = true;
      this.passwordsAreEquals = true;
      return;
    }
    
    this.passwordsAreEquals = this.model.password === this.model.repeatPassword;
    this.passwordEmpty = false;
    return;
  }

  validateCuil(){
    this.validCuit = false;
    var dniArray : number[] = [0,0,0,0,0,0,0,0,0,0];
    var cuit : string = this.model.prefixCuil.toString()+this.model.dni.toString();
    var base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var result = 0;
    var result2 = 0;
    var codVerificacion = this.model.suffixCuil;

    dniArray.forEach((item,index) => {
        result = result + (base[index] * parseInt(cuit.charAt(index)));
    });
    codVerificacion = 11 - (result % 11);
    if (codVerificacion == 11){
      codVerificacion = 0;
    }

    this.validCuit = parseInt(cuit.charAt(9)) == codVerificacion;
  }
}