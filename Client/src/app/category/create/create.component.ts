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
  error = '';
  
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
    this.categoryService.createCategory(this.model).subscribe(
      x=>{
          this.routerService.navigate(['/category']);
          this.toastrService.success("La categoría '"+this.model.name+"' se ha guardado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
          },
      error => this.error = error.error.notifications
    );
  }
}
