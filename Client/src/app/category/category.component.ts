import { CategoryService } from './../_services/category.service';
import { Category, AllCategoryDto } from './../_models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //paginator
  col_size : number;
  page = 0;
  itemsPerPage : number = 10;
  //
  categories : any[];
  error : any;
  constructor(private http : CategoryService) { }

  ngOnInit() {
    this.getAllUsers(this.page); 
  }

  loadPage(page : number){
    if (page != 0){
      this.getAllUsers(page-1);
    }
  }

  getAllUsers(page : number){
    this.http.getPaginator(page).subscribe(
      result => {
        this.categories = result.list,
        this.col_size = result.totalRecords
      },
      error => console.log(error)
    ); 
  }

}
