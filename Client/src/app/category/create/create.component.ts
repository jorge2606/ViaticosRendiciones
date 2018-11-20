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
  error : any;
  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    
  }
  
  onSubmit(){
    this.categoryService.createCategory(this.model).subscribe(
      x=> x,
      error => this.error = error
    );
  }
}
