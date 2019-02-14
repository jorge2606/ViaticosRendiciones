import { FindByIdCategoryDto } from 'src/app/_models/category';
import { CreateCategoryDto, UpdateCategoryDto } from './../_models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(createCategoryDto : CreateCategoryDto){
      return this.http.post<any>('http://localhost:63098/api/Category/Create/', createCategoryDto);
  }

  getPaginator(filters: any) {
    return this.http.get<any>('http://localhost:63098/api/Category/page/', {params: filters});
  }

  getallCategories() {
    return this.http.get<any>('http://localhost:63098/api/Category/GetAllCategories/');
  }

  deleteCategory(idCategory : number){
    return this.http.delete('http://localhost:63098/api/Category/Delete/'+idCategory);
  }

  findByIdCategory(idCategory : number){
    return this.http.get<FindByIdCategoryDto>('http://localhost:63098/api/Category/FindByIdCategory/'+idCategory)
  }
  updateCategory(updateCategory :UpdateCategoryDto){
    return this.http.put<any>('http://localhost:63098/api/Category/UpdateCategory',updateCategory);
  }
  
}
