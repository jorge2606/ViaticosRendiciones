import { Title } from '@angular/platform-browser';
import { Category, CreateCategoryDto } from './../../_models/category';
import { CategoryService } from './../../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-Category',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCategoryComponent implements OnInit {

  model = new CreateCategoryDto();
  error = [];
  submitted : boolean = false;
  
  constructor(
            private categoryService : CategoryService,
            private titleService : Title,
            private toastrService : ToastrService,
            private routerService : Router
            ) {
                this.titleService.setTitle('Crear Categoría');
             }

  ngOnInit() {
    
  }
  
  onSubmit(){
    this.submitted = true;
    var lenName = this.model.name.trimLeft().length;
    var lenDescription = this.model.description.trimLeft().length;
    var lenAdvance = this.model.advance.toString().trimLeft().length;
    var invalidForm = false;

    if (lenName == 0){
       this.model.name = "";
       invalidForm = true;
    } 
    if (lenDescription == 0){
      this.model.description = "";
      invalidForm = true;
    } 

    if(invalidForm){
      this.submitted = false;
      return;
    }

    this.categoryService.createCategory(this.model).subscribe(
      x=>{
          this.routerService.navigate(['/category']);
          this.toastrService.success("La categoría '"+this.model.name+"' se ha guardado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
          },
      error => {
                this.error = error.error.notifications || [];
                this.error.forEach(e => {
                    this.toastrService.error(e.value, 'error',{timeOut : 3000})
                });
              }
    );
  }
}
