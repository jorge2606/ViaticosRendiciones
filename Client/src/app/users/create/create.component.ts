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

  constructor(
              private UserService : UserService, 
              private router : Router,
              private rolService : RoleService,
              private distributionService : DistributionService,
              private categoryService : CategoryService,
              private titleService : Title,
              private toastrService : ToastrService) {}


  getAllRoles(){
    this.rolService.getAll().subscribe(
      rol => this.model.rolesUser = rol
    );
  }

  getAllCategories(){
    this.categoryService.getallCategories()
    .subscribe(x => this.categories = x )
  }

  onSubmit(){
    this.titleService.setTitle('Crear Usuario - Perfil');
    this.UserService.createWithObjectUser(this.model).subscribe(
      data => {
          this.router.navigate(['/users']);
          this.toastrService.success("El usuario '"+this.model.userName+"' se ha guardado exitosamente.");
      },
        error => {
          this.errors = error.error.notifications;
     } 
    );
  }
  
  ngOnInit() {
    this.titleService.setTitle('Crear Usuario');
    this.getAllRoles();
    this.getAllCategories();
    this.distributionService.allDistribution().subscribe(
      x => {
        this.distribution = x;
      }
    );
  }

  setTitleTabProfile(){
    this.titleService.setTitle('Crear Usuario - Perfil');
  }

}
