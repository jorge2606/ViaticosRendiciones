import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<any>("http://localhost:63098/api/Place/GetAll/");
  }
}