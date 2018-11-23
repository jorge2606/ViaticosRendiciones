import { CategoryComponent } from './../category.component';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FindByIdCategoryDto } from 'src/app/_models/category';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyCategoryComponent implements OnInit {

  id : number;
  model = new FindByIdCategoryDto;
  error = '';

  constructor(private categoryService : CategoryService, private route: ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.categoryService.findByIdCategory(this.id).subscribe(
      x => {this.model.id = x.id, this.model.name = x.name, this.model.description = x.description}
    );
  }


  onSubmit() {
    this.model.id = this.id;
    this.categoryService.updateCategory(this.model).subscribe(
      () => {
        this.router.navigate(['/category']);
      },
        err => this.error = err.error.notifications
    );
    //this.router.navigate([CategoryComponent]);
  }

}
