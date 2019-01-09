import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityBaseDto } from '../_models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<any>("http://localhost:63098/api/City/GetAll/");
  }

  GetByIdCity(cityId : number){
    return this.http.get<CityBaseDto[]>("http://localhost:63098/api/City/GetByIdCity/"+cityId);
  }
}
