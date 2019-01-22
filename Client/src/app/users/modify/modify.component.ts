import { CategoryService } from './../../_services/category.service';
import { DistributionService } from './../../_services/distribution.service';
import { UsersComponent } from '../users.component';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { modifyUser } from '../users';


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

  constructor(
          private router : Router,
          private route: ActivatedRoute, 
          private userService: UserService,
          private distributionService : DistributionService,
          private categoryService : CategoryService) {
  }
  

  onChange(rol){
    console.log(rol.rolBelongUser);
  }

  onSubmit() {
    this.model.id = this.id;
    this.userService.updateUsers(this.model).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
        () => {
      }      
    );
  }
  
  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );
    
    this.getAllCategories();

    this.getByIdAdministrator();
    
    this.allDistribution();

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
        this.model.prefixCuil = i.prefixCuil;
        this.model.suffixCuil = i.suffixCuil;
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

}
