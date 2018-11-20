import { CreateCategoryDto, AllCategoryDto } from './../_models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(createCategoryDto : CreateCategoryDto){
      return this.http.post<CreateCategoryDto>('http://localhost:63098/api/Category/CreateCategory', createCategoryDto);
  }

  getPaginator(page: number) {
    return this.http.get<any>('http://localhost:63098/api/Category/page/' + page);
  }
}
