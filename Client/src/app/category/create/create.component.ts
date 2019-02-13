import { Title } from '@angular/platform-browser';
import { Category } from './../../_models/category';
import { CategoryService } from './../../_services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-Category',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCategoryComponent implements OnInit {

  model = new Category();
  error = '';
  responseSuccess : any;
  
  constructor(
            private categoryService : CategoryService,
            private titleService : Title) {
                this.titleService.setTitle('Crear Categoría');
             }

  ngOnInit() {
    
  }
  
  onSubmit(){
    this.categoryService.createCategory(this.model).subscribe(
      x=>this.responseSuccess = x,
      error => this.error = error.error.notifications
    );
  }
}
