import { Title } from '@angular/platform-browser';
import { CategoryService } from './../../_services/category.service';
import { DistributionService } from './../../_services/distribution.service';
import { UsersComponent } from '../users.component';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { modifyUser } from '../users';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modifyuser',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyuserComponent implements OnInit {

  id: number;
  distribution : DistributionService[];
  model = new modifyUser;
  selectedDistributionId : number;
  categories : any;
  passwordEmpty : boolean = true;
  passwordsAreEquals : boolean = true;
  submitted : boolean;
  validCheckbox : boolean = false;

  constructor(
          private router : Router,
          private route: ActivatedRoute, 
          private userService: UserService,
          private distributionService : DistributionService,
          private categoryService : CategoryService,
          private titleService : Title,
          private toastrService : ToastrService
          ) {}
  

  onChange(rol){
    console.log(rol.rolBelongUser);
  }

  onSubmit() {
    this.submitted = true;
    
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

    this.model.id = this.id;
    this.userService.updateUsers(this.model).subscribe(
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
  
  ngOnInit() {
    this.titleService.setTitle('Modificar Usuario - Perfil');
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );
    
    this.getAllCategories();

    this.getByIdAdministrator();
    
    this.allDistribution();

  }

  setTitleTab(){
    this.titleService.setTitle('Modificar Usuario - Perfil');
  }

  getByIdAdministrator(){
      this.userService.getByIdAdministrator(this.id).subscribe(i => {
        this.model.dni = i.dni,
        this.model.userName = i.userName,
        this.model.id = i.id,
        this.model.phoneNumber = i.phoneNumber,
        this.model.rolesUser = i.rolesUser;
        this.model.firstName = i.firstName;
        this.model.lastName = i.lastName;
        this.model.distributionId = i.distributionId;
        this.model.categoryId = i.categoryId;
    });
  }

  getAllCategories(){
    this.categoryService.getallCategories()
    .subscribe(
      x => this.categories = x
    );
  }

  allDistribution(){
    this.distributionService.allDistribution().subscribe(
      x => {
        this.distribution = x;
      }
    );
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
