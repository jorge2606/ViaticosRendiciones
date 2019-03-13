import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from './../../_models/user';
import { AllSupervisorUserAgent } from './../../_models/supervisorUserAgent';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../_services/category.service';
import { DistributionService } from './../../_services/distribution.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { createUser } from '../users'
import { RoleService } from '../../_services/role.service';
import { DistributionBaseDto } from 'src/app/_models/distributions';
import { Router } from '@angular/router';
import { UsersComponent } from '../users.component';
import { Title } from '@angular/platform-browser';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
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
  categories : any;
  selectedCategoryId : number;
  passwordEmpty : boolean = true;
  passwordsAreEquals : boolean = true;
  submitted : boolean;
  validCheckbox : boolean = false;
  selectedSupervisorAgentId : number;
  allSupervisors : User[] = [];
  editSignatureHolograpich: any;

  constructor(
              private UserService : UserService, 
              private router : Router,
              private rolService : RoleService,
              private distributionService : DistributionService,
              private categoryService : CategoryService,
              private titleService : Title,
              private toastrService : ToastrService,
              private supervisorUserAgentService : SupervisorUserAgentService,
              private authService : AuthenticationService) {}


  getAllRoles(){
    this.rolService.getAll().subscribe(
      rol => this.model.rolesUser = rol
    );
  }

  getAllCategories(){
    this.categoryService.getallCategories()
    .subscribe(x => this.categories = x )
  }


  changeStateCheckbox(rol : any){
    this.validCheckbox = false;

    if (rol.rolBelongUser){
      rol.rolBelongUser = !rol.rolBelongUser;
      this.model.rolesUser.forEach(
        x => {
            var result = x.rolBelongUser.toString() == "true" ? true : false;
            if(result){
              this.validCheckbox = true;
              return;
            }
        }
      );
  
      if (!this.validCheckbox){
        this.toastrService.info('Debe seleccionar al menos un rol','',{timeOut : 1000, positionClass : 'toast-top-center'});
        this.submitted = false;
        return;
      }
    }
    
    this.validCheckbox = true;
    return;

  }
  
  onSubmit(){

    this.submitted = true;
    this.validCheckbox = false;
    this.model.rolesUser.forEach(
      x => {
          if(x.rolBelongUser){
            this.validCheckbox = true;
          }
      }
    );

    if (!this.validCheckbox){
      this.toastrService.info('Debe seleccionar al menos un rol','',{timeOut : 1000, positionClass : 'toast-top-center'});
      this.submitted = false;
      return;
    }

    if (this.model.dni.length < 11){
      this.toastrService.info('Faltan 1 o más dígitos en el campo Dni','',{timeOut : 1000, positionClass : 'toast-top-center'});
      this.submitted = false;
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

    if (!this.submitted){
      return;
    }

    this.titleService.setTitle('Crear Usuario - Perfil');
    /*this.UserService.createWithObjectUser(this.model).subscribe(
      data => {
          this.router.navigate(['/users']);
          this.toastrService.success("El usuario '"+this.model.userName+"' se ha guardado exitosamente.");
      },
        error => {
          this.errors = error.error.notifications;
     } 
    );*/
  }
  
  ngOnInit() {
    this.titleService.setTitle('Crear Usuario');
    this.editSignatureHolograpich = this.authService.userId('roles').find(x => x.value == 'user.editSignatureHolograpich');
    this.getAllRoles();
    this.getAllCategories();
    this.getAllUsersSupervisors();
    this.distributionService.allDistribution().subscribe(
      x => {
        this.distribution = x;
      }
    );
  }

  setTitleTabProfile(){
    this.titleService.setTitle('Crear Usuario - Perfil');
  }

  getAllUsersSupervisors(){
    this.supervisorUserAgentService.allSupervisors()
    .subscribe(x => {
      x.forEach(supervisor => {
        this.allSupervisors.push(supervisor.supervisors);
      });;
      
    });
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

}
