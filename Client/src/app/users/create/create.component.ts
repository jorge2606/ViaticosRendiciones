import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from './../../_models/user';
import { AllSupervisorUserAgent } from './../../_models/supervisorUserAgent';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../_services/category.service';
import { DistributionService } from './../../_services/distribution.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { createUser, rolesBelongUser } from '../users'
import { RoleService } from '../../_services/role.service';
import { DistributionBaseDto } from 'src/app/_models/distributions';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersComponent } from '../users.component';
import { Title } from '@angular/platform-browser';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
import { FormGroup } from '@angular/forms';
import { ClaimsService } from 'src/app/_services/claims.service';
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
  validCheckbox : boolean = true;
  selectedSupervisorAgentId : number;
  selectedSupervisorAgentId2 : number;
  allSupervisors : User[] = [];
  editSignatureHolograpich: any;
  supervisor1 : boolean;
  supervisor2 : boolean;
  id : number;

  @ViewChild('userForm') userForm : any;

  constructor(
              private UserService : UserService, 
              private router : Router,
              private route : ActivatedRoute,
              private rolService : RoleService,
              private distributionService : DistributionService,
              private categoryService : CategoryService,
              private titleService : Title,
              private toastrService : ToastrService,
              private supervisorUserAgentService : SupervisorUserAgentService,
              private authService : AuthenticationService,
              private claimService : ClaimsService) {}


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
    var valueRol = rol.rolBelongUser;

    var ministro = this.model.rolesUser.find(rolStatus =>  rolStatus.rolBelongUser == true && rolStatus.name == this.claimService.rolMinistro );
    var admin = this.model.rolesUser.find(rolStatus => rolStatus.rolBelongUser == true && rolStatus.name == this.claimService.rolAdmin );
    var supervisor = this.model.rolesUser.find(rolStatus => rolStatus.rolBelongUser == true && rolStatus.name == this.claimService.rolSupervisor );
    var agente = this.model.rolesUser.find(rolStatus => rolStatus.rolBelongUser == true && rolStatus.name == this.claimService.rolAgente );
    
    var result;
    //CAMBIO DE VALOR AL CHECKBOX
    if (rol.rolBelongUser){
      rol.rolBelongUser = !rol.rolBelongUser;
      this.model.rolesUser.forEach(
        x => {
            result = x.rolBelongUser.toString() == "true" ? true : false;
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

    if (!valueRol){
        if (  
            (rol.name == this.claimService.rolMinistro && !valueRol == true) || 
            (rol.name == this.claimService.rolAdmin && !valueRol == true) ||
            (ministro || admin) || (ministro && agente) || 
            (ministro && agente && supervisor) ||
            (admin && agente) || (admin && agente && supervisor) 
          ){
              this.supervisor1 = true;
              this.supervisor2 = true;
        }else if( 
              (!ministro && !admin && 
              !(rol.name == this.claimService.rolMinistro && !valueRol == true) && 
              !(rol.name == this.claimService.rolAdmin && !valueRol == true) && 
              (supervisor ||  (rol.name == this.claimService.rolSupervisor && !valueRol == true)) 
            ) || 
            ( (supervisor && agente) || 
              ((rol.name == this.claimService.rolSupervisor) && agente) )
            ){
              this.supervisor1 = false;
              this.supervisor2 = true;
        }else if(!ministro && !admin && !supervisor && 
              !(rol.name == this.claimService.rolMinistro && !valueRol == true) && 
              !(rol.name == this.claimService.rolAdmin && !valueRol == true) && 
              !(rol.name == this.claimService.rolSupervisor && !valueRol == true) && 
              (agente ||  (rol.name == this.claimService.rolAgente))
              ){
              this.supervisor1 = false;
              this.supervisor2 = false;
        }
      }else{
        if ( 
            (this.claimService.rolMinistro != rol.name) &&
            (this.claimService.rolAdmin != rol.name) &&
            ( (ministro || admin) || 
            (ministro && agente) || 
            (ministro && supervisor) ||
            (ministro && agente && supervisor) ||
            (admin && agente) || 
            (admin && supervisor) || 
            (admin && agente && supervisor) )
          ){
              this.supervisor1 = true;
              this.supervisor2 = true;
        }else if( 
            (this.claimService.rolSupervisor != rol.name) &&
            ( (!ministro && !admin && supervisor) || (supervisor && agente) )
            ) {
              this.supervisor1 = false;
              this.supervisor2 = true;
        }else if(
            //(!ministro && !admin && !supervisor && agente) &&
            (this.claimService.rolAgente != rol.name)
            ){
              this.supervisor1 = false;
              this.supervisor2 = false;
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

    if (this.model.supervisorAgentId == this.model.supervisorAgentId2){
      this.toastrService.info('No se puede seleccionar los mismos supervisores para un mismo agente.');
      this.submitted = false;
    }

    if (!this.submitted){
      return;
    }

    this.titleService.setTitle('Crear Usuario - Perfil');
    if (!this.id){
      this.UserService.createWithObjectUser(this.model).subscribe(
        data => {
            this.router.navigate(['/users']);
            this.toastrService.success("El usuario '"+this.model.userName+"' se ha guardado exitosamente.");
        },
          error => {
            this.errors = error.error.notifications;
       });
    }else{
      this.model.id = this.id;
      this.UserService.updateUsers(this.model).subscribe(
        () => {
          this.router.navigate(['/users']);
          this.toastrService.success(' El usuario se ha modificado correctamente.','',
          {positionClass : 'toast-top-center', timeOut : 3000});
        },
          e => {
            console.log(e);
        }      
      );
    }

  }
  
  ngOnInit() {
    if(!this.claimService.haveClaim(this.claimService.canCreateUsers) || !this.claimService.haveClaim(this.claimService.canEditUsers)){
      this.router.navigate(['/notAuthorized']);
    }else{
      //le asigno el id que extraigo de la url
      this.route.params.subscribe(
        p => {
              this.id = p.id;
            }
      );
      if(this.id){
        this.titleService.setTitle('Modificar Usuario - Perfil');
        this.getByIdAdministrator();
        this.editSignatureHolograpich = this.claimService.haveClaim(this.claimService.canEditSignatureHolograpichAsAdmin);
      }      
      
      this.getAllRoles();
      this.getAllCategories();
      this.getAllUsersSupervisors();
      this.distributionService.allDistribution()
      .subscribe(
        x => {
          this.distribution = x;
        }
      );
    }

  }

    getByIdAdministrator(){
      this.UserService.getByIdAdministrator(this.id).subscribe(i => {
        this.model = i;
    });
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

  hasUnsavedData(){
    return this.userForm.dirty && !this.userForm.submitted;
  }

}
