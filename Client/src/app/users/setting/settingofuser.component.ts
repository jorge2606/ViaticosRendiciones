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


  onChange(rol){
    console.log(rol.rolBelongUser);
  }

   onSubmit() {
    this.submitted = true;

    if (!this.validateCuil()){
      this.toastrService.info('El número de cuit/cuil no es válido');
      this.submitted = false;
      return;
    }

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

    if (this.model.dni.length < 11){
        this.toastrService.info('Faltan 1 o más dígitos en el campo Dni','',{timeOut : 1000, positionClass : 'toast-top-center'});
        this.submitted = false;
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
         this.router.navigate([this.currentUrl]);
        }      
    );
  }
  
  ngOnInit() {
    this.titleService.setTitle('Mi Perfil');
    this.userService.getById().subscribe(i => {
        this.model.dni = i.dni,
        this.model.userName = i.userName,
        this.model.id = i.id,
        this.model.phoneNumber = i.phoneNumber,
        this.model.rolesUser = i.rolesUser,
        this.model.firstName = i.firstName,
        this.model.lastName = i.lastName,
        this.model.distributionId = i.distributionId,
        this.model.categoryId = i.categoryId
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
    var dniArray : number[] = [0,0,0,0,0,0,0,0,0,0];
    var cuit : string = this.model.dni;
    var base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var result = 0;
    var result2 = 0;
    var codVerificacion = parseInt(cuit.charAt(10));

    dniArray.forEach((item,index) => {
        result = result + (base[index] * parseInt(cuit.charAt(index)));
    });
    codVerificacion = 11 - (result % 11);
    if (codVerificacion == 11){
      codVerificacion = 0;
    }
    return parseInt(cuit.charAt(10)) == codVerificacion;
  }
}