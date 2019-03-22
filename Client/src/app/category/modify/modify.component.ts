import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CategoryComponent } from './../category.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FindByIdCategoryDto } from 'src/app/_models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyCategoryComponent implements OnInit {

  id : number;
  model = new FindByIdCategoryDto;
  error = '';
  responseSuccess : any;
  @ViewChild('CategoryForm') categoryForm : FormGroup; 

  constructor(
            private categoryService : CategoryService, 
            private route: ActivatedRoute,
            private router : Router,
            private titleService : Title,
            private toastrService : ToastrService
            ) { 
              this.titleService.setTitle('Modificar Categoría');
            }

  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.categoryService.findByIdCategory(this.id).subscribe(
      x => {this.model.id = x.id, this.model.name = x.name, this.model.description = x.description, this.model.advance = x.advance}
    );
  }


  onSubmit() {
    this.model.id = this.id;
    this.categoryService.updateCategory(this.model).subscribe(
      x => {
        this.responseSuccess = x;
        this.error = '';
        this.router.navigate(['/category']);
        this.toastrService.success("La categoría '"+this.model.name+"' se ha modificado correctamente.",'',
        {positionClass : 'toast-top-center', timeOut : 3000});
      },
        err => this.error = err.error.notifications
    );
    //this.router.navigate([CategoryComponent]);
  }

  msjValidEvent(msj : any){

  }

  hasUnsavedData(){
    return this.categoryForm.dirty;
  }
}
